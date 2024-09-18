import { Request, Response } from 'express';
import User from '../../../models/User';
import randomstring from 'randomstring';

export const createInviteId = async (req: Request, res: Response) => {
    try {
        const {username, password, name, date_of_birth, email, project} = req.body;
        const newUser = new User({
            username,
            password,
            name,
            date_of_birth,
            email,
            project,
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
    let perPage = 5;
    let page = parseInt(req.params.page) || 1;
    try {
        const users = await User.find().skip((perPage * page) - perPage).limit(perPage);
        const result = users.map(user => {
            const tasks = user.tasks as unknown[];
            return {
                username: user.username,
                name: user.name,
                date_of_birth: user.date_of_birth,
                email: user.email
            };
        });
        const count = await User.countDocuments();
        res.status(200).json({
            projects: users,
            currentPage: page,
            totalPages: Math.ceil(count / perPage),
            totalProjects: count
        });

    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}