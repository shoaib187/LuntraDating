import { NextResponse } from "next/server";

import connectDB from "../../../../backend/lib/db/db";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

import Block from "../../../../backend/models/blocks.model";

export async function GET(req) {
  try {
    await connectDB();

    const authUser = await getUserFromRequest(req);

    if (!authUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // USERS I BLOCKED
    const blockedByMe = await Block.find({
      blocker: authUser.id,
    }).populate({
      path: "blockedUser",
      select: "name profileImage bio age gender location",
    });

    // FORMAT USERS
    const users = blockedByMe.map((item) => item.blockedUser).filter(Boolean);

    return NextResponse.json(
      {
        success: true,
        count: users.length,
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Get blocked profiles error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";

// import connectDB from "../../../../backend/lib/db/db";
// import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

// import Block from "../../../../backend/models/blocks.model";

// export async function GET(req) {
//   try {
//     await connectDB();

//     // Auth user
//     const authUser = await getUserFromRequest(req);

//     if (!authUser) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Unauthorized",
//         },
//         { status: 401 }
//       );
//     }

//     // Get blocked profiles
//     const blockedProfiles = await Block.find({
//       blocker: authUser.id,
//     })
//       .populate({
//         path: "blockedUser",
//         select: "name profileImage bio age gender location",
//       })
//       .sort({ createdAt: -1 });

//     // Clean response
//     const users = blockedProfiles
//       .map((item) => item.blockedUser)
//       .filter(Boolean);

//     return NextResponse.json(
//       {
//         success: true,
//         count: users.length,
//         data: users,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log("Get blocked profiles error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Server error",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
