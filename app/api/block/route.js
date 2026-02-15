import { NextResponse } from "next/server";
import connectDB from "../../../backend/lib/db/db";
import Block from "../../../backend/models/blocks.model";
import Match from "../../../backend/models/matches.model";
import User from "../../../backend/models/users.model";
import { getUserFromRequest } from "../../../backend/lib/auth/auth";

export async function POST(req) {
  try {
    await connectDB();
    const { targetUserId } = await req.json();
    const authUser = await getUserFromRequest(req);

    if (!authUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    // 1. Check if already blocked
    const existingBlock = await Block.findOne({
      blocker: authUser.id,
      blockedUser: targetUserId
    });

    if (existingBlock) {
      // UNBLOCK: Remove the record
      await Block.findByIdAndDelete(existingBlock._id);
      return NextResponse.json({ success: true, isBlocked: false, message: "User unblocked" });
    } else {
      // BLOCK: Create the record
      await Block.create({ blocker: authUser.id, blockedUser: targetUserId });

      // 2. SAFETY: Automatically delete any existing Match between these two
      await Match.findOneAndDelete({
        users: { $all: [authUser.id, targetUserId] }
      });

      return NextResponse.json({ success: true, isBlocked: true, message: "User blocked and unmatched" });
    }
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}



export async function GET(req) {
  try {
    await connectDB();
    const authUser = await getUserFromRequest(req);

    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 1. Find all block records created by this user
    const blockedList = await Block.find({ blocker: authUser.id })
      .populate({
        path: "blockedUser",
        select: "name profileImage bio", // Only fetch necessary fields
      })
      .sort({ createdAt: -1 }); // Newest blocks first

    // 2. Format the response to return just the user objects
    const users = blockedList
      .map((item) => item.blockedUser)
      .filter((user) => user !== null); // Filter out users who might have deleted their account


    // optional
    // Get list of IDs I have blocked
    const blockedRecords = await Block.find({ blocker: authUser.id }).distinct("blockedUser");

    // Get list of people who have blocked ME (optional but recommended)
    const blockedMeRecords = await Block.find({ blockedUser: authUser.id }).distinct("blocker");

    const excludeIds = [...blockedRecords, ...blockedMeRecords];

    // Find users, excluding those IDs
    const remainingUsers = await User.find({
      _id: { $nin: excludeIds }
    });


    return NextResponse.json({
      success: true,
      count: users.length,
      blockedUsers: users,
      allUsers: remainingUsers
    });
  } catch (error) {
    console.error("Get Blocked Users Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}