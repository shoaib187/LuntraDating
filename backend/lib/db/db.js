import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_DB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGO_DB_URI in .env.local");
}

// Global cache (important in Next.js to prevent multiple connections)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  console.log("[DB] connectDB called");

  if (cached.conn) {
    console.log("[DB] Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("[DB] Creating new connection...");
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        console.log("[DB] Connected to MongoDB ✅");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("[DB] Connection error ❌", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
