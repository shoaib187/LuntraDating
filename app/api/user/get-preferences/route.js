// app/api/preferences/route.js

import { NextResponse } from "next/server";
import connectDB from "@/backend/lib/db/db";
import User from "@/backend/models/users.model";
import { getUserFromRequest } from "@/backend/lib/auth/auth";

export async function GET(req) {
  try {
    await connectDB();

    // AUTH USER
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

    // FIND USER
    const user = await User.findById(authUser.id).select(
      "preferences notifications"
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    if (!user.preferences) {
      user.preferences = {
        messageNotifications: true,
        matchNotifications: true,
        likeNotifications: true,
        storyNotifications: true,
        emailNotifications: false,
        showOnlineStatus: true,
        showDistance: true,
        showAge: true,
        discoverable: true,
      };

      await user.save();
    }
    return NextResponse.json({
      success: true,
      data: {
        notifications: user.notifications,
        preferences: user.preferences,
      },
    });
  } catch (error) {
    console.log("GET PREFERENCES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
