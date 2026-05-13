// import { NextResponse } from "next/server";
// import mongoose from "mongoose";

// import { getUserFromRequest } from "../../../backend/lib/auth/auth";
// import connectDB from "../../../backend/lib/db/db";

// import User from "../../../backend/models/users.model";

// export async function GET(req) {
//   try {
//     await connectDB();

//     // AUTH USER
//     const tokenData = await getUserFromRequest(req);

//     if (!tokenData) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Unauthorized",
//         },
//         { status: 401 }
//       );
//     }

//     // CURRENT USER
//     const currentUser = await User.findById(tokenData.id);

//     if (!currentUser) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "User not found",
//         },
//         { status: 404 }
//       );
//     }

//     // USER LOCATION
//     const coordinates = currentUser?.location?.coordinates;

//     if (
//       !coordinates ||
//       coordinates.length !== 2 ||
//       (coordinates[0] === 0 && coordinates[1] === 0)
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Location not found",
//         },
//         { status: 400 }
//       );
//     }

//     // EXCLUDE IDS
//     const excludeIds = [
//       currentUser._id,
//       ...(currentUser.likesSent || []),
//       ...(currentUser.matches || []),
//       ...(currentUser.seenProfiles || []),
//     ]
//       .filter((id) => id && mongoose.Types.ObjectId.isValid(id))
//       .map((id) => new mongoose.Types.ObjectId(id));

//     // MATCH FILTER
//     const matchCriteria = {
//       _id: {
//         $nin: excludeIds,
//       },

//       isBlocked: false,
//       isVerified: true,

//       "preferences.discoverable": true,
//     };

//     // GENDER FILTER
//     if (currentUser.interestedIn && currentUser.interestedIn !== "everyone") {
//       matchCriteria.gender =
//         currentUser.interestedIn === "men_and_women"
//           ? {
//               $in: ["male", "female"],
//             }
//           : currentUser.interestedIn;
//     }

//     // LIMIT
//     const LIMIT = 50;

//     // DISTANCE LEVELS (KM)
//     const distanceLevels = [
//       10000, // 10km
//       30000, // 30km
//       50000, // 50km
//       100000, // 100km
//       300000, // 300km
//       500000, // 500km
//       1000000, // 1000km
//       5000000, // 5000km
//     ];

//     let profiles = [];

//     // FIND USERS STEP BY STEP
//     for (const maxDistance of distanceLevels) {
//       profiles = await User.aggregate([
//         {
//           $geoNear: {
//             near: {
//               type: "Point",
//               coordinates,
//             },

//             distanceField: "distance",

//             spherical: true,

//             maxDistance,

//             query: matchCriteria,

//             distanceMultiplier: 0.001,
//           },
//         },

//         {
//           $sort: {
//             distance: 1,
//           },
//         },

//         {
//           $limit: LIMIT,
//         },

//         {
//           $project: {
//             name: 1,
//             bio: 1,
//             photos: 1,
//             profileImage: 1,
//             gender: 1,
//             dob: 1,
//             interests: 1,
//             address: 1,
//             isOnline: 1,
//             lastActiveAt: 1,

//             distance: {
//               $round: ["$distance", 1],
//             },
//           },
//         },
//       ]);

//       if (profiles.length >= LIMIT) {
//         break;
//       }
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         count: profiles.length,
//         data: profiles,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log("Get Nearby Profiles Error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Server Error",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { getUserFromRequest } from "../../../backend/lib/auth/auth";
import connectDB from "../../../backend/lib/db/db";

import User from "../../../backend/models/users.model";

export async function GET(req) {
  try {
    await connectDB();

    // AUTH USER
    const tokenData = await getUserFromRequest(req);

    if (!tokenData) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // CURRENT USER
    const currentUser = await User.findById(tokenData.id);

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // USER LOCATION
    const coordinates = currentUser?.location?.coordinates;

    if (
      !coordinates ||
      coordinates.length !== 2 ||
      (coordinates[0] === 0 && coordinates[1] === 0)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Location not found",
        },
        { status: 400 }
      );
    }

    // EXCLUDE IDS
    const excludeIds = [
      currentUser._id,
      ...(currentUser.likesSent || []),
      ...(currentUser.matches || []),
      ...(currentUser.seenProfiles || []),
    ]
      .filter((id) => id && mongoose.Types.ObjectId.isValid(id))
      .map((id) => new mongoose.Types.ObjectId(id));

    // MATCH FILTER
    const matchCriteria = {
      _id: {
        $nin: excludeIds,
      },

      isBlocked: false,
      isVerified: true,

      "preferences.discoverable": true,
    };

    // GENDER FILTER
    if (currentUser.interestedIn && currentUser.interestedIn !== "everyone") {
      matchCriteria.gender =
        currentUser.interestedIn === "men_and_women"
          ? {
              $in: ["male", "female"],
            }
          : currentUser.interestedIn;
    }

    // PROFILES
    const profiles = await User.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates,
          },

          distanceField: "distance",

          spherical: true,
          query: matchCriteria,
          distanceMultiplier: 0.001, // meters -> KM
        },
      },

      // NEAREST FIRST
      {
        $sort: {
          distance: 1,
        },
      },

      // LIMIT
      {
        $limit: currentUser.role === "premium" ? 100 : 50,
      },

      // RETURN DATA
      {
        $project: {
          name: 1,
          bio: 1,
          photos: 1,
          profileImage: 1,
          gender: 1,
          dob: 1,
          interests: 1,
          address: 1,
          isOnline: 1,
          lastActiveAt: 1,

          distance: {
            $round: ["$distance", 1],
          },
        },
      },
    ]);

    // // SAVE AS SEEN
    // if (profiles.length > 0) {
    //   const newSeenIds = profiles.map((profile) => profile._id);

    //   await User.findByIdAndUpdate(currentUser._id, {
    //     $push: {
    //       seenProfiles: {
    //         $each: newSeenIds,
    //         $slice: -500,
    //       },
    //     },
    //   });
    // }

    return NextResponse.json(
      {
        success: true,
        count: profiles.length,
        data: profiles,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Get Nearby Profiles Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
