import { NextResponse } from "next/server";

import connectDB from "../../../../backend/lib/db/db";

import Message from "../../../../backend/models/messages.model";
import User from "../../../../backend/models/users.model";

import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

import Notification from "../../../../backend/models/notifications.model";

import { sendPushNotification } from "@/backend/lib/notifications/sendPushNotifications";

import cloudinary from "../../../../backend/lib/cloudinary/cloudinary";

export async function POST(req) {
  try {
    await connectDB();
    console.log("Connected to DB");

    const body = await req.json();

    console.log("FULL BODY =>", body);

    const { receiverId, text, mediaUrl, mediaType } = body;

    console.log("receiverId =>", receiverId);
    console.log("text =>", text);
    console.log("mediaType =>", mediaType);

    console.log(
      "mediaUrl first 100 chars =>",
      mediaUrl ? mediaUrl.substring(0, 100) : "NO MEDIA"
    );

    console.log("mediaUrl startsWith data =>", mediaUrl?.startsWith("data:"));

    const authUser = await getUserFromRequest(req);

    console.log("authUser =>", authUser);

    const sender = await User.findById(authUser.id);

    console.log("sender =>", sender?._id);

    // Premium logic
    if (sender.role !== "premium") {
      const messageCount = await Message.countDocuments({
        sender: sender._id,
        createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
      });

      console.log("messageCount =>", messageCount);

      if (messageCount >= 1) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Free users can only send 1 direct message per day. Upgrade to Premium for unlimited!",
          },
          { status: 403 }
        );
      }
    }

    let uploadedMediaUrl = "";
    let uploadedMediaType = "";

    // Upload media
    try {
      if (mediaUrl && mediaUrl.startsWith("data:")) {
        console.log("Uploading media to Cloudinary...");

        const uploaded = await cloudinary.uploader.upload(mediaUrl, {
          folder: "messages",
          resource_type: "auto",
        });

        console.log("CLOUDINARY FULL RESPONSE =>", uploaded);

        uploadedMediaUrl = uploaded.secure_url;

        uploadedMediaType =
          uploaded.resource_type === "video" ? "video" : "image";

        console.log("uploadedMediaUrl =>", uploadedMediaUrl);
        console.log("uploadedMediaType =>", uploadedMediaType);
      } else {
        console.log("Media URL invalid or missing");
      }
    } catch (uploadError) {
      console.log("UPLOAD ERROR =>", uploadError);
    }

    console.log("Creating message...");

    const newMessage = await Message.create({
      sender: sender._id,
      receiver: receiverId,
      text: text || "",

      media: {
        url: uploadedMediaUrl,
        type: uploadedMediaType,
        thumbnail: "",
      },
    });

    console.log("NEW MESSAGE =>", newMessage);

    await Notification.create({
      type: "message",
      sender: sender._id,
      receiver: receiverId,
      relatedId: newMessage._id,
      message: `${sender.name} sent you a message`,
    });

    console.log("Notification created");

    await sendPushNotification(
      receiverId,
      sender.name,
      text || "Sent a media message"
    );

    console.log("Push notification sent");

    return NextResponse.json({
      success: true,
      message: "Message sent!",
      data: newMessage,
    });
  } catch (error) {
    console.log("MAIN ERROR =>", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";

// import connectDB from "../../../../backend/lib/db/db";

// import Message from "../../../../backend/models/messages.model";
// import User from "../../../../backend/models/users.model";

// import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

// import Notification from "../../../../backend/models/notifications.model";

// import { sendPushNotification } from "@/backend/lib/notifications/sendPushNotifications";

// import cloudinary from "../../../../backend/lib/cloudinary/cloudinary";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { receiverId, text, mediaUrl, mediaType } = await req.json();

//     // AUTH USER
//     const authUser = await getUserFromRequest(req);

//     if (!authUser) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Unauthorized",
//         },
//         {
//           status: 401,
//         }
//       );
//     }

//     // FRESH USER
//     const sender = await User.findById(authUser.id);

//     // PREMIUM PAYWALL
//     if (sender.role !== "premium") {
//       const messageCount = await Message.countDocuments({
//         sender: sender._id,

//         createdAt: {
//           $gte: new Date().setHours(0, 0, 0, 0),
//         },
//       });

//       if (messageCount >= 1) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: "Free users can only send 1 direct message per day.",
//           },
//           {
//             status: 403,
//           }
//         );
//       }
//     }

//     // CLOUDINARY MEDIA UPLOAD
//     let uploadedMediaUrl = "";

//     if (mediaUrl && mediaUrl.startsWith("data:")) {
//       try {
//         const uploaded = await cloudinary.uploader.upload(mediaUrl, {
//           folder: "messages",
//           resource_type: "auto",
//         });

//         uploadedMediaUrl = uploaded.secure_url;
//       } catch (uploadError) {
//         console.log("MESSAGE MEDIA UPLOAD ERROR", uploadError);

//         return NextResponse.json(
//           {
//             success: false,
//             message: "Failed to upload media",
//           },
//           {
//             status: 500,
//           }
//         );
//       }
//     }

//     // CREATE MESSAGE
//     const newMessage = await Message.create({
//       sender: sender._id,

//       receiver: receiverId,

//       text: text || "",

//       media: {
//         url: uploadedMediaUrl,
//         type: mediaType || "",
//       },
//     });

//     // CREATE NOTIFICATION
//     await Notification.create({
//       type: "message",

//       sender: sender._id,

//       receiver: receiverId,

//       relatedId: newMessage._id,

//       message: `${sender.name} sent you a message`,
//     });

//     // PUSH NOTIFICATION
//     await sendPushNotification(
//       receiverId,
//       sender.name,
//       text || `Sent a ${mediaType}`
//     );

//     return NextResponse.json({
//       success: true,
//       message: "Message sent!",
//       data: newMessage,
//     });
//   } catch (error) {
//     console.log("SEND MESSAGE ERROR", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Server error",
//         error: error.message,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }
