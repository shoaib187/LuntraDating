import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import Plan from "../../../../backend/models/plan.model";
import User from "../../../../backend/models/users.model";

import connectDB from "../../../../backend/lib/db/db";

const femaleImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=600&auto=format&fit=crop&q=80",
];

const maleImages = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
];

const otherImages = [
  "https://images.unsplash.com/photo-1504593811423-6dd665756598",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
];

export async function POST(req) {
  try {
    await connectDB();

    const {
      count = 10,
      centerLng,
      centerLat,
      gender = "female",
      interestedIn = "male",
    } = await req.json();

    if (centerLng === undefined || centerLat === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "Center coordinates required",
        },
        { status: 400 }
      );
    }

    // -------------------------
    // NAME POOLS
    // -------------------------

    const femaleNames = [
      "Sophia",
      "Emma",
      "Olivia",
      "Isabella",
      "Mia",
      "Aria",
      "Zoe",
      "Layla",
      "Ava",
      "Chloe",
      "Mila",
      "Harper",
      "Ella",
      "Maya",
      "Luna",
      "Scarlett",
      "Grace",
      "Nora",
      "Avery",
      "Emily",
      "Sofia",
      "Camila",
      "Madison",
      "Victoria",
      "Penelope",
    ];

    const maleNames = [
      "Liam",
      "Noah",
      "Oliver",
      "James",
      "Elijah",
      "William",
      "Henry",
      "Lucas",
      "Benjamin",
      "Theodore",
      "Mateo",
      "Levi",
      "Sebastian",
      "Jack",
      "Ezra",
      "Daniel",
      "Michael",
      "Alexander",
      "David",
      "Joseph",
      "Samuel",
      "John",
      "Wyatt",
      "Owen",
      "Luke",
    ];

    const otherNames = [
      "Alex",
      "Jordan",
      "Charlie",
      "Taylor",
      "Morgan",
      "Casey",
      "Riley",
      "Avery",
      "Skyler",
      "Dakota",
    ];

    const bios = [
      "Coffee lover ☕ | Travel addict ✈️",
      "Looking for meaningful connections ❤️",
      "Foodie 🍕 | Gym enthusiast 💪",
      "Music and sunsets are my vibe 🎶🌅",
      "Adventure seeker 🌍",
      "Dog lover 🐶",
      "Just here for good conversations 😊",
      "Hopeless romantic 💕",
      "Nature lover 🌲",
      "Late night talks > everything 🌙",
    ];

    const interestsPool = [
      "music",
      "travel",
      "sports",
      "movies",
      "fitness",
      "gaming",
      "food",
      "technology",
      "fashion",
      "reading",
      "photography",
      "art",
      "hiking",
      "cars",
      "coffee",
    ];

    const companies = [
      "Google",
      "Microsoft",
      "Apple",
      "Snipbyte",
      "Meta",
      "Netflix",
      "Amazon",
      "Tesla",
      "Adobe",
      "Spotify",
    ];

    const jobTitles = [
      "Software Engineer",
      "Designer",
      "Doctor",
      "Teacher",
      "Marketing Manager",
      "Content Creator",
      "Entrepreneur",
      "Photographer",
      "Fitness Trainer",
      "Data Analyst",
    ];

    const educationLevels = ["Bachelor", "Master", "PhD", "Intermediate"];

    const cities = [
      {
        city: "Lahore",
        state: "Punjab",
      },
      {
        city: "Karachi",
        state: "Sindh",
      },
      {
        city: "Islamabad",
        state: "Islamabad",
      },
      {
        city: "Faisalabad",
        state: "Punjab",
      },
      {
        city: "Multan",
        state: "Punjab",
      },
    ];

    // -------------------------
    // HELPERS
    // -------------------------

    const getRandomItem = (arr) => {
      return arr[Math.floor(Math.random() * arr.length)];
    };

    const getRandomInterests = () => {
      const shuffled = [...interestsPool].sort(() => 0.5 - Math.random());

      return shuffled.slice(0, Math.floor(Math.random() * 5) + 2);
    };

    const getRandomCoordinatesWithin200KM = (lng, lat) => {
      // 200km ~= 1.8 degrees
      const radius = 1.8;

      const lngOffset = (Math.random() - 0.5) * radius;

      const latOffset = (Math.random() - 0.5) * radius;

      return {
        longitude: lng + lngOffset,
        latitude: lat + latOffset,
      };
    };

    // -------------------------
    // PREPARE
    // -------------------------

    const hashedPassword = await bcrypt.hash("password123", 12);

    const freePlan = await Plan.findOne({
      name: "free",
    });

    const bulkUsers = [];

    const usedEmails = new Set();

    // -------------------------
    // GENERATE USERS
    // -------------------------

    for (let i = 0; i < count; i++) {
      const namePool =
        gender === "female"
          ? femaleNames
          : gender === "male"
          ? maleNames
          : otherNames;

      const firstName = getRandomItem(namePool);

      const uniqueNumber = Date.now() + i;

      const finalName = `${firstName}${uniqueNumber}`;

      const username = finalName.toLowerCase().replace(/\s+/g, "");

      const email = `${username}@luntra.com`;

      // avoid duplicate email
      if (usedEmails.has(email)) continue;

      usedEmails.add(email);

      const coords = getRandomCoordinatesWithin200KM(centerLng, centerLat);

      const cityData = getRandomItem(cities);

      const age = Math.floor(Math.random() * 12) + 18;

      const height = Math.floor(Math.random() * 30) + 150;

      const drinkingOptions = ["socially", "never", "frequently"];

      const smokingOptions = ["socially", "never", "frequently"];

      const imagePool =
        gender === "female"
          ? femaleImages
          : gender === "male"
          ? maleImages
          : otherImages;

      const randomProfile = getRandomItem(imagePool);

      bulkUsers.push({
        name: finalName,

        email,

        password: hashedPassword,

        gender,

        interestedIn,

        bio: getRandomItem(bios),

        dob: new Date(
          1990 + Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1
        ),

        age,

        height,

        interests: getRandomInterests(),

        jobTitle: getRandomItem(jobTitles),

        company: getRandomItem(companies),

        education: getRandomItem(educationLevels),

        drinking: getRandomItem(drinkingOptions),

        smoking: getRandomItem(smokingOptions),

        profileImage: `${randomProfile}?w=600&auto=format&fit=crop&q=80`,

        photos: [
          `${randomProfile}?w=600&auto=format&fit=crop&q=80`,
          `${randomProfile}?w=800&auto=format&fit=crop&q=80`,
        ],

        isVerified: true,

        isBlocked: false,

        isOnline: Math.random() > 0.5,

        role: "free",

        location: {
          type: "Point",

          coordinates: [coords.longitude, coords.latitude],
        },

        address: {
          city: cityData.city,

          state: cityData.state,

          formattedAddress: `${cityData.city}, ${cityData.state}, Pakistan`,
        },

        subscription: {
          planId: freePlan?._id,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          isActive: false,
        },

        usage: {
          dailySwipes: Math.floor(Math.random() * 20),

          superLikesUsed: Math.floor(Math.random() * 5),

          profileBoostsUsed: Math.floor(Math.random() * 2),
        },

        notifications: {
          enabled: true,

          fcmToken: null,
        },

        preferences: {
          messageNotifications: true,

          matchNotifications: true,

          likeNotifications: true,

          storyNotifications: true,

          emailNotifications: false,

          showOnlineStatus: true,

          showDistance: true,

          showAge: true,

          discoverable: true,
        },

        language: "en",

        reportCount: 0,

        lastActiveAt: new Date(),
      });
    }

    // -------------------------
    // INSERT
    // -------------------------

    const result = await User.insertMany(bulkUsers);

    return NextResponse.json({
      success: true,

      message: `${result.length} users created successfully`,

      usersAdded: result.length,

      users: result,
    });
  } catch (error) {
    console.error("Bulk Registration Error:", error);

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

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import Plan from "../../../../backend/models/plan.model";
// import User from "../../../../backend/models/users.model";
// import connectDB from "../../../../backend/lib/db/db";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { count = 10, centerLng, centerLat, gender = "female", interestedIn = "male" } = await req.json();

//     if (!centerLng || !centerLat) {
//       return NextResponse.json({ message: "Center coordinates required" }, { status: 400 });
//     }

//     // --- Real Name Pools ---
//     const femaleNames = ["Sophia", "Emma", "Olivia", "Isabella", "Mia", "Aria", "Zoe", "Layla", "Ava", "Chloe", "Mila", "Harper", "Ella", "Maya", "Luna"];
//     const maleNames = ["Liam", "Noah", "Oliver", "James", "Elijah", "William", "Henry", "Lucas", "Benjamin", "Theodore", "Mateo", "Levi", "Sebastian", "Jack", "Ezra"];
//     const otherNames = ["Alex", "Jordan", "Charlie", "Taylor", "Morgan", "Casey", "Riley"];

//     const hashedPassword = await bcrypt.hash("password123", 12);
//     const freePlan = await Plan.findOne({ name: "Free" });

//     const bulkUsers = [];

//     for (let i = 0; i < count; i++) {
//       // 1. Pick a name based on the requested gender
//       let namePool = gender === "female" ? femaleNames : gender === "male" ? maleNames : otherNames;
//       const randomName = namePool[Math.floor(Math.random() * namePool.length)];

//       // Add a random initial or number to handle the "count > namePool.length" scenario
//       const finalName = `${randomName} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}.`;

//       const lngOffset = (Math.random() - 0.5) * 0.1;
//       const latOffset = (Math.random() - 0.5) * 0.1;

//       bulkUsers.push({
//         name: finalName,
//         email: `test_${Math.random().toString(36).substring(2, 7)}@luntra.com`, // Unique random email
//         password: hashedPassword,
//         gender: gender,
//         interestedIn: interestedIn,
//         dob: new Date(1996 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 12), 1),
//         isVerified: true,
//         isBlocked: false,
//         role: "free",
//         location: {
//           type: "Point",
//           coordinates: [centerLng + lngOffset, centerLat + latOffset],
//         },
//         profileImage: `https://i.pravatar.cc/300?u=${finalName}${i}`,
//         photos: [`https://i.pravatar.cc/300?u=${finalName}${i}`],
//         subscription: {
//           planId: freePlan?._id,
//           isActive: true,
//         },
//         lastActiveAt: new Date(),
//         bio: `Hey! I'm ${randomName}. Just testing out this cool new app Luntra. 😊`,
//         usage: { dailySwipes: 0, superLikesUsed: 0, profileBoostsUsed: 0 }
//       });
//     }

//     const result = await User.insertMany(bulkUsers);

//     return NextResponse.json({
//       success: true,
//       message: `Successfully registered ${result.length} users with real names.`,
//       usersAdded: result.length
//     });

//   } catch (error) {
//     console.error("Bulk Registration Error:", error);
//     return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
//   }
// }
