//config/db.js
import mongoose from 'mongoose';

// config/db.js
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn; // ✅ reuse existing connection
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      dbName: process.env.DB_NAME,
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("❌ MongoDB connection error:", error.message);
    throw error; // ✅ DO NOT use process.exit on Vercel
  }
};

export default connectDB;


//Key Idea:
//Handle Database connectivity in one place
//Any part of the application can import
//To ensure db is connected
