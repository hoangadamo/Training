import { Document } from 'mongoose';

interface ITaskStatus extends Document {
    name: string;
    order: number;
    is_hidden: boolean;
}

export default ITaskStatus;