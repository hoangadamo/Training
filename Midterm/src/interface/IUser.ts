import mongoose, { Document } from "mongoose";

interface IUser extends Document {
    username: string;
    password: string;
    name: string;
    is_admin: boolean;
    date_of_birth: Date;
    email: string;
    is_active: boolean;
    invite_id?: string;
}

export default IUser;