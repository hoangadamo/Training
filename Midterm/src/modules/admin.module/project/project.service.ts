import { Request, Response } from 'express';
import Project from '../../../models/Project';
import mongoose from 'mongoose';
import User from '../../../models/User';
import TaskStatus from '../../../models/TaskStatus';
import ITaskStatus from '../../../interface/ITaskStatus';
import Task from '../../../models/Task';

export const createProject = async (req: Request, res: Response) => {
    try {
        const {name, start_date, end_date} = req.body;
        if (!name || !start_date || !end_date) {
            return res.status(400).json({message: "Missing infomation"});
        }
        // check if start date is after end date
        if (new Date(start_date) >= new Date(end_date)) {
            return res.status(400).json({message: "Start date cannot be after end date"});
        }
        // vd: name: "Test Project 123" => slug: "test-project-123"
        const slug = name
            .replace(/([a-z])([A-Z])/g, '$1-$2') // Add hyphen between camelCase words
            .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
            .toLowerCase();

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

        // find Status with name Closed
        const status = await TaskStatus.findOne({ name: "Closed" }).exec();
        if (!status) {
            return res.status(404).json({ message: 'Status "Closed" not found!' });
        }

        const result = await Promise.all(projects.map(async project => {
            const closedTasks = await Task.countDocuments({ project: project.id, status: status._id });
            const totalTasks = project.tasks.length;
            let process;
            if (totalTasks === 0){
                process = 0;
            } else {
                process = parseFloat((closedTasks / totalTasks).toFixed(2));
            }
            return {
                name: project.name,
                numberOfTasks: totalTasks,
                process
            };
        }));

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

        const project = await Project.findById(id).lean().select('-_id -__v -process');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Fetch member names
        const members = await User.find({ _id: { $in: project.members } }).select('name');

        // Fetch task details
        const tasks = await Task.aggregate([
            { $match: { _id: { $in: project.tasks } } },
            {
                $lookup: {
                    from: 'task_statuses',
                    localField: 'status',
                    foreignField: '_id',
                    as: 'status'
                }
            },
            { $unwind: '$status' },
            {
                $project: {
                    name: 1,
                    'status.name': 1
                }
            }
        ]);

        res.status(200).json({ name: project.name, members, tasks });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const project = await Project.findById(id);
        if (!project){
            return res.status(404).json({message: "Project not found!"});
        }
        const {name, start_date, end_date} = req.body;
        // check if start date is after end date
        let temp_start_date = new Date(start_date);
        let temp_end_date = new Date(end_date);
        if (new Date(start_date) >= new Date(end_date) || temp_start_date >= project.end_date || temp_end_date <= project.start_date) {
            return res.status(400).json({message: "Start date cannot be after end date"});
        }
        const updateData = {name, start_date, end_date};
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
        const tasks = project.tasks;
        // delete all tasks related to the project
        await Task.deleteMany({ _id: { $in: project.tasks } });
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
    // check project id
    const project = await Project.findById(id);
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }
    // check user id
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'Invalid userId' });
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