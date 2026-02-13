import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import Message from "../../../../backend/models/messages.model";
import User from "../../../../backend/models/users.model";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function POST(req) {
  try {
    await connectDB();
    const { receiverId, text } = await req.json();
    const authUser = await getUserFromRequest(req);

    // 1. Fetch fresh user data to check role
    const sender = await User.findById(authUser.id);

    // 2. Premium Logic: The "Paywall"
    if (sender.role !== "premium") {
      // Check if they've used their 1 free daily "Compliment"
      const messageCount = await Message.countDocuments({
        sender: sender._id,
        createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } // Sent today
      });

      if (messageCount >= 1) {
        return NextResponse.json({
          success: false,
          message: "Free users can only send 1 direct message per day. Upgrade to Premium for unlimited!"
        }, { status: 403 });
      }
    }

    // 3. Save the Message
    const newMessage = await Message.create({
      sender: sender._id,
      receiver: receiverId,
      text
    });

    return NextResponse.json({
      success: true,
      message: "Message sent!",
      data: newMessage
    });

  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}