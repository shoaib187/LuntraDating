// app/api/notifications/route.js
import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import Notification from "../../../../backend/models/notifications.model";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function GET(req) {
  try {
    await connectDB();
    const authUser = await getUserFromRequest(req);

    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get page and limit from query params (e.g., /api/notifications?page=1&limit=20)
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ receiver: authUser.id })
      .populate("sender", "name profileImage") // Get sender details for the UI
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit);

    const total = await Notification.countDocuments({ receiver: authUser.id });

    return NextResponse.json({
      success: true,
      data: notifications,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}