import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      default: "",
    },

    // NEW
    media: {
      url: {
        type: String,
        default: "",
      },

      type: {
        type: String,
        enum: ["image", "video", ""],
        default: "",
      },

      thumbnail: {
        type: String,
        default: "",
      },
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    deletedFor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isDeletedForEveryone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;

// import mongoose from "mongoose";

// const MessageSchema = new mongoose.Schema(
//   {
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     receiver: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     text: {
//       type: String,
//       default: "",
//     },

//     mediaUrl: {
//       type: String,
//       default: "",
//     },

//     mediaType: {
//       type: String,
//       enum: ["image", "video", ""],
//       default: "",
//     },

//     isRead: {
//       type: Boolean,
//       default: false,
//     },

//     deletedFor: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Message =
//   mongoose.models.Message || mongoose.model("Message", MessageSchema);

// export default Message;
