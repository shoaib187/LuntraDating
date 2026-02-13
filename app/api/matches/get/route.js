import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import Match from "../../../../backend/models/matches.model";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function GET(req) {
  try {
    await connectDB();

    // 1. Authenticate the viewer
    const currentUser = await getUserFromRequest(req);
    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Find all matches for this user
    // We populate 'users' but exclude the current user's own data in the next step
    const matches = await Match.find({
      users: { $in: [currentUser.id] },
      isDeleted: false
    })
      .populate({
        path: "users",
        select: "name photos bio gender isOnline lastActiveAt" // Only public info
      })
      .sort({ createdAt: -1 }); // Newest matches first

    // 3. Transform the data
    // We want to return the "other" person's info directly for the frontend
    const matchData = matches.map((match) => {
      const otherUser = match.users.find(
        (user) => user._id.toString() !== currentUser.id
      );

      return {
        matchId: match._id,
        matchedAt: match.createdAt,
        user: otherUser,
      };
    });

    return NextResponse.json({
      success: true,
      count: matchData.length,
      matches: matchData
    });

  } catch (error) {
    console.error("Fetch Matches Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}