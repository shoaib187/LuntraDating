import { NextResponse } from "next/server";
import User from "../../../../backend/models/users.model";
import connectDB from "../../../../backend/lib/db/db";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function GET(req) {
  try {
    await connectDB();

    // 1. Authenticate the user first
    const currentUser = await getUserFromRequest(req);

    if (!currentUser || !currentUser.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Define the exclusion and filters
    const baseQuery = {
      _id: { $ne: currentUser.id }, // Excludes the logged-in user
      isBlocked: false,
      // isVerified: true,
    };

    // 3. Determine limits based on role
    // Defaulting to 50 if role isn't explicitly 'premium'
    const limit = currentUser.role === "premium" ? 200 : 50;

    // 4. Fetch profiles with specific fields selected
    // Using .select() is more efficient than .map() after the query
    const profiles = await User.find(baseQuery)
      .select("_id name gender interestedIn bio photos location lastActiveAt role otp otpExpires")
      .sort({ lastActiveAt: -1 })
      .limit(limit);

    return NextResponse.json({
      count: profiles.length,
      profiles
    });

  } catch (error) {
    console.error("Fetch Profiles Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}