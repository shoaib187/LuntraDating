import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mediaUrl: {
      type: String, // URL from Cloudinary or S3
      required: false,
      default: "",
    },
    mediaType: {
      type: String,
      enum: ["image", "video", "text"],
      default: "image",
    },
    caption: {
      // 2. Add caption to your schema!
      type: String,
      default: "",
    },
    views: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        viewedAt: {
          type: Date,
          default: Date.now,
        },

        viewCount: {
          type: Number,
          default: 1,
        },
      },
    ],
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      index: { expires: 0 }, // MongoDB will auto-delete the doc at this time!
    },
  },
  { timestamps: true }
);

export default mongoose.models.Story || mongoose.model("Story", StorySchema);
