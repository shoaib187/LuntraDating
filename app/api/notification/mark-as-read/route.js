import { NextResponse } from "next/server";

import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
import connectDB from "../../../../backend/lib/db/db";

import Notification from "../../../../backend/models/notifications.model.js";

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

    const { notificationId, all } = await req.json();

    if (all) {
      // Mark all notifications as read
      await Notification.updateMany(
        {
          receiver: authUser._id,
          isRead: false,
        },
        {
          $set: { isRead: true },
        }
      );
    } else {
      // Mark single notification as read
      await Notification.findByIdAndUpdate(notificationId, {
        isRead: true,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Notifications updated",
    });
  } catch (error) {
    console.log("Notification update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Update failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
