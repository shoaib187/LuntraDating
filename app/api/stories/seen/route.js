import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
import connectDB from "../../../../backend/lib/db/db";
import Story from "../../../../backend/models/stories.model";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await connectDB();

    const { storyId } = await req.json();
    console.log("StoryID", storyId);

    const authUser = await getUserFromRequest(req);

    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const story = await Story.findById(storyId);

    if (!story) {
      return NextResponse.json({ message: "Story not found" }, { status: 404 });
    }

    // Check existing viewer
    const existingView = story.views.find(
      (item) => item.user?.toString() === authUser.id
    );
    if (existingView) {
      existingView.viewCount += 1;
      existingView.viewedAt = new Date();
    } else {
      story.views.push({
        user: authUser.id,
        viewedAt: new Date(),
        viewCount: 1,
      });
    }

    await story.save();

    await story.populate({
      path: "views.user",
      select: "name username profileImage",
    });

    return NextResponse.json({
      success: true,

      viewsCount: story.views.length,

      viewers: story.views.map((view) => ({
        user: view.user,
        viewedAt: view.viewedAt,
        viewCount: view.viewCount,
      })),
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
