import mongoose, { Document, Schema } from "mongoose";

const TaskPrioritySchema: Schema = new Schema({
    name: {type: String, required: true, unique: true}, // High, normal, low
    order: {type: Number, required: true},
    is_hidden: {type: Boolean, default: false}
})

export default mongoose.model('Task_Priority', TaskPrioritySchema);