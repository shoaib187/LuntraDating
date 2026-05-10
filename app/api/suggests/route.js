import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/backend/lib/auth/auth";
import connectDB from "@/backend/lib/db/db";
import User from "@/backend/models/users.model";

export async function GET(req) {
  try {
    await connectDB();

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

    const currentUser = await User.findById(authUser.id);

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // EXCLUDED USERS
    const excludedUsers = [
      currentUser._id,
      ...currentUser.likesSent,
      ...currentUser.matches,
      ...currentUser.seenProfiles,
    ];

    // FIND USERS WITH SAME INTERESTS
    const suggestedUsers = await User.aggregate([
      {
        $match: {
          _id: {
            $nin: excludedUsers,
          },

          isBlocked: false,

          interests: {
            $in: currentUser.interests || [],
          },
        },
      },

      {
        $addFields: {
          commonInterests: {
            $size: {
              $setIntersection: ["$interests", currentUser.interests || []],
            },
          },
        },
      },

      {
        $sort: {
          commonInterests: -1,
          isOnline: -1,
          createdAt: -1,
        },
      },

      {
        $limit: 30,
      },
      {
        $project: {
          _id: 1,
          name: 1,
          photos: 1,
          profileImage: 1,
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      total: suggestedUsers.length,
      data: suggestedUsers,
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
