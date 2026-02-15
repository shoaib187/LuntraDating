import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import User from "../../../../backend/models/users.model";
import bcrypt from "bcryptjs";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function PATCH(req) {
  try {
    await connectDB();

    // 1. Authenticate the user
    const authUser = await getUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // 2. Fetch user from DB (including the password field which is hidden by default)
    const user = await User.findById(authUser.id).select("+password");

    // 3. Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      console.log(`❌ Password change failed for ${user.email}: Incorrect current password.`);
      return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
    }

    // 4. Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 5. Update user
    user.password = hashedPassword;
    await user.save();

    console.log(`✅ Password updated successfully for user: ${user.email}`);

    return NextResponse.json({
      success: true,
      message: "Password updated successfully"
    }, { status: 200 });

  } catch (error) {
    console.error("🛑 Change Password Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}