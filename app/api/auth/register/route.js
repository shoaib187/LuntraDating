
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from '../../../../backend/lib/db/db';
import User from '../../../../backend/models/users.model';
import Plan from '../../../../backend/models/plan.model';
import { sendOTPEmail } from '../../../../backend/lib/mail/sendMail';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, password, gender, interestedIn, dob } = body;

    // 1. Basic Validation
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    // 2. Generate OTP and Expiry (e.g., 10 minutes)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const hashedPassword = await bcrypt.hash(password, 12);
    const freePlan = await Plan.findOne({ name: "Free" });

    // 3. Create user with isVerified: false
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
      interestedIn,
      dob,
      isVerified: false, // User cannot login until verified
      otp,
      otpExpires,
      role: "free",
      subscription: { planId: freePlan?._id, isActive: false },
      profileImage: "https://i.ibb.co/4pFbNpH/blank-profile-picture.png"
    });

    // 4. Send the Email
    await sendOTPEmail(email, otp);

    return NextResponse.json({
      success: true,
      message: "OTP sent to email. Please verify to complete registration.",
      userId: user._id,
      user
    }, { status: 201 });

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


