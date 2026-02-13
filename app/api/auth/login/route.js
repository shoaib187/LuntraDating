import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from '../../../../backend/lib/db/db';
import User from '../../../../backend/models/users.model';

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // 🔹 Find user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // if (!user.isVerified) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Please verify your email before logging in.",
    //       requiresVerification: true // Helpful flag for frontend logic
    //     },
    //     { status: 403 } // 403 Forbidden is appropriate here
    //   );
    // }

    // 🔹 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // 🔹 Create JWT token
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    // 🔹 Return user info (exclude password) + token
    const { password: pwd, ...userData } = user.toObject();

    return NextResponse.json(
      { success: true, token, user: userData },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
