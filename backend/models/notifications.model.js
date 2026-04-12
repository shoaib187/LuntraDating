import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["match", "message", "like", "story_reply", "system"],
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true, // Optimized for fetching "my notifications"
  },
  // The ID of the specific Chat, Story, or Post to navigate to when tapped
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  // Auto-delete notifications after 30 days to save database space
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    index: { expires: 0 }
  }
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);