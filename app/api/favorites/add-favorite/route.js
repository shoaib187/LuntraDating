import { NextResponse } from "next/server";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
import connectDB from "../../../../backend/lib/db/db";
import Favorite from "../../../../backend/models/favorites.model";
import { notifyUser } from "../../../../backend/lib/notifications/notifyUser";

export async function POST(req) {
  await connectDB();
  const { targetUserId } = await req.json();
  const authUser = await getUserFromRequest(req);

  // Check if it exists
  const existing = await Favorite.findOne({ user: authUser.id, targetUser: targetUserId });

  if (existing) {
    await Favorite.findByIdAndDelete(existing._id);
    await notifyUser({
      receiverId: targetUserId,
      senderId: authUser.id,
      type: "favorite_removed",
      message: `${authUser.name} removed you from their favorites.`,
      relatedId: authUser.id, // You can use this to link to the user's profile in the app
      pushTitle: "Removed from Favorites"
    })
    return NextResponse.json({ isFavorited: false, message: "Removed" });
  } else {
    await Favorite.create({ user: authUser.id, targetUser: targetUserId });
    return NextResponse.json({ isFavorited: true, message: "Added" });
  }
}