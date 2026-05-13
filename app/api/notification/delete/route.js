import { NextResponse } from "next/server";

import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
import connectDB from "../../../../backend/lib/db/db";

import Notification from "../../../../backend/models/notifications.model.js";

export async function DELETE(req) {
  try {
    await connectDB();

    // Auth user
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

    // Delete all notifications
    if (all) {
      const result = await Notification.deleteMany({
        receiver: authUser.id,
      });

      return NextResponse.json(
        {
          success: true,
          message: "All notifications deleted",
          deletedCount: result.deletedCount,
        },
        { status: 200 }
      );
    }

    // Validation
    if (!notificationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Notification ID is required",
        },
        { status: 400 }
      );
    }

    // Delete single notification
    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
      receiver: authUser.id,
    });

    if (!notification) {
      return NextResponse.json(
        {
          success: false,
          message: "Notification not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Notification deleted successfully",
        data: notification,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Delete notification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Delete failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
