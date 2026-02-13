import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  name: String, // Free, Premium

  features: {
    dailySwipeLimit: Number,
    superLikesPerDay: Number,
    canSeeWhoLikedYou: Boolean,
    unlimitedMessages: Boolean,
    profileBoostPerMonth: Number,
    rewindSwipe: Boolean,
  },

  price: Number,
  durationInDays: Number,
});

export default mongoose.models.Plan || mongoose.model("Plan", PlanSchema);
