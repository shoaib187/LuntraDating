// backend/lib/auth.js
import jwt from "jsonwebtoken";
import User from '../../models/users.model';
import connectDB from "../db/db";

export async function getUserFromToken(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: No token provided");
  }

  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error("Unauthorized: Invalid token");
  }

  await connectDB();

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function getUserFromRequest(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded
  } catch (err) {
    console.error("Auth error:", err);
    return null;
  }
}