import { upload } from "../../config/multer";
import { createTask } from "./create.route";
import { fetchTasks } from "./fetch.route";
// routes/tasks/index.js
import express from "express";

const router = express.Router();

router.get("/", fetchTasks);
router.post("/", upload.array("attachments", 5), createTask);

export default router;
