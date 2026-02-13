import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
import Users from "../../../../backend/models/users.model";
import Story from "../../../../backend/models/stories.model";


export async function GET(req) {
  try {
    await connectDB();
    const authUser = await getUserFromRequest(req);
    if (!authUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const currentUser = await Users.findById(authUser.id);

    // 1. Fetch stories from matches
    const stories = await Story.find({
      user: { $in: currentUser.matches },
      // Note: If you used the TTL index 'expires', you don't strictly need the $gt check, 
      // but it doesn't hurt.
      expiresAt: { $gt: new Date() }
    })
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 });

    // 2. Map through stories to add the 'isSeen' flag
    const storiesWithSeenStatus = stories.map((story) => {
      const storyObj = story.toObject();

      // Check if current user's ID exists in the views array
      // We use .some() or .includes() for the comparison
      const isSeen = story.views.some(
        (viewerId) => viewerId.toString() === currentUser._id.toString()
      );

      return {
        ...storyObj,
        isSeen: isSeen,
        viewsCount: story.views.length // Useful for the UI
      };
    });

    return NextResponse.json({
      success: true,
      count: storiesWithSeenStatus.length,
      stories: storiesWithSeenStatus
    });

  } catch (error) {
    console.error("Fetch Stories Error:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}



// import { NextResponse } from "next/server";
// import connectDB from "../../../../backend/lib/db/db";
// import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
// import Users from "../../../../backend/models/users.model";
// import Story from "../../../../backend/models/stories.model";

// export async function GET(req) {
//   try {
//     await connectDB();
//     const authUser = await getUserFromRequest(req);

//     // Get stories from users the current user has matched with
//     const currentUser = await Users.findById(authUser.id);

//     const stories = await Story.find({
//       user: { $in: currentUser.matches },
//       expiresAt: { $gt: new Date() } // Only get active stories
//     })
//       .populate("user", "name profileImage")
//       .sort({ createdAt: -1 });

//     return NextResponse.json({ success: true, stories });
//   } catch (error) {
//     return NextResponse.json({ message: "Server error", error }, { status: 500 });
//   }
// }