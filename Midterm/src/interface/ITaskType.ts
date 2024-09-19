import { Document} from "mongoose";

interface ITaskType extends Document {
    name: string;
    color: string;
    is_hidden: boolean;
}

export default ITaskType;