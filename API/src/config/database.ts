// src/config/database.ts

import mongoose from "mongoose";
import config from "./config";
import { seedAdminUser } from "./seed";

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to MongoDB successfully");

    // Run seeds after successful connection
    await seedAdminUser();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Handle connection events
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
  } catch (err) {
    console.error("Error during MongoDB connection closure:", err);
    process.exit(1);
  }
});
