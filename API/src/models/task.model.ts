import mongoose, { Document, Schema } from "mongoose";
import { TaskStatus } from "../enum";

export interface Itask extends Document {
  title: string;
  description: string;
  status: "IN_PROGRESS" | "COMPLETED" | "PENDING";
}

const TaskSchema = new Schema<Itask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: TaskStatus,
    default: TaskStatus.PENDING,
    required: false,
  },
});

export default mongoose.model<Itask>("TASK", TaskSchema);
