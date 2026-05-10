// app/api/users/update-preferences/route.js

import { NextResponse } from "next/server";

import connectDB from "@/backend/lib/db/db";
import { getUserFromRequest } from "@/backend/lib/auth/auth";

import User from "@/backend/models/users.model";

export async function PATCH(req) {
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

    // BODY
    const body = await req.json();

    const {
      pushNotifications,
      messageNotifications,
      matchNotifications,
      likeNotifications,
      storyNotifications,
      emailNotifications,
      showOnlineStatus,
      showDistance,
      showAge,
      discoverable,
      language,
    } = body;

    // UPDATE OBJECT
    const updateData = {};

    // PUSH NOTIFICATIONS
    if (typeof pushNotifications === "boolean") {
      updateData["notifications.enabled"] = pushNotifications;
    }

    // MESSAGE NOTIFICATIONS
    if (typeof messageNotifications === "boolean") {
      updateData["preferences.messageNotifications"] = messageNotifications;
    }

    // MATCH NOTIFICATIONS
    if (typeof matchNotifications === "boolean") {
      updateData["preferences.matchNotifications"] = matchNotifications;
    }

    // LIKE NOTIFICATIONS
    if (typeof likeNotifications === "boolean") {
      updateData["preferences.likeNotifications"] = likeNotifications;
    }

    // STORY NOTIFICATIONS
    if (typeof storyNotifications === "boolean") {
      updateData["preferences.storyNotifications"] = storyNotifications;
    }

    // EMAIL NOTIFICATIONS
    if (typeof emailNotifications === "boolean") {
      updateData["preferences.emailNotifications"] = emailNotifications;
    }

    // SHOW ONLINE STATUS
    if (typeof showOnlineStatus === "boolean") {
      updateData["preferences.showOnlineStatus"] = showOnlineStatus;
    }

    // SHOW DISTANCE
    if (typeof showDistance === "boolean") {
      updateData["preferences.showDistance"] = showDistance;
    }

    // SHOW AGE
    if (typeof showAge === "boolean") {
      updateData["preferences.showAge"] = showAge;
    }

    // DISCOVERABLE PROFILE
    if (typeof discoverable === "boolean") {
      updateData["preferences.discoverable"] = discoverable;
    }

    // LANGUAGE
    if (language) {
      updateData.language = language;
    }

    // UPDATE USER
    const updatedUser = await User.findByIdAndUpdate(
      authUser.id,
      {
        $set: updateData,
      },
      {
        new: true,
      }
    ).select("-password -otp -otpExpires");

    return NextResponse.json({
      success: true,
      message: "Preferences updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
