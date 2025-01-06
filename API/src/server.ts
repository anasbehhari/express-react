import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import config from "./config/config";
import { connectDB } from "./config/database";
import authRoutes from "./routes/auth";
import tasksRoutes from "./routes/tasks";
import userRoutes from "./routes/user";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = config.PORT;

app.use(cookieParser());
// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/tasks", tasksRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
