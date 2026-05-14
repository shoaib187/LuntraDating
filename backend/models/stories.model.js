import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // STORY MEDIA

    mediaUrl: {
      type: String,
      default: "",
    },

    mediaType: {
      type: String,
      enum: ["image", "video", "text"],
      default: "image",
    },

    // TEXT STORY

    caption: {
      type: String,
      default: "",
    },

    textColor: {
      type: String,
      default: "#FFFFFF",
    },

    fontFamily: {
      type: String,
      default: "System",
    },

    backgroundType: {
      type: String,
      enum: ["solid", "linear-gradient"],
      default: "solid",
    },

    backgroundColor: {
      type: String,
      default: "#000000",
    },

    gradientColors: {
      type: [String],
      default: ["#000000", "#222222"],
    },

    // AUDIO / MUSIC

    audioUrl: {
      type: String,
      default: "",
    },

    audioTitle: {
      type: String,
      default: "",
    },

    audioArtist: {
      type: String,
      default: "",
    },

    // VIEWS

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

    // AUTO DELETE AFTER 24H

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),

      index: { expires: 0 },
    },
  },

  { timestamps: true }
);

export default mongoose.models.Story || mongoose.model("Story", StorySchema);

// import mongoose from "mongoose";

// const StorySchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     mediaUrl: {
//       type: String, // URL from Cloudinary or S3
//       required: false,
//       default: "",
//     },
//     mediaType: {
//       type: String,
//       enum: ["image", "video", "text"],
//       default: "image",
//     },
//     caption: {
//       // 2. Add caption to your schema!
//       type: String,
//       default: "",
//     },
//     views: [
//       {
//         user: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "User",
//         },

//         viewedAt: {
//           type: Date,
//           default: Date.now,
//         },

//         viewCount: {
//           type: Number,
//           default: 1,
//         },
//       },
//     ],
//     expiresAt: {
//       type: Date,
//       default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
//       index: { expires: 0 }, // MongoDB will auto-delete the doc at this time!
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Story || mongoose.model("Story", StorySchema);
