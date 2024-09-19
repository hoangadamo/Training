import mongoose, { Document, Schema } from "mongoose";
import IProject from "../interface/IProject";

const ProjectSchema: Schema = new Schema({
    name: {type: String, required: true, unique: true},
    slug: {type: String, required: true, unique: true},
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},
    members: [{type: mongoose.Types.ObjectId, ref: "User"}],
    tasks: [{type: mongoose.Types.ObjectId, ref: "Task"}],
    process: {type: Number}
})

export default mongoose.model<IProject>('Project', ProjectSchema);