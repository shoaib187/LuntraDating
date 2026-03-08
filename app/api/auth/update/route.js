import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import User from "../../../../backend/models/users.model";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";
import cloudinary from "../../../../backend/lib/cloudinary/cloudinary";

export async function PUT(req) {
  try {
    await connectDB();

    const currentUser = await getUserFromRequest(req);
    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const updates = {};

    // --- 1. Handle Single Profile Image ---
    if (body.profileImage) {
      if (body.profileImage.startsWith("data:image")) {
        // If it's a new Base64 string, upload to Cloudinary
        const res = await cloudinary.uploader.upload(body.profileImage, {
          folder: "user_avatars",
        });
        updates.profileImage = res.secure_url;
      } else {
        // If it's already a URL, keep it
        updates.profileImage = body.profileImage;
      }
    }

    // --- 2. Handle Multiple Photos Array ---
    if (body.photos && Array.isArray(body.photos)) {
      // Use Promise.all to upload all new images in parallel
      updates.photos = await Promise.all(
        body.photos.map(async (photo) => {
          if (photo.startsWith("data:image")) {
            const res = await cloudinary.uploader.upload(photo, {
              folder: "user_gallery",
            });
            return res.secure_url;
          }
          return photo; // Return existing URL
        })
      );
    }

    // --- 3. Handle Other Basic Fields ---
    const basicFields = ["name", "bio", "gender", "interestedIn", "dob", "location", "height", "age"];
    basicFields.forEach((field) => {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    });

    // --- 4. Update Database ---
    const updatedUser = await User.findByIdAndUpdate(
      currentUser.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}



// import { NextResponse } from "next/server";
// import connectDB from "../../../../backend/lib/db/db";
// import User from "../../../../backend/models/users.model";
// import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

// export async function PUT(req) {
//   try {
//     await connectDB();

//     // 1. Authenticate User
//     const currentUser = await getUserFromRequest(req);
//     if (!currentUser) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // 2. Parse Body
//     const body = await req.json();

//     // 3. Define allowed fields (Security: Don't let users edit their 'role' or 'email' here)
//     const allowedUpdates = [
//       "name",
//       "bio",
//       "gender",
//       "interestedIn",
//       "dob",
//       "photos",
//       "location",
//       "profileImage"
//     ];

//     // Filter the body to only include allowed fields
//     const updates = {};
//     allowedUpdates.forEach((field) => {
//       if (body[field] !== undefined) {
//         updates[field] = body[field];
//       }
//     });

//     // 4. Update Database
//     // { new: true } returns the updated document, { runValidators: true } ensures schema rules apply
//     const updatedUser = await User.findByIdAndUpdate(
//       currentUser.id,
//       { $set: updates },
//       { new: true, runValidators: true }
//     ).select("-password"); // Hide password in response

//     if (!updatedUser) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Profile updated successfully",
//       user: updatedUser,
//     });

//   } catch (error) {
//     console.error("Update Error:", error);
//     return NextResponse.json({ message: "Server Error" }, { status: 500 });
//   }
// }