import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Plan from "../../../../backend/models/plan.model";
import User from "../../../../backend/models/users.model";
import connectDB from "../../../../backend/lib/db/db";

export async function POST(req) {
  try {
    await connectDB();

    const { count = 10, centerLng, centerLat, gender = "female", interestedIn = "male" } = await req.json();

    if (!centerLng || !centerLat) {
      return NextResponse.json({ message: "Center coordinates required" }, { status: 400 });
    }

    // --- Real Name Pools ---
    const femaleNames = ["Sophia", "Emma", "Olivia", "Isabella", "Mia", "Aria", "Zoe", "Layla", "Ava", "Chloe", "Mila", "Harper", "Ella", "Maya", "Luna"];
    const maleNames = ["Liam", "Noah", "Oliver", "James", "Elijah", "William", "Henry", "Lucas", "Benjamin", "Theodore", "Mateo", "Levi", "Sebastian", "Jack", "Ezra"];
    const otherNames = ["Alex", "Jordan", "Charlie", "Taylor", "Morgan", "Casey", "Riley"];

    const hashedPassword = await bcrypt.hash("password123", 12);
    const freePlan = await Plan.findOne({ name: "Free" });

    const bulkUsers = [];

    for (let i = 0; i < count; i++) {
      // 1. Pick a name based on the requested gender
      let namePool = gender === "female" ? femaleNames : gender === "male" ? maleNames : otherNames;
      const randomName = namePool[Math.floor(Math.random() * namePool.length)];

      // Add a random initial or number to handle the "count > namePool.length" scenario
      const finalName = `${randomName} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}.`;

      const lngOffset = (Math.random() - 0.5) * 0.1;
      const latOffset = (Math.random() - 0.5) * 0.1;

      bulkUsers.push({
        name: finalName,
        email: `test_${Math.random().toString(36).substring(2, 7)}@luntra.com`, // Unique random email
        password: hashedPassword,
        gender: gender,
        interestedIn: interestedIn,
        dob: new Date(1996 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 12), 1),
        isVerified: true,
        isBlocked: false,
        role: "free",
        location: {
          type: "Point",
          coordinates: [centerLng + lngOffset, centerLat + latOffset],
        },
        profileImage: `https://i.pravatar.cc/300?u=${finalName}${i}`,
        photos: [`https://i.pravatar.cc/300?u=${finalName}${i}`],
        subscription: {
          planId: freePlan?._id,
          isActive: true,
        },
        lastActiveAt: new Date(),
        bio: `Hey! I'm ${randomName}. Just testing out this cool new app Luntra. 😊`,
        usage: { dailySwipes: 0, superLikesUsed: 0, profileBoostsUsed: 0 }
      });
    }

    const result = await User.insertMany(bulkUsers);

    return NextResponse.json({
      success: true,
      message: `Successfully registered ${result.length} users with real names.`,
      usersAdded: result.length
    });

  } catch (error) {
    console.error("Bulk Registration Error:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}



// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import Plan from "../../../../backend/models/plan.model";
// import User from "../../../../backend/models/users.model";
// import connectDB from "../../../../backend/lib/db/db";

// export async function POST(req) {
//   try {
//     await connectDB();

//     // 1. Get configuration from request
//     const { count = 10, centerLng, centerLat, gender = "female", interestedIn = "male" } = await req.json();

//     if (!centerLng || !centerLat) {
//       return NextResponse.json({ message: "Center coordinates required" }, { status: 400 });
//     }

//     const hashedPassword = await bcrypt.hash("password123", 12);
//     const freePlan = await Plan.findOne({ name: "Free" });

//     const bulkUsers = [];

//     for (let i = 0; i < count; i++) {
//       // Create slight variations in location (approx 1-10km)
//       const lngOffset = (Math.random() - 0.5) * 0.1;
//       const latOffset = (Math.random() - 0.5) * 0.1;

//       bulkUsers.push({
//         name: `User ${Math.floor(Math.random() * 1000)}`,
//         email: `test_${Date.now()}_${i}@luntra.com`,
//         password: hashedPassword,
//         gender: gender,
//         interestedIn: interestedIn,
//         dob: new Date(1995 + (i % 5), 0, 1),
//         isVerified: true, // Auto-verify for testing
//         isBlocked: false,
//         role: "free",
//         location: {
//           type: "Point",
//           coordinates: [centerLng + lngOffset, centerLat + latOffset],
//         },
//         profileImage: `https://i.pravatar.cc/300?u=${i}`,
//         photos: [`https://i.pravatar.cc/300?u=${i}`],
//         subscription: {
//           planId: freePlan?._id,
//           isActive: true,
//         },
//         lastActiveAt: new Date(),
//         bio: "Testing the Luntra recommendation engine! 🚀",
//         usage: { dailySwipes: 0, superLikesUsed: 0, profileBoostsUsed: 0 }
//       });
//     }

//     // 2. Perform Bulk Insert
//     const result = await User.insertMany(bulkUsers);

//     return NextResponse.json({
//       success: true,
//       message: `Successfully registered ${result.length} users.`,
//       usersAdded: result.length
//     });

//   } catch (error) {
//     console.error("Bulk Registration Error:", error);
//     return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
//   }
// }