import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
    };

    cached.promise = mongoose.connect(MONGO_URI, {
      dbName: "vue_ecommerce",   // ✅ Forces correct DB
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    }).then((mongoose) => {
      console.log("✅ New MongoDB connection established.");
      console.log("📦 Connected to DB:", mongoose.connection.name);
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("❌ MongoDB connection error:", e.message);
    throw e;
  }

  return cached.conn;
}

export default connectDB;