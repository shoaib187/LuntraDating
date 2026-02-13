import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import User from "../../../../backend/models/users.model";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function PUT(req) {
  try {
    await connectDB();

    // 1. Authenticate User
    const currentUser = await getUserFromRequest(req);
    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse Body
    const body = await req.json();

    // 3. Define allowed fields (Security: Don't let users edit their 'role' or 'email' here)
    const allowedUpdates = [
      "name",
      "bio",
      "gender",
      "interestedIn",
      "dob",
      "photos",
      "location"
    ];

    // Filter the body to only include allowed fields
    const updates = {};
    allowedUpdates.forEach((field) => {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    });

    // 4. Update Database
    // { new: true } returns the updated document, { runValidators: true } ensures schema rules apply
    const updatedUser = await User.findByIdAndUpdate(
      currentUser.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password"); // Hide password in response

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}