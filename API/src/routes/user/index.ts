import { authenticateToken } from "../../middleware/auth.middleware";
import { getCurrentUser } from "./me";

// routes/tasks/index.js
import express from "express";

const router = express.Router();

router.get("/me", authenticateToken, getCurrentUser);

export default router;
