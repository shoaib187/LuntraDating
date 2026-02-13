import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import Favorite from "../../../../backend/models/favorites.model";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function GET(req) {
  try {
    await connectDB();

    // 1. Authenticate the viewer
    const authUser = await getUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Find all favorite documents where 'user' is the logged-in user
    // We populate 'targetUser' to get their profile details
    const favorites = await Favorite.find({ user: authUser.id })
      .populate({
        path: "targetUser",
        select: "name photos bio gender isOnline lastActiveAt" // Only return public info
      })
      .sort({ createdAt: -1 }); // Show recently favorited first

    // 3. Format the data for the frontend
    // We filter out any null targetUsers (in case a user was deleted but the favorite record remains)
    const favoriteProfiles = favorites
      .map((fav) => fav.targetUser)
      .filter((profile) => profile !== null);

    return NextResponse.json({
      success: true,
      count: favoriteProfiles.length,
      favorites: favoriteProfiles,
    });

  } catch (error) {
    console.error("Get Favorites Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}