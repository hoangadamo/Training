import mongoose, { Schema, Document } from 'mongoose';

const TaskStatusSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true},
    order: { type: Number, required: true},
    is_hidden: { type: Boolean, default: false}
});

export default mongoose.model('Task_Status', TaskStatusSchema);
