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
    const userId = currentUser._id.toString();

    // 1. Fetch all active stories from matches
    const stories = await Story.find({
      user: { $in: currentUser.matches },
      expiresAt: { $gt: new Date() }
    })
      .populate("user", "name profileImage")
      .sort({ createdAt: 1 }); // Sort oldest to newest so they play in order

    // 2. Group stories by User
    const groupedStories = stories.reduce((acc, story) => {
      const storyAuthor = story.user;
      const authorId = storyAuthor._id.toString();

      // Find if this user already has a group in our accumulator
      let userGroup = acc.find((group) => group.userId === authorId);

      const isSeen = story.views.some(v => v.toString() === userId);

      const storyData = {
        ...story.toObject(),
        isSeen
      };

      if (!userGroup) {
        // If first story for this user, create the group
        acc.push({
          userId: authorId,
          userName: storyAuthor.name,
          userImage: storyAuthor.profileImage,
          allSeen: isSeen, // We will update this logic below
          stories: [storyData]
        });
      } else {
        // If group exists, push story and update overall seen status
        userGroup.stories.push(storyData);
        // If any story in the bundle is NOT seen, the ring should stay colored
        if (!isSeen) userGroup.allSeen = false;
      }

      return acc;
    }, []);

    // 3. Final Polish: Sort grouped users by the timestamp of their latest story
    const sortedGroups = groupedStories.sort((a, b) => {
      const latestA = a.stories[a.stories.length - 1].createdAt;
      const latestB = b.stories[b.stories.length - 1].createdAt;
      return latestB - latestA;
    });

    return NextResponse.json({
      success: true,
      count: sortedGroups.length,
      data: sortedGroups
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