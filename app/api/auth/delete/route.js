import { NextResponse } from "next/server";
import { getUserFromToken } from "../../../../backend/lib/auth/auth";

export async function DELETE(req) {
  try {
    const authHeader = req.headers.get("Authorization");
    const user = await getUserFromToken(authHeader);
    await user.deleteOne();

    return NextResponse.json(
      { success: true, message: "User account deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: error.message.includes("Unauthorized") ? 401 : 500 }
    );
  }
}
