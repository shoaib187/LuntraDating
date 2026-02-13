import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import User from "../../../../backend/models/users.model";

export async function POST(req) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
    }

    console.log("Searching for:", { email, otp });

    const userRecord = await User.findOne({ email: email.toLowerCase() });

    if (userRecord) {
      console.log("User found in DB. OTP in DB:", userRecord.otp);
      console.log("OTP Expire in DB:", userRecord.otpExpires);
      console.log("Current Server Time:", new Date());
      console.log("Is OTP Match?:", userRecord.otp === otp);
      console.log("Is Expired?:", userRecord.otpExpires < new Date());
    } else {
      console.log("No user found with that email.");
    }

    // Find user by email AND otp AND check if otp is still valid (not expired)
    const user = await User.findOne({
      email: email.toLowerCase(),
      otp: otp,
      otpExpires: { $gt: new Date() }
    });


    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired OTP. Please request a new one." },
        { status: 400 }
      );
    }

    // Update status and clear the OTP fields so they can't be reused
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Account verified successfully! You can now log in."
    }, { status: 200 });

  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ message: "Server error during verification" }, { status: 500 });
  }
}