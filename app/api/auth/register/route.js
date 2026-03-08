
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from '../../../../backend/lib/db/db';
import User from '../../../../backend/models/users.model';
import Plan from '../../../../backend/models/plan.model';
import { sendOTPEmail } from '../../../../backend/lib/mail/sendMail';
import cloudinary from '../../../../backend/lib/cloudinary/cloudinary';

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ id: userId }, secret, {
    expiresIn: "1h",
  });
};

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      name, email, password, image, interests = ["sports"],
      gender = "male", interestedIn = "female", dob = "1998-05-10",
      age = 18, height = 123
    } = body;

    // 1. Basic Validation
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // --- Image Logic for Postman ---
    let profileImageUrl;
    if (image) {
      // If 'image' is a Base64 string from Postman
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "my_preset",
      });
      console.log("uploadResponse:", uploadResponse);
      profileImageUrl = uploadResponse.secure_url;
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
      isVerified: false,
      otp,
      interests,
      height,
      age,
      otpExpires,
      role: "free",
      subscription: { planId: freePlan?._id, isActive: false },
      profileImage: profileImageUrl
    });

    // 4. Send the Email
    await sendOTPEmail(email, otp);

    const token = generateToken(user._id); // Use your existing JWT logic here

    return NextResponse.json({
      success: true,
      message: "OTP sent to email. Please verify to complete registration.",
      userId: user._id,
      user,
      token
    }, { status: 201 });

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}




