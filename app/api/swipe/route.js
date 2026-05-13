import { NextResponse } from "next/server";
import connectDB from "../../../backend/lib/db/db";
import User from "../../../backend/models/users.model";
import Match from "../../../backend/models/matches.model";
import { getUserFromRequest } from "../../../backend/lib/auth/auth";
import Notification from "../../../backend/models/notifications.model";
import { sendPushNotification } from "../../../backend/lib/notifications/sendPushNotifications";

export async function POST(req) {
  try {
    await connectDB();

    const currentUser = await getUserFromRequest(req);
    if (!currentUser)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { targetUserId, direction } = await req.json(); // direction: 'left' or 'right'

    // 1. Fetch full user data to check limits and usage
    const user = await User.findById(currentUser.id);

    // 2. Handle Swipe Limits (For Free Users)
    // if (user.role === "free" && user.usage.dailySwipes >= 20) {
    // ✅ Use optional chaining (?.) and a fallback value (|| 0)
    if (user.role === "free" && (user.usage?.dailySwipes || 0) >= 100) {
      return NextResponse.json(
        {
          message:
            "Daily limit reached. Upgrade to Premium for unlimited swipes!",
          limitReached: true,
        },
        { status: 403 }
      );
    }

    // 3. Process the Swipe
    if (direction === "right") {
      // Add to likesSent
      await User.findByIdAndUpdate(user._id, {
        $addToSet: { likesSent: targetUserId },
        $inc: { "usage.dailySwipes": 1 },
      });

      // Update target's likesReceived
      await User.findByIdAndUpdate(targetUserId, {
        $addToSet: { likesReceived: user._id },
      });

      await sendPushNotification(
        targetUserId,
        "New Like!",
        "Someone liked you! Check it out."
      );

      await Notification.create({
        type: "like",
        sender: user?._id,
        receiver: targetUserId,
        message: "liked your profile! Check it out.",
      });

      // 4. CHECK FOR A MATCH
      const targetUser = await User.findById(targetUserId);
      const isMatch = targetUser.likesSent.includes(user._id);

      if (isMatch) {
        // 1. Create a new Match document
        const newMatch = await Match.create({
          users: [user._id, targetUserId],
        });

        // 2. Optionally, you can still keep a reference in the User model
        // for quick "Are we matched?" checks, but it's no longer the primary source.
        await User.updateMany(
          { _id: { $in: [user._id, targetUserId] } },
          { $addToSet: { matches: newMatch._id } }
        );

        // Add each other to matches arrays
        await User.findByIdAndUpdate(user._id, {
          $addToSet: { matches: targetUserId },
        });
        await User.findByIdAndUpdate(targetUserId, {
          $addToSet: { matches: user._id },
        });

        // MATCH PERCENTAGE LOGIC
        let matchScore = 0;

        // Interests Match
        const commonInterests =
          user?.interests?.filter((interest) =>
            targetUser?.interests?.includes(interest)
          ) || [];

        matchScore += commonInterests.length * 10;

        // Gender Preference Match
        if (
          user?.interestedIn === "everyone" ||
          user?.interestedIn === targetUser?.gender
        ) {
          matchScore += 20;
        }

        // Lifestyle Match
        if (user?.smoking === targetUser?.smoking) {
          matchScore += 10;
        }

        if (user?.drinking === targetUser?.drinking) {
          matchScore += 10;
        }

        // Education Match
        if (user?.education === targetUser?.education) {
          matchScore += 10;
        }

        // Clamp to 100
        if (matchScore > 100) {
          matchScore = 100;
        }

        return NextResponse.json({
          success: true,
          match: true,
          message: "It's a Match!",

          matchedUser: {
            _id: targetUser?._id,
            name: targetUser?.name,
            photo: targetUser?.photos?.[0] || targetUser?.profileImage || null,
            matchPercentage: matchScore,
            commonInterests,
          },
        });
      }
    } else {
      // If left swipe, just increment usage and move on
      await User.findByIdAndUpdate(user._id, {
        $inc: { "usage.dailySwipes": 1 },
      });
    }

    return NextResponse.json({ success: true, match: false });
  } catch (error) {
    console.error("Swipe Error:", error);
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}
