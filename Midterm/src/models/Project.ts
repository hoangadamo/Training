import mongoose, { Document, Schema } from "mongoose";

const ProjectSchema: Schema = new Schema({
    name: {type: String, required: true, unique: true},
    slug: {type: String, required: true, unique: true},
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},
    members: [{type: mongoose.Types.ObjectId, ref: "User"}],
    tasks: [{type: mongoose.Types.ObjectId, ref: "Task"}],
    process: {type: Number}
})

export default mongoose.model('Project', ProjectSchema);