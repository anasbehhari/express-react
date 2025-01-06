// src/config/config.ts

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

interface Config {
  MONGO_URI: string;
  PORT: number;
  JWT_SECRET: string;
  NODE_ENV: string;
}

const getConfig = (): Config => {
  // Required environment variables
  const requiredEnvVars = ["MONGO_URI", "PORT", "JWT_SECRET"];
  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }

  return {
    MONGO_URI: process.env.MONGO_URI!,
    PORT: parseInt(process.env.PORT!, 10),
    JWT_SECRET: process.env.JWT_SECRET!,
    NODE_ENV: process.env.NODE_ENV || "development",
  };
};

// Export a frozen configuration object to prevent modifications
const config = Object.freeze(getConfig());

export default config;
