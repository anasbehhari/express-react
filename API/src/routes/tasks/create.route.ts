import { Request, Response } from "express";
import { TaskStatus } from "../../enum";
import Task from "../../models/task.model";
interface MulterRequest extends Request {
  files: Express.Multer.File[];
}

export async function createTask(req: Request, res: Response): Promise<void> {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      res.status(400).json({
        message: "Title and description are required.",
      });
      return;
    }

    if (status && !Object.values(TaskStatus).includes(status)) {
      res.status(400).json({
        message: `Invalid status. It should be one of: [${Object.values(
          TaskStatus
        ).join(", ")}]`,
      });
      return;
    }

    // Fixed type handling for files
    const multerReq = req as MulterRequest;
    const attachments = multerReq.files
      ? multerReq.files.map((file) => file.path)
      : [];

    const task = new Task({
      title,
      description,
      status,
      attachments,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
}
