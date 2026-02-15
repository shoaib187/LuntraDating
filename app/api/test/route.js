import { NextResponse } from "next/server";
import { sendPushNotification } from "@/backend/lib/notifications/sendPushNotifications";
import { getUserFromRequest } from "@/backend/lib/auth/auth";
import connectDB from "@/backend/lib/db/db";

export async function POST(req) {
  try {
    await connectDB();
    const authUser = await getUserFromRequest(req);

    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Pass authUser._id or authUser.id depending on your auth helper's return
    const result = await sendPushNotification(
      authUser.id || authUser._id,
      'Luntra Test 🚀',
      'If you see this, your FCM setup is working!'
    );

    if (!result) {
      return NextResponse.json({
        success: false,
        message: "No token found for user. Please grant permission in the browser."
      }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}