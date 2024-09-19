import mongoose, { Document, Schema } from "mongoose";
import ITaskType from "../interface/ITaskType";

const TaskTypeSchema: Schema = new Schema({
    name: {type: String, required: true, unique: true/*, enum: ['feature', 'bug']*/},
    color: {type: String, required: true, unique: true/*, enum: ['#FF0000', '#00FF00']*/},
    is_hidden: {type: Boolean, default: false}
})

export default mongoose.model<ITaskType>('Task_Type', TaskTypeSchema);