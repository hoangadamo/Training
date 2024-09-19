import mongoose, { Schema, Document } from 'mongoose';
import ITask from '../interface/ITask';

const TaskSchema: Schema = new Schema({
    project: { type: mongoose.Types.ObjectId, ref: 'Project', required: true },
    name: { type: String, required: true},
    type: { type: mongoose.Types.ObjectId, ref: 'TaskType', required: true },
    priority: { type: mongoose.Types.ObjectId, ref: 'TaskPriority', required: true },
    status: { type: mongoose.Types.ObjectId, ref: 'TaskStatus', required: true },
    assignee: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    assignee_name: {type: String},
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true }
});

// Create a compound index on { project, name } to ensure uniqueness
TaskSchema.index({ project: 1, name: 1 }, { unique: true });

// export default mongoose.model('Task', TaskSchema);
export default mongoose.model<ITask>('Task', TaskSchema);
