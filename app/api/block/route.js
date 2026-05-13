import { NextResponse } from "next/server";
import connectDB from "../../../backend/lib/db/db";
import Block from "../../../backend/models/blocks.model";
import Match from "../../../backend/models/matches.model";
import User from "../../../backend/models/users.model";
import Message from "../../../backend/models/messages.model";
import { getUserFromRequest } from "../../../backend/lib/auth/auth";

// export async function POST(req) {
//   try {
//     await connectDB();
//     const { targetUserId } = await req.json();
//     const authUser = await getUserFromRequest(req);

//     if (!authUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     // 1. Check if already blocked
//     const existingBlock = await Block.findOne({
//       blocker: authUser.id,
//       blockedUser: targetUserId
//     });

//     if (existingBlock) {
//       // UNBLOCK: Remove the record
//       await Block.findByIdAndDelete(existingBlock._id);
//       return NextResponse.json({ success: true, isBlocked: false, message: "User unblocked" });
//     } else {
//       // BLOCK: Create the record
//       await Block.create({ blocker: authUser.id, blockedUser: targetUserId });

//       // 2. SAFETY: Automatically delete any existing Match between these two
//       await Match.findOneAndDelete({
//         users: { $all: [authUser.id, targetUserId] }
//       });

//       return NextResponse.json({ success: true, isBlocked: true, message: "User blocked and unmatched" });
//     }
//   } catch (error) {
//     return NextResponse.json({ message: "Server error", error }, { status: 500 });
//   }
// }

export async function POST(req) {
  try {
    await connectDB();

    const { targetUserId } = await req.json();

    const authUser = await getUserFromRequest(req);

    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // CHECK EXISTING BLOCK
    const existingBlock = await Block.findOne({
      blocker: authUser.id,
      blockedUser: targetUserId,
    });

    // =========================
    // UNBLOCK USER
    // =========================
    if (existingBlock) {
      // REMOVE BLOCK RECORD
      await Block.findByIdAndDelete(existingBlock._id);

      await Message.updateMany(
        {
          $or: [
            {
              sender: authUser.id,
              receiver: targetUserId,
            },
            {
              sender: targetUserId,
              receiver: authUser.id,
            },
          ],
        },
        {
          $pull: {
            deletedFor: {
              $in: [authUser.id, targetUserId],
            },
          },
        }
      );

      return NextResponse.json({
        success: true,
        isBlocked: false,
        message: "User unblocked and chats restored",
      });
    }

    // =========================
    // BLOCK USER
    // =========================

    // CREATE BLOCK
    await Block.create({
      blocker: authUser.id,
      blockedUser: targetUserId,
    });

    // REMOVE MATCH
    await Match.findOneAndDelete({
      users: { $all: [authUser.id, targetUserId] },
    });

    // REMOVE CHATS FOR BOTH USERS
    await Message.updateMany(
      {
        $or: [
          {
            sender: authUser.id,
            receiver: targetUserId,
          },
          {
            sender: targetUserId,
            receiver: authUser.id,
          },
        ],
      },
      {
        $addToSet: {
          deletedFor: {
            $each: [authUser.id, targetUserId],
          },
        },
      }
    );

    return NextResponse.json({
      success: true,
      isBlocked: true,
      message: "User blocked, unmatched and chats removed",
    });
  } catch (error) {
    console.log("BLOCK ERROR", error);

    return NextResponse.json(
      {
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
