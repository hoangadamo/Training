import mongoose, { Schema, Document } from 'mongoose';

const TaskSchema: Schema = new Schema({
    project: { type: mongoose.Types.ObjectId, ref: 'Project', required: true },
    name: { type: String, required: true },
    type: { type: mongoose.Types.ObjectId, ref: 'TaskType', required: true },
    priority: { type: mongoose.Types.ObjectId, ref: 'TaskPriority', required: true },
    status: { type: mongoose.Types.ObjectId, ref: 'TaskStatus', required: true },
    assignee: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true }
});

export default mongoose.model('Task', TaskSchema);
