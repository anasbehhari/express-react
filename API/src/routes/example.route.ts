import express, { Request, Response } from "express";
import Example, { IExample } from "../models/example.model";

const router = express.Router();

// GET all examples
router.get("/", async (_req: Request, res: Response) => {
  try {
    const examples = await Example.find();
    res.json([
      {
        message: "Examples fetched successfully",
        examples,
      },
    ]);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// POST create an example
router.post("/", async (req: Request, res: Response) => {
  const { name, age } = req.body;

  const example: IExample = new Example({ name, age });

  try {
    const newExample = await example.save();
    res.status(201).json(newExample);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
