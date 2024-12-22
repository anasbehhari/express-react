import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database";
import tasksRoutes from "./routes/tasks";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/tasks", tasksRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
