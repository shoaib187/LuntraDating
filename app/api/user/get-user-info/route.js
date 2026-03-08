import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import User from "../../../../backend/models/users.model";
import Plan from "../../../../backend/models/plan.model";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

// Helper function to calculate distance in KM
function getDistance(coords1, coords2) {
  const [lon1, lat1] = coords1;
  const [lon2, lat2] = coords2;
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1)); // Return rounded to 1 decimal
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const targetUserId = searchParams.get("id");
    const authUser = await getUserFromRequest(req);

    if (!targetUserId && !authUser) {
      return NextResponse.json({ message: "Authentication or User ID required" }, { status: 401 });
    }

    const finalUserId = targetUserId || authUser.id;
    const isSelfView = authUser && authUser.id === finalUserId;

    // Fetch Target User
    const targetUser = await User.findById(finalUserId).populate("subscription.planId");
    if (!targetUser) return NextResponse.json({ message: "User not found" }, { status: 404 });

    // --- Distance Calculation Logic ---
    let distance = null;
    if (authUser && !isSelfView) {
      const currentUser = await User.findById(authUser.id).select("location");

      const targetCoords = targetUser.location?.coordinates;
      const myCoords = currentUser.location?.coordinates;

      if (targetCoords && myCoords && targetCoords[0] !== 0 && myCoords[0] !== 0) {
        distance = getDistance(myCoords, targetCoords);
      }
    }

    // --- Handle Responses ---

    // 1. Self View
    if (isSelfView) {
      const userObj = targetUser.toObject();
      delete userObj.password;
      return NextResponse.json({ success: true, isSelf: true, user: userObj });
    }

    // 2. Public/Premium View
    const viewer = authUser ? await User.findById(authUser.id).select("role") : null;
    const viewerRole = viewer?.role || "free";

    if (viewerRole === "premium") {
      const userObj = targetUser.toObject();
      delete userObj.password;
      return NextResponse.json({
        success: true,
        isPremiumView: true,
        user: { ...userObj, distance } // Added distance
      });
    }

    // 3. Free View
    const basicProfile = {
      _id: targetUser._id,
      name: targetUser.name,
      gender: targetUser.gender,
      bio: targetUser.bio,
      photos: targetUser.photos,
      role: targetUser.role,
      isOnline: targetUser.isOnline,
      location: targetUser.location, // Return coordinates
      distance // Added distance
    };

    return NextResponse.json({
      success: true,
      isPremiumView: false,
      user: basicProfile,
      message: distance ? null : "Location data unavailable for distance calculation"
    });

  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}



// import { NextResponse } from "next/server";
// import connectDB from "../../../../backend/lib/db/db";
// import User from "../../../../backend/models/users.model";
// import Plan from "../../../../backend/models/plan.model";
// import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const targetUserId = searchParams.get("id");

//     if (!targetUserId) {
//       return NextResponse.json({ message: "User ID is required" }, { status: 400 });
//     }

//     // 1. Get the current logged-in user from request
//     const authUser = await getUserFromRequest(req);
//     if (!authUser) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // 2. IMPORTANT: Fetch fresh user data from DB 
//     // This ensures that if they JUST upgraded, we see the 'premium' role.
//     const currentUser = await User.findById(authUser.id);

//     console.log("VIEWER ROLE FROM DB:", currentUser.role);

//     // 3. Fetch the target user's profile
//     const targetUser = await User.findById(targetUserId).populate("subscription.planId");

//     if (!targetUser) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     // 4. Determine View Permissions
//     const isPremium = currentUser.role === "premium";
//     const isSelf = currentUser._id.toString() === targetUserId;

//     console.log("IS PREMIUM?", isPremium);
//     console.log("IS SELF?", isSelf);

//     if (isPremium || isSelf) {
//       // ✅ Return EVERYTHING
//       const userObj = targetUser.toObject();
//       delete userObj.password;

//       return NextResponse.json({
//         success: true,
//         isPremiumView: true,
//         user: userObj
//       });
//     }

//     // ❌ Return BASIC INFO ONLY
//     const basicProfile = {
//       _id: targetUser._id,
//       name: targetUser.name,
//       gender: targetUser.gender,
//       bio: targetUser.bio,
//       photos: targetUser.photos,
//       role: targetUser.role,
//       isOnline: targetUser.isOnline
//     };

//     return NextResponse.json({
//       success: true,
//       isPremiumView: false,
//       user: basicProfile,
//       message: "Upgrade to Premium to see full profile details."
//     });

//   } catch (error) {
//     console.error("Profile Fetch Error:", error);
//     return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
//   }
// }