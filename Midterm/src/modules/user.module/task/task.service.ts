import { Request, Response } from 'express';
import Project from '../../../models/Project';
import TaskType from '../../../models/TaskType';
import TaskPriority from '../../../models/TaskPriority';
import TaskStatus from '../../../models/TaskStatus';
import Task from '../../../models/Task';
import User from '../../../models/User';
import mongoose from 'mongoose';
import { statusEnum } from '../../../utils/StatusEnum';

interface CustomRequest extends Request {
    user?: any;
}

export const createTask = async (req: CustomRequest, res: Response) => {
    try {
        const { projectId, name, typeId, priorityId, start_date, end_date } = req.body;
        if (!projectId || !name || !typeId || !priorityId || !start_date || !end_date) {
            return res.status(400).json({message: 'Missing information'});
        }
        // check if user is a member of the project
        const project = await Project.findOne({_id: projectId, members: req.user.id});
        if (!project) {
            return res.status(404).json({ message: 'You are not the member of the project / Project does not exist!' });
        }
        // check start date and end date
        if (new Date(start_date) >= new Date(end_date)) {
            return res.status(400).json({message: 'Start date cannot be after end date'});
        }
        if (new Date(start_date) < project.start_date || new Date(start_date) > project.end_date || new Date(end_date) < project.start_date || new Date(end_date) > project.end_date){
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
   
        const newStatus =await TaskStatus.findOne({name: statusEnum.NEW});
        const newTask = new Task({
            project: projectId,
            name: name,
            type: typeId,
            priority: priorityId,
            status: newStatus?._id, // default: New
            assignee: {
                assignee_id: req.user.id, // default: me
                assignee_name: req.user.name
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
        console.log(error);
        res.status(400).json({ message: error.message});
    }
}
export const getAllTasks = async (req: CustomRequest, res: Response) => {
    try {
        const {project_id} = req.params;
        const tasks = await Task.find({ 'assignee.assignee_id': req.user.id, project: project_id }).lean().select('-__v');
        res.status(200).json(tasks);
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

export const getTaskDetails = async (req: CustomRequest, res: Response) => {
    try {
        const { id } = req.params;

        const task = await Task.findOne({_id: id, 'assignee.assignee_id': req.user.id});
        if (!task) {
            return res.status(404).json({ message: 'Task not found / You are not permission' });
        }

        const project = await Project.findById(task.project).lean().select('-_id name start_date end_date');
        const type = await TaskType.findById(task.type).select('-_id name color');
        const status = await TaskStatus.findById(task.status).select('-_id name');
        const priority = await TaskPriority.findById(task.priority).select('-_id name');
        
        res.status(200).json({name: task.name, project, type, status: status?.name, priority: priority?.name, assignee: task.assignee, start_date: task.start_date, end_date: task.end_date});
    } catch (error: any) {
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
        const { name, type, priority, status, assignee_id, start_date, end_date } = req.body;
        // check if start date is before end date
        const current_project = await Project.findById(task.project);
        if (!current_project) {
            return res.status(404).json({ message: "Project not found!" });
        } 
        let temp_start_date = new Date(start_date);
        let temp_end_date = new Date(end_date);
        console.log(temp_end_date);
        console.log(current_project.start_date);
        console.log(temp_end_date<current_project.start_date);
        if (new Date(start_date) >= new Date(end_date)  || temp_start_date >= current_project.end_date || temp_end_date <= current_project.start_date || temp_start_date >= task.end_date || temp_end_date <= task.start_date) {
            return res.status(400).json({message: 'Start date cannot be after end date / cannot out of project duration '});
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
        let temp_assignee_id = task.assignee.assignee_id;
        if (assignee_id){
            const user = await User.findById(assignee_id);
            if (!user) {
                return res.status(400).json({ message: 'Invalid user id' });
            }
            assignee_name = user.name;
            temp_assignee_id = user.id;
        }
        const updateData = {
            name, type, priority, status, assignee: {assignee_id: temp_assignee_id, assignee_name} , start_date, end_date
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

export const deleteTask = async (req: CustomRequest, res: Response) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            'assignee.assignee_id': req.user.id
        });
        if (!task) {
            return res.status(400).json({ message: "You do not have the permission to delete / Task does not exist" });
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
