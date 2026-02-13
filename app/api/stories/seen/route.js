import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
import connectDB from "../../../../backend/lib/db/db";
import Story from "../../../../backend/models/stories.model";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await connectDB();
    const { storyId } = await req.json();
    const authUser = await getUserFromRequest(req);

    // Add viewer to the story's views array (only if not already there)
    await Story.findByIdAndUpdate(storyId, {
      $addToSet: { views: authUser.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}