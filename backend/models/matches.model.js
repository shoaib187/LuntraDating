import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }],
  chatId: {
    type: String, // You can use this later for Socket.io or Stream Chat
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Ensure we don't have duplicate matches between the same two people
MatchSchema.index({ users: 1 });

export default mongoose.models.Match || mongoose.model("Match", MatchSchema);