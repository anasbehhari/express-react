// src/config/seed.ts

import bcrypt from "bcrypt";
import User from "../models/user.model";

// Add these to your config.ts
interface SeedConfig {
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
  ADMIN_FIRST_NAME: string;
  ADMIN_LAST_NAME: string;
  ADMIN_USERNAME: string;
}

const seedConfig: SeedConfig = {
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@admin.com",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "admin123",
  ADMIN_FIRST_NAME: process.env.ADMIN_FIRST_NAME || "Admin",
  ADMIN_LAST_NAME: process.env.ADMIN_LAST_NAME || "User",
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || "admin",
};

export async function seedAdminUser(): Promise<void> {
  try {
    // Check if admin user exists
    const existingAdmin = await User.findOne({ email: seedConfig.ADMIN_EMAIL });

    if (!existingAdmin) {
      // Hash password
      const hashedPassword = await bcrypt.hash(seedConfig.ADMIN_PASSWORD, 10);

      // Create new admin user
      const adminUser = new User({
        firstName: seedConfig.ADMIN_FIRST_NAME,
        lastName: seedConfig.ADMIN_LAST_NAME,
        userName: seedConfig.ADMIN_USERNAME,
        email: seedConfig.ADMIN_EMAIL,
        password: hashedPassword,
      });

      await adminUser.save();
      console.log("Admin user seeded successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
}
