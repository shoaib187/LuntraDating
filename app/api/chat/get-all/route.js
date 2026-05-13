import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import Message from "../../../../backend/models/messages.model";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
import Block from "../../../../backend/models/blocks.model";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await connectDB();

    const authUser = await getUserFromRequest(req);

    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = new mongoose.Types.ObjectId(authUser.id);

    // USERS I BLOCKED
    const blockedByMe = await Block.find({
      blocker: userId,
    }).distinct("blockedUser");

    const blockedMe = await Block.find({
      blockedUser: userId,
    }).distinct("blocker");

    const excludedUsers = blockedByMe;

    const inbox = await Message.aggregate([
      // FIND USER MESSAGES
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],

          // HIDE DELETED CHATS
          deletedFor: {
            $ne: userId,
          },
        },
      },

      // LATEST FIRST
      {
        $sort: {
          createdAt: -1,
        },
      },

      // GROUP CONVERSATIONS
      {
        $group: {
          _id: {
            $cond: [{ $eq: ["$sender", userId] }, "$receiver", "$sender"],
          },

          lastMessage: {
            $first: "$text",
          },

          lastMessageTime: {
            $first: "$createdAt",
          },

          senderOfLastMessage: {
            $first: "$sender",
          },

          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$receiver", userId] },
                    { $eq: ["$isRead", false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      // REMOVE USERS I BLOCKED
      {
        $match: {
          _id: {
            $nin: excludedUsers,
          },
        },
      },

      // USER DETAILS
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },

      {
        $unwind: "$userDetails",
      },

      // FINAL FORMAT
      {
        $project: {
          _id: 1,
          lastMessage: 1,
          lastMessageTime: 1,
          senderOfLastMessage: 1,
          unreadCount: 1,

          name: "$userDetails.name",
          profileImage: "$userDetails.profileImage",
          isOnline: "$userDetails.isOnline",

          blockedByMe: {
            $in: ["$_id", blockedByMe],
          },

          blockedByOther: {
            $in: ["$_id", blockedMe],
          },

          canMessage: {
            $and: [
              {
                $not: {
                  $in: ["$_id", blockedByMe],
                },
              },
              {
                $not: {
                  $in: ["$_id", blockedMe],
                },
              },
            ],
          },
        },
      },

      // SORT AGAIN
      {
        $sort: {
          lastMessageTime: -1,
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      inbox,
    });
  } catch (error) {
    console.error("Inbox Error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import connectDB from "../../../../backend/lib/db/db";
// import Message from "../../../../backend/models/messages.model";
// import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
// import Block from "../../../../backend/models/blocks.model";
// import mongoose from "mongoose";

// export async function GET(req) {
//   try {
//     await connectDB();
//     const authUser = await getUserFromRequest(req);
//     if (!authUser)
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     const userId = new mongoose.Types.ObjectId(authUser.id);

//     const inbox = await Message.aggregate([
//       // 1. Find all messages involving the current user
//       { $match: { $or: [{ sender: userId }, { receiver: userId }] } },

//       // 2. Sort by time descending so the latest message is first
//       { $sort: { createdAt: -1 } },

//       // 3. Group by the "Other User"
//       {
//         $group: {
//           _id: {
//             $cond: [{ $eq: ["$sender", userId] }, "$receiver", "$sender"],
//           },
//           lastMessage: { $first: "$text" },
//           lastMessageTime: { $first: "$createdAt" },
//           senderOfLastMessage: { $first: "$sender" },
//           unreadCount: {
//             $sum: {
//               $cond: [
//                 {
//                   $and: [
//                     { $eq: ["$receiver", userId] },
//                     { $eq: ["$isRead", false] },
//                   ],
//                 },
//                 1,
//                 0,
//               ],
//             },
//           },
//         },
//       },

//       // 4. Join with Users collection to get Profile Info
//       {
//         $lookup: {
//           from: "users", // the name of your users collection
//           localField: "_id",
//           foreignField: "_id",
//           as: "userDetails",
//         },
//       },
//       { $unwind: "$userDetails" },

//       // 5. Clean up the output
//       {
//         $project: {
//           _id: 1,
//           lastMessage: 1,
//           lastMessageTime: 1,
//           senderOfLastMessage: 1,
//           unreadCount: 1,
//           name: "$userDetails.name",
//           profileImage: "$userDetails.profileImage",
//           isOnline: "$userDetails.isOnline",
//         },
//       },

//       // 6. Sort inbox by most recent activity
//       { $sort: { lastMessageTime: -1 } },
//     ]);

//     return NextResponse.json({ success: true, inbox });
//   } catch (error) {
//     console.error("Inbox Error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
