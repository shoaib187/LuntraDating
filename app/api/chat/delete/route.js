import { NextResponse } from "next/server";

import connectDB from "../../../../backend/lib/db/db";

import Message from "../../../../backend/models/messages.model";

import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function DELETE(req) {
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

    const body = await req.json();

    const { messageId, deleteType } = body;

    /**
     * deleteType:
     * - "me"
     * - "everyone"
     */

    if (!messageId || !deleteType) {
      return NextResponse.json(
        {
          success: false,
          message: "messageId and deleteType required",
        },
        { status: 400 }
      );
    }

    // FIND MESSAGE
    const message = await Message.findById(messageId);

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "Message not found",
        },
        { status: 404 }
      );
    }

    /**
     * DELETE FOR ME
     */
    if (deleteType === "me") {
      // already deleted
      if (!message.deletedFor.includes(authUser.id)) {
        message.deletedFor.push(authUser.id);

        await message.save();
      }

      return NextResponse.json(
        {
          success: true,
          message: "Message deleted for you",
        },
        { status: 200 }
      );
    }

    /**
     * DELETE FOR EVERYONE
     * only sender can do this
     */
    if (deleteType === "everyone") {
      if (message.sender.toString() !== authUser.id.toString()) {
        return NextResponse.json(
          {
            success: false,
            message: "Only sender can delete for everyone",
          },
          { status: 403 }
        );
      }

      // SOFT DELETE LIKE WHATSAPP
      message.text = "This message was deleted";
      message.media = {
        url: "",
        type: "",
        thumbnail: "",
      };

      message.isDeletedForEveryone = true;

      await message.save();

      return NextResponse.json(
        {
          success: true,
          message: "Message deleted for everyone",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid deleteType",
      },
      { status: 400 }
    );
  } catch (error) {
    console.log("Delete message error:", error);

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
