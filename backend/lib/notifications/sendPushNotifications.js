import { getAuthAdmin } from "./firebaseAdmin";
import User from "../../models/users.model";

export const sendPushNotification = async (userId, title, body, data = {}) => {
  try {
    const admin = getAuthAdmin();
    const user = await User.findById(userId);

    // Check if user and token exist
    if (!user?.notifications?.fcmToken) {
      console.warn("⚠️ No FCM token found for user:", userId);
      return null;
    }

    const stringData = Object.keys(data).reduce((acc, key) => {
      acc[key] = String(data[key]);
      return acc;
    }, {});

    const message = {
      notification: { title, body },
      data: stringData,
      token: user.notifications.fcmToken,
      // Optional: Add android/apns configs for higher reliability
      android: { priority: "high" },
      apns: { payload: { aps: { sound: "default" } } },
    };

    const response = await admin.messaging().send(message);
    console.log("🚀 Notification sent successfully:", response);
    return response;
  } catch (error) {
    // If the token is invalid (e.g. user uninstalled app), you should remove it
    if (error.code === 'messaging/registration-token-not-registered') {
      console.log("🗑️ Token expired. Removing from DB...");
      // Add logic here to clear the token from your User model
    }
    console.error("❌ Push Error:", error.message);
    throw error;
  }
};