import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import Story from "../../../../backend/models/stories.model";
import User from "../../../../backend/models/users.model";

export async function GET(req) {
  try {
    await connectDB();

    // Get id from query
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "User id is required" },
        { status: 400 }
      );
    }

    // Check user exists
    const user = await User.findById(id).select("name username profileImage");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Get user stories
    const stories = await Story.find({
      user: id,
      expiresAt: { $gt: new Date() },
    })
      .sort({ createdAt: -1 })
      .populate("user", "name username profileImage")
      .populate("views.user", "name username profileImage");

    return NextResponse.json({
      success: true,
      storiesCount: stories.length,
      user,
      stories,
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
