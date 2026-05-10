// import { NextResponse } from "next/server";
// import mongoose from "mongoose";

// import { getUserFromRequest } from "../../../backend/lib/auth/auth";
// import connectDB from "../../../backend/lib/db/db";
// import User from "../../../backend/models/users.model";

// export async function GET(req) {
//   try {
//     await connectDB();

//     // =========================
//     // AUTH USER
//     // =========================
//     const tokenData = await getUserFromRequest(req);

//     if (!tokenData) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // =========================
//     // CURRENT USER
//     // =========================
//     const currentUser = await User.findById(tokenData.id);

//     if (!currentUser) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     // =========================
//     // USER LOCATION
//     // =========================
//     const coordinates = currentUser.location?.coordinates;

//     if (
//       !coordinates ||
//       coordinates.length !== 2 ||
//       (coordinates[0] === 0 && coordinates[1] === 0)
//     ) {
//       return NextResponse.json(
//         {
//           message: "Please update your location first",
//         },
//         { status: 400 }
//       );
//     }

//     // =========================
//     // QUERY PARAMS
//     // =========================
//     const { searchParams } = new URL(req.url);

//     const page = Number(searchParams.get("page")) || 1;

//     const limit =
//       Number(searchParams.get("limit")) ||
//       (currentUser.role === "premium" ? 100 : 20);

//     const minAge = Number(searchParams.get("minAge"));

//     const maxAge = Number(searchParams.get("maxAge"));

//     const gender = searchParams.get("gender");

//     const interest = searchParams.get("interest");

//     const education = searchParams.get("education");

//     const verified = searchParams.get("verified");

//     const distance =
//       Number(searchParams.get("distance")) ||
//       (currentUser.role === "premium" ? 100 : 50);

//     // =========================
//     // EXCLUDED USERS
//     // =========================
//     const excludeIds = [
//       currentUser._id,
//       ...(currentUser.likesSent || []),
//       ...(currentUser.matches || []),
//       ...(currentUser.seenProfiles || []),
//     ]
//       .filter((id) => id && mongoose.Types.ObjectId.isValid(id))
//       .map((id) => new mongoose.Types.ObjectId(id));

//     // =========================
//     // MATCH FILTERS
//     // =========================
//     const matchCriteria = {
//       _id: {
//         $nin: excludeIds,
//       },

//       isBlocked: false,
//     };

//     // interestedIn logic
//     if (currentUser.interestedIn && currentUser.interestedIn !== "everyone") {
//       matchCriteria.gender =
//         currentUser.interestedIn === "men_and_women"
//           ? { $in: ["male", "female"] }
//           : currentUser.interestedIn;
//     }

//     // gender filter
//     if (gender && gender !== "all") {
//       matchCriteria.gender = gender;
//     }

//     // age filter
//     if (!isNaN(minAge) || !isNaN(maxAge)) {
//       matchCriteria.age = {};

//       if (!isNaN(minAge)) {
//         matchCriteria.age.$gte = minAge;
//       }

//       if (!isNaN(maxAge)) {
//         matchCriteria.age.$lte = maxAge;
//       }
//     }

//     // interests filter
//     if (interest) {
//       matchCriteria.interests = {
//         $in: [interest],
//       };
//     }

//     // education filter
//     if (education) {
//       matchCriteria.education = {
//         $regex: education,
//         $options: "i",
//       };
//     }

//     // verified filter
//     if (verified === "true") {
//       matchCriteria.isVerified = true;
//     }

//     if (verified === "false") {
//       matchCriteria.isVerified = false;
//     }

//     // =========================
//     // TOTAL COUNT
//     // =========================
//     const total = await User.countDocuments(matchCriteria);

//     // =========================
//     // AGGREGATION
//     // =========================
//     const profiles = await User.aggregate([
//       {
//         $geoNear: {
//           near: {
//             type: "Point",
//             coordinates,
//           },

//           distanceField: "distance",

//           spherical: true,

//           maxDistance: distance * 1000,

//           query: matchCriteria,

//           distanceMultiplier: 0.001,
//         },
//       },

