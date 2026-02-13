import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import Message from "../../../../backend/models/messages.model";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function PATCH(req) {
  try {
    await connectDB();
    const { otherUserId } = await req.json(); // The person whose messages you are reading
    const authUser = await getUserFromRequest(req);

    if (!authUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    // Update all unread messages where YOU are the receiver and THEY are the sender
    const result = await Message.updateMany(
      {
        sender: otherUserId,
        receiver: authUser.id,
        isRead: false
      },
      { $set: { isRead: true } }
    );

    return NextResponse.json({
      success: true,
      messagesUpdated: result.modifiedCount
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}