import { NextResponse } from "next/server";
import User from "../../../../backend/models/users.model";
import connectDB from "../../../../backend/lib/db/db";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await connectDB();

    const currentUser = await getUserFromRequest(req);
    if (!currentUser || !currentUser.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || (currentUser.role === "premium" ? "50" : "20"));
    const skip = (page - 1) * limit;

    // --- Prepare Age Dates ---
    const now = new Date();
    const minAge = 18;
    const maxAge = 99;
    const minDob = new Date(now.getFullYear() - maxAge, now.getMonth(), now.getDate());
    const maxDob = new Date(now.getFullYear() - minAge, now.getMonth(), now.getDate());

    // --- Build the Match Query (Conditions for $geoNear) ---
    const matchQuery = {
      _id: {
        $ne: new mongoose.Types.ObjectId(currentUser.id), // Exclude self
        $nin: (currentUser.matches || []).map(id => new mongoose.Types.ObjectId(id)) // Exclude matches
      },
      isBlocked: false,
      isVerified: true,
      dob: { $gte: minDob, $lte: maxDob }
    };

    if (currentUser.interestedIn) {
      matchQuery.gender = { $in: Array.isArray(currentUser.interestedIn) ? currentUser.interestedIn : [currentUser.interestedIn] };
    }

    // --- Aggregation Pipeline ---
    const pipeline = [];

    // 1. $geoNear MUST be the first stage
    if (currentUser.location && currentUser.location.coordinates) {
      pipeline.push({
        $geoNear: {
          near: {
            type: "Point",
            coordinates: currentUser.location.coordinates, // [lng, lat]
          },
          distanceField: "distance", // This adds a 'distance' field to results
          maxDistance: 50000, // 50 km in meters
          query: matchQuery, // Apply our filters here inside $geoNear
          spherical: true,
          distanceMultiplier: 0.001, // 👈 Convert meters to kilometers automatically
        },
      });
    } else {
      // Fallback if current user has no location
      pipeline.push({ $match: matchQuery });
    }

    // 2. Sort by last activity
    pipeline.push({ $sort: { lastActiveAt: -1 } });

    // 3. Handle Pagination & Projection
    pipeline.push(
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          name: 1,
          gender: 1,
          bio: 1,
          photos: 1,
          location: 1,
          lastActiveAt: 1,
          role: 1,
          distance: { $round: ["$distance", 1] }, // Round to 1 decimal place (e.g., 2.5 km)
        },
      }
    );

    const profiles = await User.aggregate(pipeline);

    // --- Total Count (Aggregate doesn't return count automatically) ---
    const totalCount = await User.countDocuments(matchQuery);

    return NextResponse.json({
      count: profiles.length,
      total: totalCount,
      page,
      limit,
      profiles,
    });
  } catch (error) {
    console.error("Fetch Profiles Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}




// import { NextResponse } from "next/server";
// import User from "../../../../backend/models/users.model";
// import connectDB from "../../../../backend/lib/db/db";
// import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

// export async function GET(req) {
//   try {
//     await connectDB();

//     // 1. Authenticate the user first
//     const currentUser = await getUserFromRequest(req);

//     if (!currentUser || !currentUser.id) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // 2. Define the exclusion and filters
//     const baseQuery = {
//       _id: { $ne: currentUser.id }, // Excludes the logged-in user
//       isBlocked: false,
//       // isVerified: true,
//     };

//     // 3. Determine limits based on role
//     // Defaulting to 50 if role isn't explicitly 'premium'
//     const limit = currentUser.role === "premium" ? 200 : 50;

//     // 4. Fetch profiles with specific fields selected
//     // Using .select() is more efficient than .map() after the query
//     const profiles = await User.find(baseQuery)
//       .select("_id name gender interestedIn bio photos location lastActiveAt role")
//       .sort({ lastActiveAt: -1 })
//       .limit(limit);

//     return NextResponse.json({
//       count: profiles.length,
//       profiles
//     });

//   } catch (error) {
//     console.error("Fetch Profiles Error:", error);
//     return NextResponse.json({ message: "Server Error" }, { status: 500 });
//   }
// }