//       {
//         $sort: {
//           distance: 1,
//           lastActiveAt: -1,
//         },
//       },

//       {
//         $skip: (page - 1) * limit,
//       },

//       {
//         $limit: limit,
//       },

//       {
//         $project: {
//           name: 1,
//           gender: 1,
//           bio: 1,
//           photos: 1,
//           role: 1,
//           age: 1,
//           interests: 1,
//           education: 1,
//           isVerified: 1,
//           lastActiveAt: 1,
//           location: 1,

//           distance: {
//             $round: ["$distance", 1],
//           },
//         },
//       },
//     ]);

//     // =========================
//     // UPDATE SEEN USERS
//     // =========================
//     if (profiles.length > 0) {
//       const newSeenIds = profiles.map((profile) => profile._id);

//       await User.findByIdAndUpdate(currentUser._id, {
//         $addToSet: {
//           seenProfiles: {
//             $each: newSeenIds,
//           },
//         },
//       });
//     }

//     // =========================
//     // RESPONSE
//     // =========================
//     return NextResponse.json({
//       success: true,

//       count: profiles.length,

//       total,

//       page,

//       limit,

//       profiles,

//       filters: {
//         minAge,
//         maxAge,
//         gender,
//         interest,
//         education,
//         verified,
//         distance,
//       },
//     });
//   } catch (error) {
//     console.log("Recommendation Error:", error);

//     return NextResponse.json(
//       {
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

    // 1. Extract basic info (ID) from the token
    const tokenData = await getUserFromRequest(req);
    if (!tokenData)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    // 2. Fetch the REAL user document from the DB using the ID
    const currentUser = await User.findById(tokenData.id);

    if (!currentUser) {
      return NextResponse.json(
        { message: "User profile not found in database" },
        { status: 404 }
      );
    }

    // 3. Check for valid coordinates now that we have the full DB object
    const coordinates = currentUser.location?.coordinates;
    if (
      !coordinates ||
      coordinates.length !== 2 ||
      (coordinates[0] === 0 && coordinates[1] === 0)
    ) {
      return NextResponse.json(
        {
          message:
            "Location not found. Please enable GPS or update your profile.",
        },
        { status: 400 }
      );
    }

    const isPremium = currentUser.role === "premium";
    const limit = isPremium ? 100 : 50;

    // 4. Collect all IDs to EXCLUDE (Matches, Likes, and Already Seen)
    const excludeIds = [
      currentUser._id,
      ...(currentUser.likesSent || []),
      ...(currentUser.matches || []),
    ]
      .filter((id) => id && mongoose.Types.ObjectId.isValid(id))
      .map((id) => new mongoose.Types.ObjectId(id));

    // 5. Build match criteria
    const matchCriteria = {
      _id: { $nin: excludeIds },
      isBlocked: false,
      isVerified: true,
    };

    if (currentUser.interestedIn && currentUser.interestedIn !== "everyone") {
      matchCriteria.gender =
        currentUser.interestedIn === "men_and_women"
          ? { $in: ["male", "female"] }
          : currentUser.interestedIn;
    }

    // 6. Execute Aggregation
    const profiles = await User.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: coordinates },
          distanceField: "distance",
          spherical: true,
          query: matchCriteria,
          maxDistance: isPremium ? 100000 : 50000, // 100km vs 50km
          distanceMultiplier: 0.001, // Meters to KM
        },
      },
      { $sample: { size: limit } }, // Randomize the deck
      {
        $project: {
          name: 1,
          bio: 1,
          photos: 1,
          gender: 1,
          distance: { $round: ["$distance", 1] },
          lastActiveAt: 1,
          location: 1,
        },
      },
    ]);

    // 7. Update seenProfiles so they don't see the same people next refresh
    if (profiles.length > 0) {
      const newSeenIds = profiles.map((p) => p._id);
      await User.findByIdAndUpdate(currentUser._id, {
        $push: { seenProfiles: { $each: newSeenIds, $slice: -500 } },
      });
    }

    return NextResponse.json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    console.error("Critical API Error:", error);
    return NextResponse.json(
      {
        message: "Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
