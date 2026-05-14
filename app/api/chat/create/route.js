import { NextResponse } from "next/server";

import connectDB from "../../../../backend/lib/db/db";

import Message from "../../../../backend/models/messages.model";
import User from "../../../../backend/models/users.model";

import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

import Notification from "../../../../backend/models/notifications.model";

import { sendPushNotification } from "@/backend/lib/notifications/sendPushNotifications";

import cloudinary from "../../../../backend/lib/cloudinary/cloudinary";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { receiverId, text, mediaUrl, mediaType } = body;

    const authUser = await getUserFromRequest(req);
    const sender = await User.findById(authUser.id);

    // Premium logic
    if (sender.role !== "premium") {
      const messageCount = await Message.countDocuments({
        sender: sender._id,
        createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
      });

      console.log("messageCount =>", messageCount);

      if (messageCount >= 10) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Free users can only send 10 direct message per day. Upgrade to Premium for unlimited!",
          },
          { status: 403 }
        );
      }
    }

    let uploadedMediaUrl = "";
    let uploadedMediaType = "";

    // Upload media
    try {
      if (mediaUrl && mediaUrl.startsWith("data:")) {
        const uploaded = await cloudinary.uploader.upload(mediaUrl, {
          folder: "messages",
          resource_type: "auto",
        });
        uploadedMediaUrl = uploaded.secure_url;
        uploadedMediaType =
          uploaded.resource_type === "video" ? "video" : "image";
      } else {
        console.log("Media URL invalid or missing");
      }
    } catch (uploadError) {
      console.log("UPLOAD ERROR =>", uploadError);
    }

    const newMessage = await Message.create({
      sender: sender._id,
      receiver: receiverId,
      text: text || "",

      media: {
        url: uploadedMediaUrl,
        type: uploadedMediaType,
        thumbnail: "",
      },
    });

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return NextResponse.json(
        {
          success: false,
          message: "Receiver not found",
        },
        { status: 404 }
      );
    }

    const canSendNotification =
      receiver?.notifications?.enabled &&
      receiver?.preferences?.messageNotifications &&
      !receiver?.isOnline &&
      receiver?.notifications?.fcmToken;

    console.log("canSendNotification =>", canSendNotification);

    await Notification.create({
      type: "message",
      sender: sender._id,
      receiver: receiverId,
      relatedId: newMessage._id,
      message: `${sender.name} sent you a message`,
    });

    if (canSendNotification) {
      await sendPushNotification(
        receiverId,
        sender.name,
        text || "Sent a media message"
      );
    }
    return NextResponse.json({
      success: true,
      message: "Message sent!",
      data: newMessage,
    });
  } catch (error) {
    console.log("MAIN ERROR =>", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}
