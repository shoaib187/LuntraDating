import { NextResponse } from "next/server";

import connectDB from "../../../../backend/lib/db/db";

import User from "../../../../backend/models/users.model";

import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

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

    // QUERY PARAMS
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;

    const limit = Number(searchParams.get("limit")) || 20;

    const skip = (page - 1) * limit;

    // GET USER WITH likesSent
    const user = await User.findById(authUser.id)
      .populate({
        path: "likesSent",
        select:
          "name age profileImage location city photos profession bio isOnline lastSeen",
      })
      .lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // PAGINATED LIKES
    const totalLikesSent = user.likesSent.length;

    const likesSent = user.likesSent.slice(skip, skip + limit);

    return NextResponse.json(
      {
        success: true,

        pagination: {
          page,
          limit,
          totalLikesSent,
          totalPages: Math.ceil(totalLikesSent / limit),
          hasNextPage: page * limit < totalLikesSent,
          hasPrevPage: page > 1,
        },

        likesSent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Get Likes Sent Error:", error);

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
