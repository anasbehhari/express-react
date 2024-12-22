import { createTask } from "./create.route";
import { fetchTasks } from "./fetch.route";

// routes/tasks/index.js
const express = require("express");

const router = express.Router();

router.get("/", fetchTasks);
router.post("/", createTask);

export default router;
