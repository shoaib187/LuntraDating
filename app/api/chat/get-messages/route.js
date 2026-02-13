import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import Message from "../../../../backend/models/messages.model";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function GET(req) {
  try {
    await connectDB();

    // 1. Get query parameters
    const { searchParams } = new URL(req.url);
    const otherUserId = searchParams.get("otherUserId");

    // 2. Get the logged-in user
    const authUser = await getUserFromRequest(req);
    if (!authUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!otherUserId) {
      return NextResponse.json({ message: "Recipient ID is required" }, { status: 400 });
    }

    // 3. Find messages between these two specific users
    const messages = await Message.find({
      $or: [
        { sender: authUser.id, receiver: otherUserId },
        { sender: otherUserId, receiver: authUser.id }
      ]
    })
      .sort({ createdAt: 1 }) // Sort by time: oldest first for the chat bubble flow
      .limit(100); // Pagination recommended for production

    // 🔹 Extract the last message from the array
    return NextResponse.json({
      success: true,
      messages
    });

  } catch (error) {
    console.error("Fetch Chat Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}