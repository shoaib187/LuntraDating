import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getUserFromRequest } from "../../../backend/lib/auth/auth";
import connectDB from "../../../backend/lib/db/db";
import User from "../../../backend/models/users.model";

export async function GET(req) {
  try {
    await connectDB();

    // =========================
    // AUTH USER
    // =========================
    const tokenData = await getUserFromRequest(req);

    if (!tokenData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // =========================
    // CURRENT USER
    // =========================
    const currentUser = await User.findById(tokenData.id);

    if (!currentUser) {
      return NextResponse.json(
        { message: "User profile not found in database" },
        { status: 404 }
      );
    }

    // =========================
    // LOCATION VALIDATION
    // =========================
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

    console.log("User coordinates:", coordinates);

    // =========================
    // QUERY PARAMS (FILTERS)
    // =========================
    const { searchParams } = new URL(req.url);

    const minAge = Number(searchParams.get("minAge"));
    const maxAge = Number(searchParams.get("maxAge"));

    const gender = searchParams.get("gender");

    const interest = searchParams.get("interest");

    const education = searchParams.get("education");

    const verified = searchParams.get("verified");

    // in KM
    const maxDistanceParam = Number(searchParams.get("distance"));

    // =========================
    // PREMIUM SETTINGS
    // =========================
    const isPremium = currentUser.role === "premium";

    const limit = isPremium ? 100 : 50;

    const defaultDistance = isPremium ? 100 : 50;

    const maxDistanceKm = maxDistanceParam || defaultDistance;

    // =========================
    // EXCLUDED IDS
    // =========================
    const excludeIds = [
      currentUser._id,
      ...(currentUser.likesSent || []),
      ...(currentUser.matches || []),
      ...(currentUser.seenProfiles || []),
    ]
      .filter((id) => id && mongoose.Types.ObjectId.isValid(id))
      .map((id) => new mongoose.Types.ObjectId(id));
    console.log("excluded IDs:", excludeIds);

    // =========================
    // MATCH CRITERIA
    // =========================
    const matchCriteria = {
      _id: { $nin: excludeIds },
      isBlocked: false,
      isVerified: true,
    };

    // =========================
    // INTERESTED IN LOGIC
    // =========================
    if (currentUser.interestedIn && currentUser.interestedIn !== "everyone") {
      matchCriteria.gender =
        currentUser.interestedIn === "men_and_women"
          ? { $in: ["male", "female"] }
          : currentUser.interestedIn;
    }

    // =========================
    // FILTER: AGE
    // =========================
    if (!isNaN(minAge) || !isNaN(maxAge)) {
      matchCriteria.age = {};

      if (!isNaN(minAge)) {
        matchCriteria.age.$gte = minAge;
      }

      if (!isNaN(maxAge)) {
        matchCriteria.age.$lte = maxAge;
      }
    }

    // =========================
    // FILTER: GENDER
    // =========================
    if (gender && gender !== "all") {
      matchCriteria.gender = gender;
    }

    // =========================
    // FILTER: INTEREST
    // =========================
    if (interest) {
      matchCriteria.interests = {
        $in: [interest],
      };
    }

    // =========================
    // FILTER: EDUCATION
    // =========================
    if (education) {
      matchCriteria.education = {
        $regex: education,
        $options: "i",
      };
    }

    // =========================
    // FILTER: VERIFIED
    // =========================
    if (verified === "true") {
      matchCriteria.isVerified = true;
    }

    if (verified === "false") {
      matchCriteria.isVerified = false;
    }

    // =========================
    // AGGREGATION
    // =========================
    const profiles = await User.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: coordinates,
          },
          distanceField: "distance",
          spherical: true,
          query: matchCriteria,
          maxDistance: maxDistanceKm * 1000, // KM → meters
          distanceMultiplier: 0.001, // meters → KM
        },
      },

      {
        $sample: {
          size: limit,
        },
      },

      {
        $project: {
          name: 1,
          bio: 1,
          photos: 1,
          gender: 1,
          age: 1,
          interests: 1,
          education: 1,
          isVerified: 1,
          distance: {
            $round: ["$distance", 1],
          },
          lastActiveAt: 1,
          location: 1,
        },
      },
    ]);

    console.log("profiles found:", profiles.length);

    // =========================
    // UPDATE SEEN PROFILES
    // =========================
    if (profiles.length > 0) {
      const newSeenIds = profiles.map((p) => p._id);

      await User.findByIdAndUpdate(currentUser._id, {
        $push: {
          seenProfiles: {
            $each: newSeenIds,
            $slice: -500,
          },
        },
      });
    }

    // =========================
    // RESPONSE
    // =========================
    return NextResponse.json({
      success: true,
      count: profiles.length,
      filters: {
        minAge,
        maxAge,
        gender,
        interest,
        education,
        verified,
        distance: maxDistanceKm,
      },
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

// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import { getUserFromRequest } from "../../../backend/lib/auth/auth";
// import connectDB from "../../../backend/lib/db/db";
// import User from "../../../backend/models/users.model";

// export async function GET(req) {
//   try {
//     await connectDB();

//     // 1. Extract basic info (ID) from the token
//     const tokenData = await getUserFromRequest(req);
//     if (!tokenData)
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     // 2. Fetch the REAL user document from the DB using the ID
//     const currentUser = await User.findById(tokenData.id);

//     if (!currentUser) {
//       return NextResponse.json(
//         { message: "User profile not found in database" },
//         { status: 404 }
//       );
//     }

//     // 3. Check for valid coordinates now that we have the full DB object
//     const coordinates = currentUser.location?.coordinates;
//     if (
//       !coordinates ||
//       coordinates.length !== 2 ||
//       (coordinates[0] === 0 && coordinates[1] === 0)
//     ) {
//       return NextResponse.json(
//         {
//           message:
//             "Location not found. Please enable GPS or update your profile.",
//         },
//         { status: 400 }
//       );
//     }

//     const isPremium = currentUser.role === "premium";
//     const limit = isPremium ? 100 : 50;

//     // 4. Collect all IDs to EXCLUDE (Matches, Likes, and Already Seen)
//     const excludeIds = [
//       currentUser._id,
//       ...(currentUser.likesSent || []),
//       ...(currentUser.matches || []),
//     ]
//       .filter((id) => id && mongoose.Types.ObjectId.isValid(id))
//       .map((id) => new mongoose.Types.ObjectId(id));

//     // 5. Build match criteria
//     const matchCriteria = {
//       _id: { $nin: excludeIds },
//       isBlocked: false,
//       isVerified: true,
//     };

//     if (currentUser.interestedIn && currentUser.interestedIn !== "everyone") {
//       matchCriteria.gender =
//         currentUser.interestedIn === "men_and_women"
//           ? { $in: ["male", "female"] }
//           : currentUser.interestedIn;
//     }

//     // 6. Execute Aggregation
//     const profiles = await User.aggregate([
//       {
//         $geoNear: {
//           near: { type: "Point", coordinates: coordinates },
//           distanceField: "distance",
//           spherical: true,
//           query: matchCriteria,
//           maxDistance: isPremium ? 100000 : 50000, // 100km vs 50km
//           distanceMultiplier: 0.001, // Meters to KM
//         },
//       },
//       { $sample: { size: limit } }, // Randomize the deck
//       {
//         $project: {
//           name: 1,
//           bio: 1,
//           photos: 1,
//           gender: 1,
//           distance: { $round: ["$distance", 1] },
//           lastActiveAt: 1,
//           location: 1,
//         },
//       },
//     ]);

//     // 7. Update seenProfiles so they don't see the same people next refresh
//     if (profiles.length > 0) {
//       const newSeenIds = profiles.map((p) => p._id);
//       await User.findByIdAndUpdate(currentUser._id, {
//         $push: { seenProfiles: { $each: newSeenIds, $slice: -500 } },
//       });
//     }

//     return NextResponse.json({
//       success: true,
//       count: profiles.length,
//       data: profiles,
//     });
//   } catch (error) {
//     console.error("Critical API Error:", error);
//     return NextResponse.json(
//       {
//         message: "Server Error",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
