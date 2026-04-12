import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
import Users from "../../../../backend/models/users.model";
import Story from "../../../../backend/models/stories.model";


// export async function GET(req) {
//   try {
//     await connectDB();
//     const authUser = await getUserFromRequest(req);
//     if (!authUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     const currentUser = await Users.findById(authUser.id);
//     const userId = currentUser._id.toString();

//     // 1. Fetch all active stories from matches
//     const stories = await Story.find({
//       user: { $in: currentUser.matches },
//       expiresAt: { $gt: new Date() }
//     })
//       .populate("user", "name profileImage")
//       .sort({ createdAt: 1 }); // Sort oldest to newest so they play in order

//     // 2. Group stories by User
//     const groupedStories = stories.reduce((acc, story) => {
//       const storyAuthor = story.user;
//       const authorId = storyAuthor._id.toString();

//       // Find if this user already has a group in our accumulator
//       let userGroup = acc.find((group) => group.userId === authorId);

//       const isSeen = story.views.some(v => v.toString() === userId);

//       const storyData = {
//         ...story.toObject(),
//         isSeen
//       };

//       if (!userGroup) {
//         // If first story for this user, create the group
//         acc.push({
//           userId: authorId,
//           userName: storyAuthor.name,
//           userImage: storyAuthor.profileImage,
//           allSeen: isSeen, // We will update this logic below
//           stories: [storyData]
//         });
//       } else {
//         // If group exists, push story and update overall seen status
//         userGroup.stories.push(storyData);
//         // If any story in the bundle is NOT seen, the ring should stay colored
//         if (!isSeen) userGroup.allSeen = false;
//       }

//       return acc;
//     }, []);

//     // 3. Final Polish: Sort grouped users by the timestamp of their latest story
//     const sortedGroups = groupedStories.sort((a, b) => {
//       const latestA = a.stories[a.stories.length - 1].createdAt;
//       const latestB = b.stories[b.stories.length - 1].createdAt;
//       return latestB - latestA;
//     });

//     return NextResponse.json({
//       success: true,
//       count: sortedGroups.length,
//       data: sortedGroups
//     });

//   } catch (error) {
//     console.error("Fetch Stories Error:", error);
//     return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
//   }
// }




export async function GET(req) {
  try {
    await connectDB();
    const authUser = await getUserFromRequest(req);
    if (!authUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const currentUser = await Users.findById(authUser.id);
    const userId = currentUser._id.toString();

    // --- 1. Primary Fetch: Stories from Matches ---
    let stories = await Story.find({
      user: { $in: currentUser.matches },
      expiresAt: { $gt: new Date() }
    })
      .populate("user", "name profileImage")
      .sort({ createdAt: 1 });

    // --- 2. Fallback Logic: Fetch Public Stories if Matches have none ---
    if (stories.length === 0) {
      stories = await Story.find({
        user: { $ne: userId }, // Don't show my own stories in the feed
        expiresAt: { $gt: new Date() }
      })
        .populate("user", "name profileImage")
        .limit(50) // Maximum of 50 stories
        .sort({ createdAt: -1 }); // Show newest public stories first
    }

    // --- 3. Group stories by User (Same logic as before) ---
    const groupedStories = stories.reduce((acc, story) => {
      // Safety check in case a story exists for a deleted user
      if (!story.user) return acc;

      const storyAuthor = story.user;
      const authorId = storyAuthor._id.toString();

      let userGroup = acc.find((group) => group.userId === authorId);
      const isSeen = story.views.some(v => v.toString() === userId);

      const storyData = {
        ...story.toObject(),
        isSeen
      };

      if (!userGroup) {
        acc.push({
          userId: authorId,
          userName: storyAuthor.name,
          userImage: storyAuthor.profileImage,
          allSeen: isSeen,
          stories: [storyData]
        });
      } else {
        userGroup.stories.push(storyData);
        // If any single story in the bundle is NOT seen, set allSeen to false
        if (!isSeen) userGroup.allSeen = false;
      }

      return acc;
    }, []);

    // --- 4. Final Sort ---
    const sortedGroups = groupedStories.sort((a, b) => {
      const latestA = new Date(a.stories[a.stories.length - 1].createdAt);
      const latestB = new Date(b.stories[b.stories.length - 1].createdAt);
      return latestB - latestA;
    });

    return NextResponse.json({
      success: true,
      count: sortedGroups.length,
      data: sortedGroups
    });

  } catch (error) {
    console.error("Story Fetch Error:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}