import mongoose, { Document } from 'mongoose';

interface ITask extends Document {
    project: mongoose.Types.ObjectId;
    name: string;
    type: mongoose.Types.ObjectId;
    priority: mongoose.Types.ObjectId;
    status: mongoose.Types.ObjectId;
    assignee: mongoose.Types.ObjectId;
    assignee_name: string;
    start_date: Date;
    end_date: Date;
}

export default ITask;