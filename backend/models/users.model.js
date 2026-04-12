import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
  },
  startDate: Date,
  endDate: Date,
  isActive: {
    type: Boolean,
    default: false,
  },
}, { _id: false });

const UsageSchema = new mongoose.Schema({
  dailySwipes: { type: Number, default: 0 },
  superLikesUsed: { type: Number, default: 0 },
  profileBoostsUsed: { type: Number, default: 0 },
}, { _id: false });

const UserSchema = new mongoose.Schema(
  {
    // 🔹 Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // don't return password by default
    },


    notifications: {
      fcmToken: { type: String, default: null },
      enabled: { type: Boolean, default: true },
    },

    // 🔹 Profile Info
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    interestedIn: {
      type: String,
      enum: [
        "male",
        "female",
        "non-binary",
        "transgender",
        "everyone",
        "men_and_women",
        "queer",
        "binary_only" // Only men and women
      ],
    },
    bio: {
      type: String,
      maxLength: 500,
    },
    dob: Date,
    photos: [String], // image URLs

    profileImage: { type: String },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Khanewal",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      formattedAddress: String // "123 React Lane, NY"
    },
    // 🔹 Account Type
    role: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },

    // 🔹 Subscription (controls premium access)
    subscription: SubscriptionSchema,

    // 🔹 Feature Usage Tracking
    usage: UsageSchema,

    interests: [String],
    height: Number,
    age: Number,
    // 🔹 Dating Logic
    likesSent: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likesReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    language: {
      type: String,
      default: "en",
    },
    // so that we can exclude already seen profiles in the discovery feed
    seenProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // 🔹 Status
    isVerified: { type: Boolean, default: false },

    // 🔹 Status
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false },
    reportCount: { type: Number, default: 0 },

    jobTitle: { type: String, trim: true },
    company: { type: String, trim: true },
    education: { type: String, trim: true },
    drinking: { type: String, enum: ["socially", "never", "frequently"] },
    smoking: { type: String, enum: ["socially", "never", "frequently"] },

    lastActiveAt: Date,
  },
  { timestamps: true }
);

// 📍 Needed for nearby users search
UserSchema.index({ location: "2dsphere" });

export default mongoose.models.User || mongoose.model("User", UserSchema);
