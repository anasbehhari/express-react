import { Request, Response } from "express";
import { TaskStatus } from "../../enum";
import Task from "../../models/task.model";

export async function createTask(req: Request, res: Response): Promise<void> {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      res.status(400).json({
        message: "Title and description are required.",
      });
    }

    if (status && !Object.values(TaskStatus).includes(status)) {
      res.status(400).json({
        message: `Invalid status. It should be one of: [${Object.values(
          TaskStatus
        ).join(", ")}]`,
      });
    }

    const task = new Task({ title, description, status });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
}
