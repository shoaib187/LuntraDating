import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import Story from "../../../../backend/models/stories.model";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
import cloudinary from "../../../../backend/lib/cloudinary/cloudinary"; // Ensure this is imported

export async function POST(req) {
  try {
    await connectDB();

    // De-structure the incoming JSON body
    let { mediaUrl, mediaType, caption } = await req.json();

    // 1. Get the current user
    const authUser = await getUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Paywall Logic
    if (authUser.role === "free") {
      const activeStories = await Story.countDocuments({ user: authUser.id });
      if (activeStories >= 1) {
        return NextResponse.json({
          message: "Free users can only post 1 story. Upgrade for unlimited!"
        }, { status: 403 });
      }
    }

    // 3. Handle Cloudinary Upload (Image or Video)
    let uploadedUrl = mediaUrl; // Default to existing URL if provided

    if (mediaUrl && mediaUrl.startsWith("data:")) {
      try {
        const res = await cloudinary.uploader.upload(mediaUrl, {
          folder: "stories",
          resource_type: "auto",
        });
        uploadedUrl = res.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);
        return NextResponse.json({ message: "Failed to upload media" }, { status: 500 });
      }
    }

    // 4. Save Story to Database
    const newStory = await Story.create({
      user: authUser.id,
      mediaUrl: uploadedUrl || "", // Ensure we have a string value
      mediaType, // 'image', 'video', or 'text'
      caption
    });

    return NextResponse.json({
      success: true,
      message: "Story posted!",
      story: newStory
    });

  } catch (error) {
    console.error("Story Creation Error:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}