import mongoose, { Schema, Document } from 'mongoose';
import ITaskStatus from '../interface/ITaskStatus';

const TaskStatusSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true},
    order: { type: Number, required: true, unique: true},
    is_hidden: { type: Boolean, default: false}
});

export default mongoose.model<ITaskStatus>('Task_Status', TaskStatusSchema);
