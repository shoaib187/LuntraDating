import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    text: {
      type: String,
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

// This line is critical: it checks if the model exists before creating it
const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);

// This is the line your error is complaining about:
export default Message;