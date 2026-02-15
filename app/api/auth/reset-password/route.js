import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import User from "../../../../backend/models/users.model";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { email, otp, newPassword } = await req.json();

    const user = await User.findOne({
      email: email.toLowerCase(),
      otp: otp,
      otpExpires: { $gt: new Date() } // Check if OTP is still valid
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
    }

    // 1. Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // 2. Clear OTP fields so they can't be reused
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return NextResponse.json({ success: true, message: "Password reset successful." });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}