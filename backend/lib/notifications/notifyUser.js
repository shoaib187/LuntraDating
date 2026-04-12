import Notification from "../../models/notifications.model";
import { sendPushNotification } from "./sendPushNotifications";
export const notifyUser = async ({
  receiverId,
  senderId,
  type,
  message,
  relatedId,
  pushTitle
}) => {
  try {

    const newNotif = await Notification.create({
      type,
      sender: senderId,
      receiver: receiverId,
      message,
      relatedId,
    });

    // We pass the relatedId in 'data' so the app knows where to navigate
    await sendPushNotification(
      receiverId,
      pushTitle || "New Activity",
      message,
      { type, relatedId: relatedId.toString() }
    );

    return newNotif;
  } catch (error) {
    console.error("NotifyUser Helper Error:", error);
  }
};