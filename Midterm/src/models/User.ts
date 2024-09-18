import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

const UserSchema: Schema = new Schema(
    {
        username:{type: String, required: true, minLength: 5, maxLength: 20, unique: true},
        password:{type: String, required: true, minLength: 8},
        name: {type: String, required: true},
        is_admin: {type: Boolean, default: false},
        date_of_birth: {type: Date, required: true},
        email: {type: String, required: true},
        is_active: {type: Boolean, default: true},
        project: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
        invite_id: {type: String, unique: true}
    }
)

export default mongoose.model('User', UserSchema);
