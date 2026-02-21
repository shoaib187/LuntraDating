import { NextResponse } from "next/server";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
import connectDB from "../../../../backend/lib/db/db";
import User from "../../../../backend/models/users.model";

export async function PATCH(req) {
  try {
    await connectDB();
    const { fcmToken, enabled } = await req.json();
    const authUser = await getUserFromRequest(req);

    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const updateData = {};

    if (fcmToken !== undefined) {
      updateData["notifications.fcmToken"] = fcmToken;
    }

    if (enabled !== undefined) {
      updateData["notifications.enabled"] = enabled;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No data provided to update" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(authUser.id, updateData, { new: true });
    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating notification settings", error },
      { status: 500 }
    );
  }
}







// export async function PATCH(req) {
//   try {
//     await connectDB();
//     const { fcmToken } = await req.json();
//     const authUser = await getUserFromRequest(req);

//     if (!authUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     await User.findByIdAndUpdate(authUser.id, {
//       "notifications.fcmToken": fcmToken
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ message: "Error updating token", error }, { status: 500 });
//   }
// }