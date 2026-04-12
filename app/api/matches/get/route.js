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

    // 2. Parse Pagination Parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    // 3. Find matches with Pagination
    // We run the count and the find concurrently for better performance
    const [matches, totalMatches] = await Promise.all([
      Match.find({
        users: { $in: [currentUser.id] },
        isDeleted: false
      })
        .populate({
          path: "users",
          select: "name photos bio gender isOnline lastActiveAt"
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Match.countDocuments({
        users: { $in: [currentUser.id] },
        isDeleted: false
      })
    ]);

    // 4. Transform the data
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

    // 5. Return Metadata for Frontend
    return NextResponse.json({
      success: true,
      count: matchData.length,
      pagination: {
        total: totalMatches,
        page,
        limit,
        totalPages: Math.ceil(totalMatches / limit)
      },
      matches: matchData
    });

  } catch (error) {
    console.error("Fetch Matches Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}