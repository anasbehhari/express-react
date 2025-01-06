import { loginUser } from "./login.route";
import { logoutUser } from "./logout.route";
import { createUser } from "./register.route";

// routes/tasks/index.js
const express = require("express");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
