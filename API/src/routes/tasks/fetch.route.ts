import { Request, Response } from "express";
import Task from "../../models/task.model";

export async function fetchTasks(req: Request, res: Response) {
  try {
    const tasks = await Task.find(); // Fetch all tasks
    res.status(200).json(tasks); // Return tasks as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
