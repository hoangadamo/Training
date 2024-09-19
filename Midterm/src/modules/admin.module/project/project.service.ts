import { Request, Response } from 'express';
import Project from '../../../models/Project';
import mongoose from 'mongoose';
import User from '../../../models/User';

export const createProject = async (req: Request, res: Response) => {
    try {
        const {name, slug, start_date, end_date} = req.body;
        if (!name || !slug || !start_date || !end_date) {
            return res.status(400).json({message: "Missing infomation"});
        }
        // check if start date is after end date
        if (start_date >= end_date) {
            return res.status(400).json({message: "Start date cannot be after end date"});
        }
        const newProject = new Project({
            name,
            slug,
            start_date,
            end_date,
            process: 0,
            members: [],
            tasks: []
        })
        await newProject.save();
        res.status(200).json(newProject);
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}

export const getAllProject = async (req: Request, res: Response) => {
    // pagination
    let perPage = 3;
    let page = parseInt(req.params.page) || 1;
    try {
        const projects = await Project.find()
            .skip((perPage * page) - perPage)
            .limit(perPage);

        const result = projects.map(project => {
            const tasks = project.tasks as unknown[];
            return {
                name: project.name,
                numberOfTasks: tasks.length,
                process: project.process
            };
        });

        const count = await Project.countDocuments();
        res.status(200).json({
            projects: result,
            currentPage: page,
            totalPages: Math.ceil(count / perPage),
            totalProjects: count
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getProjectDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid project ID' });
        }
        const project = await Project.findById(id).lean().select('-_id -__v');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const project = Project.findById(id);
        if (!project){
            return res.status(404).json({message: "Project not found!"});
        }
        const {name, slug, start_date, end_date} = req.body;
        // check if start date is after end date
        if (start_date >= end_date) {
            return res.status(400).json({message: "Start date cannot be after end date"});
        }
        const updateData = {name, slug, start_date, end_date};
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );
        res.status(200).json(updatedProject);
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(400).json({message: "Project does not exist"})
        }
        res.status(200).json({message: "Delete Successfully"});
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}

export const addMember = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid project ID or user ID' });
        }
        // add member to project
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Invalid userId' });
        }
        const members = project.members as mongoose.Types.ObjectId[];
        if (members.includes(new mongoose.Types.ObjectId(userId))) {
            return res.status(400).json({ message: 'User is already a member of the project' });
        }
        members.push(new mongoose.Types.ObjectId(userId));
        project.members = members;
        await project.save();
        res.status(200).json({ message: 'Member added successfully', project });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const removeMember = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid project ID or user ID' });
    }
    // add member to project
    const project = await Project.findById(id);
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    const members = project.members as mongoose.Types.ObjectId[];
    // Remove userId from members array
    const updatedMembers = members.filter(member => !member.equals(userId));
    project.members = updatedMembers;
    await project.save();

    res.status(200).json({ message: 'Member removed successfully', project });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}