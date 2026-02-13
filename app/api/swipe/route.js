import { NextResponse } from "next/server";
import connectDB from "../../../backend/lib/db/db";
import User from "../../../backend/models/users.model";
import Match from "../../../backend/models/matches.model";
import { getUserFromRequest } from "../../../backend/lib/auth/auth";

export async function POST(req) {
  try {
    await connectDB();

    const currentUser = await getUserFromRequest(req);
    if (!currentUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { targetUserId, direction } = await req.json(); // direction: 'left' or 'right'

    // 1. Fetch full user data to check limits and usage
    const user = await User.findById(currentUser.id);

    // 2. Handle Swipe Limits (For Free Users)
    // if (user.role === "free" && user.usage.dailySwipes >= 20) {
    // ✅ Use optional chaining (?.) and a fallback value (|| 0)
    if (user.role === "free" && (user.usage?.dailySwipes || 0) >= 10) {
      return NextResponse.json({
        message: "Daily limit reached. Upgrade to Premium for unlimited swipes!",
        limitReached: true
      }, { status: 403 });
    }

    // 3. Process the Swipe
    if (direction === "right") {
      // Add to likesSent
      await User.findByIdAndUpdate(user._id, {
        $addToSet: { likesSent: targetUserId },
        $inc: { "usage.dailySwipes": 1 }
      });

      // Update target's likesReceived
      await User.findByIdAndUpdate(targetUserId, {
        $addToSet: { likesReceived: user._id }
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
        await User.findByIdAndUpdate(user._id, { $addToSet: { matches: targetUserId } });
        await User.findByIdAndUpdate(targetUserId, { $addToSet: { matches: user._id } });

        return NextResponse.json({
          success: true,
          match: true,
          message: "It's a Match!",
          matchedUser: { name: targetUser.name, photo: targetUser.photos[0] }
        });
      }
    } else {
      // If left swipe, just increment usage and move on
      await User.findByIdAndUpdate(user._id, { $inc: { "usage.dailySwipes": 1 } });
    }

    return NextResponse.json({ success: true, match: false });

  } catch (error) {
    console.error("Swipe Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}