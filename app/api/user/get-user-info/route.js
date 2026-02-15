import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import User from "../../../../backend/models/users.model";
import Plan from "../../../../backend/models/plan.model";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const targetUserId = searchParams.get("id");

    if (!targetUserId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    // 1. Get the current logged-in user from request
    const authUser = await getUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. IMPORTANT: Fetch fresh user data from DB 
    // This ensures that if they JUST upgraded, we see the 'premium' role.
    const currentUser = await User.findById(authUser.id);

    console.log("VIEWER ROLE FROM DB:", currentUser.role);

    // 3. Fetch the target user's profile
    const targetUser = await User.findById(targetUserId).populate("subscription.planId");

    if (!targetUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 4. Determine View Permissions
    const isPremium = currentUser.role === "premium";
    const isSelf = currentUser._id.toString() === targetUserId;

    console.log("IS PREMIUM?", isPremium);
    console.log("IS SELF?", isSelf);

    if (isPremium || isSelf) {
      // ✅ Return EVERYTHING
      const userObj = targetUser.toObject();
      delete userObj.password;

      return NextResponse.json({
        success: true,
        isPremiumView: true,
        user: userObj
      });
    }

    // ❌ Return BASIC INFO ONLY
    const basicProfile = {
      _id: targetUser._id,
      name: targetUser.name,
      gender: targetUser.gender,
      bio: targetUser.bio,
      photos: targetUser.photos,
      role: targetUser.role,
      isOnline: targetUser.isOnline
    };

    return NextResponse.json({
      success: true,
      isPremiumView: false,
      user: basicProfile,
      message: "Upgrade to Premium to see full profile details."
    });

  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}