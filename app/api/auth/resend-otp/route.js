import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import User from "../../../../backend/models/users.model";

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Security: Don't confirm if user exists, just return success
      return NextResponse.json({ success: true, message: "OTP resent if account exists." });
    }

    // 1. Optional: Rate Limiting (Prevent resending within 60 seconds)
    // You can compare user.updatedAt or add a 'lastOtpSent' field to your schema

    // 2. Generate new 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Update User document
    user.otp = newOtp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes
    await user.save();

    // 4. Log for testing (In production, send via email service)
    console.log(`New OTP for ${email}: ${newOtp}`);

    return NextResponse.json({
      success: true,
      message: "A new OTP has been sent to your email."
    });

  } catch (error) {
    console.error("Resend OTP Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}