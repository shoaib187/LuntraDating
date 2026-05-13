import { NextResponse } from "next/server";

import connectDB from "../../../../backend/lib/db/db";

import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

import Message from "../../../../backend/models/messages.model";

export async function PATCH(req) {
  try {
    await connectDB();

    const authUser = await getUserFromRequest(req);

    if (!authUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { targetUserId } = await req.json();

    if (!targetUserId) {
      return NextResponse.json(
        {
          success: false,
          message: "targetUserId required",
        },
        { status: 400 }
      );
    }

    // Hide messages only for current user
    const result = await Message.updateMany(
      {
        $or: [
          {
            sender: authUser.id,
            receiver: targetUserId,
          },
          {
            sender: targetUserId,
            receiver: authUser.id,
          },
        ],
      },
      {
        $addToSet: {
          deletedFor: authUser.id,
        },
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Chat cleared successfully",
        modifiedCount: result.modifiedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Clear chat error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
