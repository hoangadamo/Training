import mongoose, { Document} from "mongoose";

interface IProject extends Document {
    name: string;
    slug: string;
    start_date: Date;
    end_date: Date;
    members: mongoose.Types.ObjectId[];
    tasks: mongoose.Types.ObjectId[];
    process: number;
}

export default IProject;