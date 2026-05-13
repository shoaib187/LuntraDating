import { NextResponse } from "next/server";

import connectDB from "../../../../backend/lib/db/db";

import Favorite from "../../../../backend/models/favorites.model";

import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function GET(req) {
  try {
    await connectDB();

    // AUTH USER
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

    // CURRENT USER
    const currentUser = authUser;

    // LOCATION
    const currentLat = currentUser?.location?.coordinates?.[1];

    const currentLng = currentUser?.location?.coordinates?.[0];

    // FAVORITES
    const favorites = await Favorite.find({
      user: currentUser.id,
    })
      .populate({
        path: "targetUser",
        select: `
          name
          photos
          bio
          gender
          age
          interests
          jobTitle
          education
          drinking
          smoking
          isOnline
          lastActiveAt
          city
          location
        `,
      })
      .sort({ createdAt: -1 })
      .lean();

    // DISTANCE CALCULATOR
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const toRad = (value) => (value * Math.PI) / 180;

      const R = 6371;

      const dLat = toRad(lat2 - lat1);

      const dLon = toRad(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return (R * c).toFixed(1);
    };

    // MATCH PERCENTAGE
    const calculateMatchPercentage = (currentUser, targetUser) => {
      let score = 0;

      let total = 0;

      // INTERESTS MATCH
      total += 40;

      const currentInterests = currentUser?.interests || [];

      const targetInterests = targetUser?.interests || [];

      const commonInterests = currentInterests.filter((interest) =>
        targetInterests.includes(interest)
      );

      const interestScore =
        targetInterests.length > 0
          ? (commonInterests.length / targetInterests.length) * 40
          : 0;

      score += interestScore;

      // AGE DIFFERENCE
      total += 20;

      const ageDiff = Math.abs(
        (currentUser?.age || 0) - (targetUser?.age || 0)
      );

      if (ageDiff <= 2) {
        score += 20;
      } else if (ageDiff <= 5) {
        score += 15;
      } else if (ageDiff <= 10) {
        score += 10;
      } else {
        score += 5;
      }

      // EDUCATION
      total += 10;

      if (
        currentUser?.education &&
        targetUser?.education &&
        currentUser.education === targetUser.education
      ) {
        score += 10;
      }

      // DRINKING
      total += 10;

      if (currentUser?.drinking === targetUser?.drinking) {
        score += 10;
      }

      // SMOKING
      total += 10;

      if (currentUser?.smoking === targetUser?.smoking) {
        score += 10;
      }

      // JOB TITLE
      total += 10;

      if (
        currentUser?.jobTitle &&
        targetUser?.jobTitle &&
        currentUser.jobTitle === targetUser.jobTitle
      ) {
        score += 10;
      }

      return Math.min(100, Math.round((score / total) * 100));
    };

    // FORMAT DATA
    const favoriteProfiles = favorites
      .map((fav) => {
        const profile = fav.targetUser;

        if (!profile) return null;

        // TARGET LOCATION
        const targetLat = profile?.location?.coordinates?.[1];

        const targetLng = profile?.location?.coordinates?.[0];

        let distance = null;

        if (currentLat && currentLng && targetLat && targetLng) {
          distance = calculateDistance(
            currentLat,
            currentLng,
            targetLat,
            targetLng
          );
        }

        // MATCH %
        const matchPercentage = calculateMatchPercentage(currentUser, profile);

        return {
          ...profile,

          distance: distance ? `${distance} km` : null,

          matchPercentage: `${matchPercentage}%`,
        };
      })
      .filter(Boolean);

    return NextResponse.json(
      {
        success: true,

        count: favoriteProfiles.length,

        favorites: favoriteProfiles,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get Favorites Error:", error);

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
// import Favorite from "../../../../backend/models/favorites.model";
// import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

// export async function GET(req) {
//   try {
//     await connectDB();

//     // 1. Authenticate the viewer
//     const authUser = await getUserFromRequest(req);
//     if (!authUser) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // 2. Find all favorite documents where 'user' is the logged-in user
//     // We populate 'targetUser' to get their profile details
//     const favorites = await Favorite.find({ user: authUser.id })
//       .populate({
//         path: "targetUser",
//         select: "name photos bio gender isOnline lastActiveAt" // Only return public info
//       })
//       .sort({ createdAt: -1 }); // Show recently favorited first

//     // 3. Format the data for the frontend
//     // We filter out any null targetUsers (in case a user was deleted but the favorite record remains)
//     const favoriteProfiles = favorites
//       .map((fav) => fav.targetUser)
//       .filter((profile) => profile !== null);

//     return NextResponse.json({
//       success: true,
//       count: favoriteProfiles.length,
//       favorites: favoriteProfiles,
//     });

//   } catch (error) {
//     console.error("Get Favorites Error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
