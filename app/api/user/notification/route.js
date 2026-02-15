import { NextResponse } from "next/server";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
import connectDB from "../../../../backend/lib/db/db";
import User from "../../../../backend/models/users.model";

export async function PATCH(req) {
  try {
    await connectDB();
    const { fcmToken } = await req.json();
    const authUser = await getUserFromRequest(req);

    if (!authUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await User.findByIdAndUpdate(authUser.id, {
      "notifications.fcmToken": fcmToken
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Error updating token", error }, { status: 500 });
  }
}