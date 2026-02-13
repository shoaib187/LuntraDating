import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import Match from "../../../../backend/models/matches.model";
import User from "../../../../backend/models/users.model";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const matchId = searchParams.get("matchId");

    const authUser = await getUserFromRequest(req);
    if (!authUser) return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });

    // 1. Fetch fresh data for the logged-in user to check their LATEST role
    const currentUser = await User.findById(authUser.id);

    // 2. Fetch the match and POPULATE users
    const match = await Match.findById(matchId).populate({
      path: "users",
      // Select all fields we might need for either view
      select: "name photos bio isOnline location gender dob"
    });

    if (!match) return NextResponse.json({ message: "Match not found" }, { status: 404 });

    // 3. Identify the "Other User" correctly using .toString()
    const otherUser = match.users.find(
      (u) => u._id !== currentUser._id
    );

    if (!otherUser) {
      return NextResponse.json({
        success: true,
        message: "The other user no longer exists.",
        matchId: match._id
      });
    }

    // 4. Premium vs Free Logic
    const isPremium = currentUser.role === "premium";

    if (isPremium) {
      // ✅ Premium: Return Full Information
      return NextResponse.json({
        success: true,
        matchId: match._id,
        access: "premium",
        otherUser: {
          _id: otherUser._id,
          name: otherUser.name,
          photos: otherUser.photos,
          bio: otherUser.bio,
          isOnline: otherUser.isOnline,
          location: otherUser.location, // Premium only
          gender: otherUser.gender,     // Premium only
          dob: otherUser.dob            // Premium only
        }
      });
    } else {
      // ❌ Free: Return Basic Information
      return NextResponse.json({
        success: true,
        matchId: match._id,
        access: "basic",
        otherUser: {
          _id: otherUser._id,
          name: otherUser.name,
          photos: otherUser.photos,
          bio: otherUser.bio,
          isOnline: otherUser.isOnline
        },
        message: "Upgrade to Premium to see your match's location and birthday."
      });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}




// import { NextResponse } from "next/server";
// import connectDB from "../../../../backend/lib/db/db";
// import Match from "../../../../backend/models/matches.model";
// import User from "../../../../backend/models/users.model"; // MUST import this for populate to work
// import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

// export async function GET(req) {
//   try {
//     await connectDB();
//     const { searchParams } = new URL(req.url);
//     const matchId = searchParams.get("matchId");

//     const currentUser = await getUserFromRequest(req);

//     // 1. Fetch the match and POPULATE the users array
//     const match = await Match.findById(matchId).populate({
//       path: "users",
//       select: "name photos bio isOnline" // Fields you want to show
//     });

//     if (!match) return NextResponse.json({ message: "Match not found" }, { status: 404 });

//     // 2. Identify the "Other User" correctly
//     const otherUser = match.users.find(
//       (u) => u._id !== currentUser.id
//     );

//     console.log("Other User:", otherUser);


//     // 3. Check if otherUser exists (handles cases where a user might have deleted their account)
//     if (!otherUser) {
//       return NextResponse.json({
//         success: true,
//         message: "The other user no longer exists.",
//         matchId: match._id
//       });
//     }

//     return NextResponse.json({
//       success: true,
//       matchId: match._id,
//       matchedAt: match.createdAt,
//       otherUser: {
//         _id: otherUser._id,
//         name: otherUser.name,
//         photos: otherUser.photos,
//         bio: otherUser.bio,
//         isOnline: otherUser.isOnline
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

