import mongoose, { Schema } from "mongoose";
import ITaskPriority from "../interface/ITaskPriority";

const TaskPrioritySchema: Schema = new Schema({
    name: {type: String, required: true, unique: true}, // High, normal, low
    order: {type: Number, required: true},
    is_hidden: {type: Boolean, default: false}
})

export default mongoose.model<ITaskPriority>('Task_Priority', TaskPrioritySchema);