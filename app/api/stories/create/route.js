import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import Story from "../../../../backend/models/stories.model";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function POST(req) {
  try {
    await connectDB();
    const { mediaUrl, mediaType, caption } = await req.json();

    // 1. Get the current user
    const authUser = await getUserFromRequest(req);
    if (!authUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    // 2. Premium Check (Optional: Limit free users to 1 story at a time)
    if (authUser.role === "free") {
      const activeStories = await Story.countDocuments({ user: authUser.id });
      if (activeStories >= 1) {
        return NextResponse.json({
          message: "Free users can only post 1 story at a time. Upgrade to Premium for more!"
        }, { status: 403 });
      }
    }

    // 3. Save Story
    const newStory = await Story.create({
      user: authUser.id,
      mediaUrl,
      mediaType,
      caption
    });

    return NextResponse.json({ success: true, story: newStory });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}