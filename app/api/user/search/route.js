import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import User from "../../../../backend/models/users.model";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await connectDB();
    const authUser = await getUserFromRequest(req);
    if (!authUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);

    // 1. Unified Pagination
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // 2. Filters
    const query = searchParams.get("q");
    const genderPref = searchParams.get("gender");
    const status = searchParams.get("status");
    const minAge = parseInt(searchParams.get("minAge"));
    const maxAge = parseInt(searchParams.get("maxAge"));
    const maxDistance = parseInt(searchParams.get("distance")) || 50;

    const pipeline = [];

    // 3. GEOSPATIAL STAGE
    // Important: $geoNear MUST be the first stage if used.
    const hasCoordinates = authUser.location?.coordinates && authUser.location.coordinates[0] !== 0;

    if (hasCoordinates) {
      pipeline.push({
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [authUser.location.coordinates[0], authUser.location.coordinates[1]]
          },
          distanceField: "distance",
          maxDistance: maxDistance * 1000,
          spherical: true,
          query: { _id: { $ne: new mongoose.Types.ObjectId(authUser.id) }, isBlocked: false },
        },
      });
    } else {
      pipeline.push({
        $match: { _id: { $ne: new mongoose.Types.ObjectId(authUser.id) }, isBlocked: false }
      });
    }

    // 4. TEXT/QUERY FILTER (Name, Email, or Phone)
    if (query) {
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
            { phone: { $regex: query, $options: "i" } }
          ],
        },
      });
    }

    // 5. GENDER & STATUS FILTER
    if (genderPref) pipeline.push({ $match: { gender: genderPref } });
    if (status === "online") pipeline.push({ $match: { isOnline: true } });

    // 6. AGE RANGE FILTER
    if (minAge || maxAge) {
      const today = new Date();
      const ageMatch = {};
      if (maxAge) {
        const minDob = new Date();
        minDob.setFullYear(today.getFullYear() - maxAge);
        ageMatch.$gte = minDob;
      }
      if (minAge) {
        const maxDob = new Date();
        maxDob.setFullYear(today.getFullYear() - minAge);
        ageMatch.$lte = maxDob;
      }
      pipeline.push({ $match: { dob: ageMatch } });
    }

    // 7. GET TOTAL COUNT & DATA (Using $facet for performance)
    pipeline.push({
      $facet: {
        metadata: [{ $count: "total" }],
        data: [
          { $sort: { lastActiveAt: -1, createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
          {
            $project: {
              name: 1,
              email: 1,
              phone: 1,
              profileImage: 1,
              gender: 1,
              bio: 1,
              isOnline: 1,
              dob: 1,
              distance: { $ifNull: [{ $divide: ["$distance", 1000] }, 0] }
            }
          }
        ]
      }
    });

    const results = await User.aggregate(pipeline);
    const users = results[0].data;
    const total = results[0].metadata[0]?.total || 0;

    return NextResponse.json({
      success: true,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      users
    });

  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}