import { NextResponse } from "next/server";

import connectDB from "../../../../backend/lib/db/db";

import Message from "../../../../backend/models/messages.model";

import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function GET(req) {
  try {
    await connectDB();

    // AUTH USER
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

    // QUERY PARAMS
    const { searchParams } = new URL(req.url);

    const otherUserId = searchParams.get("otherUserId");

    // PAGINATION
    const page = Number(searchParams.get("page")) || 1;

    const limit = Number(searchParams.get("limit")) || 20;

    const skip = (page - 1) * limit;

    if (!otherUserId) {
      return NextResponse.json(
        {
          success: false,
          message: "otherUserId required",
        },
        { status: 400 }
      );
    }

    // TOTAL COUNT
    const totalMessages = await Message.countDocuments({
      $or: [
        {
          sender: authUser.id,
          receiver: otherUserId,
        },
        {
          sender: otherUserId,
          receiver: authUser.id,
        },
      ],

      // HIDE CLEARED MESSAGES
      deletedFor: {
        $ne: authUser.id,
      },
    });

    // FETCH MESSAGES
    const messages = await Message.find({
      $or: [
        {
          sender: authUser.id,
          receiver: otherUserId,
        },
        {
          sender: otherUserId,
          receiver: authUser.id,
        },
      ],

      // HIDE CLEARED MESSAGES
      deletedFor: {
        $ne: authUser.id,
      },
    })
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit);

    // OPTIONAL: reverse for chat UI
    // const formattedMessages = messages.reverse();

    return NextResponse.json(
      {
        success: true,

        pagination: {
          page,
          limit,
          totalMessages,
          totalPages: Math.ceil(totalMessages / limit),
          hasNextPage: page * limit < totalMessages,
          hasPrevPage: page > 1,
        },

        messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Get messages error:", error);

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
