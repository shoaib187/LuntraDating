import { NextResponse } from "next/server";

import connectDB from "../../../../backend/lib/db/db";

import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

import Story from "../../../../backend/models/stories.model";
import User from "../../../../backend/models/users.model";
import Notification from "../../../../backend/models/notifications.model";

import { sendPushNotification } from "../../../../backend/lib/notifications/sendPushNotifications";

export async function POST(req) {
  try {
    await connectDB();

    // Logged in user
    const authUser = await getUserFromRequest(req);

    if (!authUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { storyId, message } = body;

    if (!storyId || !message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "storyId and message are required",
        },
        { status: 400 }
      );
    }

    // Find story
    const story = await Story.findById(storyId).populate(
      "user",
      "name fcmToken"
    );

    if (!story) {
      return NextResponse.json(
        { success: false, message: "Story not found" },
        { status: 404 }
      );
    }

    // Prevent replying to own story
    if (story.user._id.toString() === authUser.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot reply to your own story",
        },
        { status: 400 }
      );
    }

    // Sender user
    const sender = await User.findById(authUser.id).select("name profileImage");

    // Create notification in DB
    const notification = await Notification.create({
      type: "story_reply",

      sender: authUser.id,

      receiver: story.user._id,

      relatedId: story._id,

      message: `${message}`,
    });

    // Send Push Notification
    // Send Push Notification
    try {
      await sendPushNotification(
        story.user._id,
        "Story Reply 💬",
        `${sender.name}: ${message}`,
        {
          type: "story_reply",
          storyId: story._id.toString(),
          senderId: authUser.id.toString(),
        }
      );
    } catch (pushError) {
      console.log("Push notification error:", pushError);
    }
    return NextResponse.json({
      success: true,
      message: "Reply sent successfully",
      notification,
    });
  } catch (error) {
    console.log("Story reply error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
