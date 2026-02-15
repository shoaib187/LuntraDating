import mongoose from "mongoose";

const BlockSchema = new mongoose.Schema({
  blocker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  blockedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

// Ensure a user can't block the same person twice
BlockSchema.index({ blocker: 1, blockedUser: 1 }, { unique: true });

export default mongoose.models.Block || mongoose.model("Block", BlockSchema);