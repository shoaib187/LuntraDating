import { NextResponse } from "next/server";

import connectDB from "../../../../backend/lib/db/db";

import Block from "../../../../backend/models/blocks.model";

import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function GET(req) {
  try {
    await connectDB();

    const authUser = await getUserFromRequest(req);

    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "userId required" }, { status: 400 });
    }

    // I blocked them
    const blockedByMe = await Block.exists({
      blocker: authUser.id,
      blockedUser: userId,
    });

    // They blocked me
    const blockedByOther = await Block.exists({
      blocker: userId,
      blockedUser: authUser.id,
    });

    return NextResponse.json({
      success: true,

      isBlocked: blockedByMe || blockedByOther,

      blockedByMe: !!blockedByMe,

      blockedByOther: !!blockedByOther,

      canMessage: !blockedByMe && !blockedByOther,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
