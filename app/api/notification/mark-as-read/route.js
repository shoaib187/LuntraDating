import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
import connectDB from "../../../../backend/lib/db/db";
import Notification from "../../../../backend/models/notifications.model.js";

export async function PATCH(req) {
  try {
    await connectDB();
    const authUser = await getUserFromRequest(req);
    const { notificationId, all } = await req.json();

    if (all) {
      // Mark all as read for this user
      await Notification.updateMany(
        { receiver: authUser.id, isRead: false },
        { $set: { isRead: true } }
      );
    } else {
      // Mark a specific notification as read
      await Notification.findByIdAndUpdate(notificationId, { isRead: true });
    }

    return NextResponse.json({ success: true, message: "Notifications updated" });
  } catch (error) {
    return NextResponse.json({ message: "Update failed", error: error.message }, { status: 500 });
  }
}