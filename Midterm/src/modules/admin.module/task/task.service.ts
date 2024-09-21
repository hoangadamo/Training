import { Request, Response } from 'express';
import Project from '../../../models/Project';
import TaskType from '../../../models/TaskType';
import TaskPriority from '../../../models/TaskPriority';
import TaskStatus from '../../../models/TaskStatus';
import Task from '../../../models/Task';
import User from '../../../models/User';
import mongoose from 'mongoose';

export const createTask = async (req: Request, res: Response) => {
    try {
        const { projectId, name, typeId, priorityId, userId, start_date, end_date } = req.body;
        if (!projectId || !name || !typeId || !priorityId || !start_date || !end_date) {
            return res.status(400).json({message: 'Missing information'});
        }
        // check if start date is before end date
        if (start_date >= end_date) {
            return res.status(400).json({message: 'Start date cannot be after end date'});
        }
        // check project id and check if being member
        const project = await Project.findOne({_id: projectId, members: userId});
        if (!project){
            return res.status(400).json({message: 'User is not a member of the project/ Invalid project id'});
        }
        if (start_date < project.start_date || start_date > project.end_date || end_date < project.start_date || end_date > project.end_date){
            return res.status(400).json({message: 'invalid start date or end date'});
        }
        // check type id
        const type = await TaskType.findById(typeId);
        if (!type || type.is_hidden){
            return res.status(400).json({message: 'Invalid type id'});
        }
        // check priority id
        const priority = await TaskPriority.findById(priorityId);
        if (!priority || priority.is_hidden){
            return res.status(400).json({message: 'Invalid priority id'});
        }
        // check user id
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'Invalid user id' });
        }
        const newStatus =await TaskStatus.findOne({name: "New"});
        
        const newTask = new Task({
            project: projectId,
            name: name,
            type: typeId,
            priority: priorityId,
            status: newStatus?._id, // default: New
            assignee: {
                assignee_id: userId,
                assignee_name: user.name
            },
            start_date: start_date,
            end_date: end_date
        })
        await newTask.save();
 
        // add task to project
        project.tasks.push(newTask.id);
        await project.save();

        res.status(200).json(newTask);
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}
export const getAllTasks = async (req: Request, res: Response) => {
    try {
        // const tasks = await Task.find();
        const tasks = await Task.aggregate([
            {
                $lookup: {
                    from: 'task_statuses',
                    localField: 'status',
                    foreignField: '_id',
                    as: 'status'
                }
            },
            {
                $unwind: '$status'
            },
            {
                $lookup: {
                    from: 'task_priorities',
                    localField: 'priority',
                    foreignField: '_id',
                    as: 'priority'
                }
            },
            {
                $unwind: '$priority'
            },
            {
                $sort: {
                    'priority.order': 1 // sort by priority order
                }
            },
            {
                $group: {
                    _id: '$status.name',
                    tasks: { $push: '$$ROOT' }
                }
            },
            {
                $sort: {
                    'status.order': 1, // sort by status order group
                }
            }
        ]);

        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};


export const getTaskDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const project = await Project.findById(task.project).lean().select('-_id name start_date end_date');
        const type = await TaskType.findById(task.type).select('-_id name color');
        const status = await TaskStatus.findById(task.status).select('-_id name order');
        const priority = await TaskPriority.findById(task.priority).select('-_id name order');
        
        res.status(200).json({name: task.name, project, type, status, priority, assignee: task.assignee, start_date: task.start_date, end_date: task.end_date});
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


export const updateTask = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({message: "Task not found!"});
        }
        const { project, name, type, priority, status, assignee_id, start_date, end_date } = req.body;
        // check if start date is before end date
        if (start_date >= end_date) {
            return res.status(400).json({message: 'Start date cannot be after end date'});
        }
        // check project
        if (project){
            // check project id and check if being member
            const newProject = await Project.findOne({_id: project, members: assignee_id});
            if (!newProject){
                return res.status(400).json({message: 'User is not a member of the project/ Invalid project id'});
            }
            // add task to newProject
            const tasks = newProject.tasks;
            if (tasks.includes(new mongoose.Types.ObjectId(id))) {
                return res.status(400).json({ message: 'Task is already added to the project' });
            }
            tasks.push(new mongoose.Types.ObjectId(id));
            newProject.tasks = tasks;
            await newProject.save();
            // remove task from old project
            const oldProject = await Project.findById(task.project);
            if (oldProject){
                const tasks = oldProject.tasks;
                const updatedTasks = tasks.filter(task => !task.equals(task._id));
                oldProject.tasks = updatedTasks;
                await oldProject.save();
            }
            if (start_date < newProject.start_date || start_date > newProject.end_date || end_date < newProject.start_date || end_date > newProject.end_date){
                return res.status(400).json({message: 'invalid start date or end date'});
            }
        }
        // check type id
        if (type){
            const typeFound = await TaskType.findById(type);
            if (!typeFound || typeFound.is_hidden){
                return res.status(400).json({message: 'Invalid type id'});
            }
        }
        // check priority id
        if (priority){
            const priorityFound = await TaskPriority.findById(priority);
            if (!priorityFound || priorityFound.is_hidden){
                return res.status(400).json({message: 'Invalid priority id'});
            }
        }
        
        // check status id
        if (status){
            const statusFound = await TaskStatus.findById(status);
            if (!statusFound || statusFound.is_hidden) {
                return res.status(400).json({ message: 'Invalid status id' });
            }   
        }
        // check assignee
        let assignee_name: string = task.assignee.assignee_name;
        if (assignee_id){
            const checkMember = await Project.findOne({_id: task.project, members: assignee_id});
            if (!checkMember){
                return res.status(400).json({message: 'User is not a member of the project'});
            }
            const user = await User.findById(assignee_id);
            if (!user) {
                return res.status(400).json({ message: 'Invalid user id' });
            }
            assignee_name = user.name;
        }
        
        const updateData = {
            project, name, type, priority, status, assignee: {assignee_id, assignee_name} , start_date, end_date
        }
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        ).lean().select('-__v');
        res.status(200).json(updatedTask);
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(400).json({ message: "Task does not exist" });
        }

        // Find the project that contains the task
        const project = await Project.findOne({ tasks: req.params.id });
        if (project) {
            // Remove the task from the project's task list
            await Project.updateOne(
                { _id: project._id },
                { $pull: { tasks: req.params.id } }
            );
        }

        res.status(200).json({ message: "Delete Successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
