import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import IUser from '../interface/IUser';

const UserSchema: Schema = new Schema(
    {
        username:{type: String, required: true, minLength: 5, maxLength: 20, unique: true},
        password:{type: String, required: true, minLength: 8},
        name: {type: String, required: true},
        is_admin: {type: Boolean, default: false},
        date_of_birth: {type: Date, required: true},
        email: {type: String, required: true, unique: true},
        is_active: {type: Boolean, default: true},
        // projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
        // tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
        invite_id: {type: String}
    }
)

export default mongoose.model<IUser>('User', UserSchema);
