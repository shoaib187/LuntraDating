import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import User from "../../../../backend/models/users.model";
import Message from "../../../../backend/models/messages.model";
import Block from "../../../../backend/models/blocks.model";
// Import Match and any other models linked to the user
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function DELETE(req) {
  try {
    await connectDB();

    // 1. Authenticate the user
    const authUser = await getUserFromRequest(req);
    if (!authUser) {
      console.log("❌ Delete failed: Unauthorized access attempt.");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = authUser.id;
    console.log(`🚀 Starting deletion process for User ID: ${userId}`);

    // 2. Delete all Chats (where user is sender OR receiver)
    const deletedMessages = await Message.deleteMany({
      $or: [{ sender: userId }, { receiver: userId }]
    });
    console.log(`✅ Chats cleaned up: ${deletedMessages.deletedCount} messages removed.`);

    // 3. Delete all Block records (where user blocked others OR was blocked)
    const deletedBlocks = await Block.deleteMany({
      $or: [{ blocker: userId }, { blockedUser: userId }]
    });
    console.log(`✅ Block records removed: ${deletedBlocks.deletedCount} entries.`);

    // 4. Cleanup Matches / Likes logic
    // Since you store likes/matches in the User document itself, 
    // we should also remove this user's ID from other people's match/likes arrays
    const updatedConnections = await User.updateMany(
      { $or: [{ matches: userId }, { likesSent: userId }, { likesReceived: userId }] },
      { $pull: { matches: userId, likesSent: userId, likesReceived: userId } }
    );
    console.log(`✅ Cleaned up references in ${updatedConnections.modifiedCount} other user profiles.`);

    // 5. Delete the actual User document
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      console.log("⚠️ User document not found at final deletion step.");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log(`🔥 SUCCESS: Account for ${deletedUser.email} and all linked data fully purged.`);

    return NextResponse.json(
      { success: true, message: "Account and all associated data deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("🛑 CRITICAL ERROR during user deletion:", error);
    return NextResponse.json(
      { message: "Server error during account deletion", error: error.message },
      { status: 500 }
    );
  }
}



// import { NextResponse } from "next/server";
// import { getUserFromToken } from "../../../../backend/lib/auth/auth";

// export async function DELETE(req) {
//   try {
//     const authHeader = req.headers.get("Authorization");
//     const user = await getUserFromToken(authHeader);
//     await user.deleteOne();

//     return NextResponse.json(
//       { success: true, message: "User account deleted successfully" },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: error.message || "Server error" },
//       { status: error.message.includes("Unauthorized") ? 401 : 500 }
//     );
//   }
// }
