import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import User from "../../../../backend/models/users.model";

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // For security, don't reveal if a user exists. Just say "Check your email"
      return NextResponse.json({ success: true, message: "If an account exists, an OTP has been sent." });
    }

    // 1. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Set expiry (e.g., 10 minutes)
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    // 3. TODO: Send Email using Nodemailer/Resend
    console.log(`OTP for ${email}: ${otp}`);

    return NextResponse.json({ success: true, message: "OTP sent to your email.", otp });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}