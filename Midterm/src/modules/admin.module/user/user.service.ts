import { Request, Response } from 'express';
import User from '../../../models/User';
import randomstring from 'randomstring';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Project from '../../../models/Project';
import { addMember } from '../project/project.service';

export const createInviteId = async (req: Request, res: Response) => {
    try {
        const {username, password, name, date_of_birth, email} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            password: hashed,
            name,
            date_of_birth,
            email,
            invite_id: randomstring.generate(10)
        })
        await newUser.save();
        res.status(200).json({invite_id: newUser.invite_id});
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}

export const getAllUser = async (req: Request, res: Response) => {
    // pagination
    let perPage = 3;
    let page = parseInt(req.params.page) || 1;
    try {
        const users = await User.find().skip((perPage * page) - perPage).limit(perPage);
        const result = users.map(user => {
            return {
                _id: user.id,
                username: user.username,
                name: user.name,
                date_of_birth: user.date_of_birth,
                email: user.email
            };
        });
        const count = await User.countDocuments();
        res.status(200).json({
            users: result,
            currentPage: page,
            totalPages: Math.ceil(count / perPage),
            totalUsers: count
        });

    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}

export const getUserDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const user = await User.findById(id).lean().select('-__v -password -is_admin -is_active -invite_id');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const projects = await Project.find({ members: id }).select('-_id name slug start_date end_date');
        if (!projects) {
            return res.status(404).json({ message: 'User is not added to any project' });
        }
        res.status(200).json({userDetails: user, projects});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if (!user){
            return res.status(404).json({message: "User not found!"});
        }
        const {username, name, date_of_birth, email, is_active} = req.body;
        const updateData = {username, name, date_of_birth, email, is_active};
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        ).lean().select('-__v -password -is_admin -invite_id');
        res.status(200).json(updatedUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).json({message: "User does not exist"})
        }
        // delete member from projects
        const projects = await Project.find({ members: req.params.id });
        if (projects){
            await Project.updateMany(
                { members: req.params.id },
                { $pull: { members: req.params.id } }
            );
        }
        res.status(200).json({message: "Delete Successfully"});
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}