import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

import Notification from "../../../../backend/models/notifications.model";

export async function GET(req) {
  try {
    await connectDB();

    // Logged in user
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

    // Count unread notifications
    const unreadCount = await Notification.countDocuments({
      receiver: authUser.id,
      isRead: false,
    });

    return NextResponse.json(
      {
        success: true,
        unreadCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unread notification count error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
