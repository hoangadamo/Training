import { Document } from "mongoose";

interface ITaskPriority extends Document {
    name: string;
    order: number;
    is_hidden: boolean;
}

export default ITaskPriority;