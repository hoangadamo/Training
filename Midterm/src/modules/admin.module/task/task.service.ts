import { Request, Response } from 'express';
import Project from '../../../models/Project';
import TaskType from '../../../models/TaskType';
import TaskPriority from '../../../models/TaskPriority';
import TaskStatus from '../../../models/TaskStatus';
import Task from '../../../models/Task';
import User from '../../../models/User';

export const createTask = async (req: Request, res: Response) => {
    try {
        const { projectId, name, typeId, priorityId, userId, start_date, end_date } = req.body;
        if (!projectId || !name || !typeId || !priorityId || !end_date) {
            return res.status(400).json({message: 'Missing information'});
        }
        // check if start date is before end date
        if (start_date >= end_date) {
            return res.status(400).json({message: 'Start date cannot be after end date'});
        }
        // check project id
        const project = await Project.findById(projectId)
        if (!project){
            return res.status(400).json({message: 'Invalid project id'});
        }
        if (start_date < project.start_date || start_date > project.end_date || end_date < project.start_date || end_date > project.end_date){
            return res.status(400).json({message: 'invalid start date or end date'});
        }
        // check type id
        const type = await TaskType.findById(typeId);
        if (!type){
            return res.status(400).json({message: 'Invalid type id'});
        }
        // check priority id
        const priority = await TaskPriority.findById(priorityId);
        if (!priority){
            return res.status(400).json({message: 'Invalid priority id'});
        }
        // check status id
        // const status = await TaskStatus.findById(statusId);
        // if (!status) {
        //     return res.status(400).json({ message: 'Invalid status id' });
        // }
        const newTask = new Task({
            project: projectId,
            name: name,
            type: typeId,
            priority: priorityId,
            status: "66ea9cc8bdb105b1647c8165", // default: new
            assignee: userId,
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
                    'priority.order': -1 // sort by priority order
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


// export const getAllTasks = async (req: Request, res: Response) => {
//     try {
//         const tasks = await Task.find();

//         res.status(200).json(tasks);
//     } catch (error: any) {
//         res.status(400).json({ message: error.message });
//     }
// };

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
        const assignee = await User.findById(task.assignee).select('-_id name');
        
        res.status(200).json({name: task.name, project, type, status, priority, assignee, start_date: task.start_date, end_date: task.end_date});
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
        const { projectId, name, typeId, priorityId, statusId, userId, start_date, end_date } = req.body;
        // // check if start date is before end date
        // if (start_date >= end_date) {
        //     return res.status(400).json({message: 'Start date cannot be after end date'});
        // }
        // // check project id
        // if (projectId){
        //     const newProject = await Project.findById(projectId)
        //     if (!newProject){
        //         return res.status(400).json({message: 'Invalid project id'});
        //     }
        //     // remove task from old project
        //     // add task to project
        //     const oldProject = await Project.findById(task.project);
        //     if (oldProject){
        //         const tasks = oldProject.tasks;
        //         const updatedTasks = tasks.filter(task => !task.equals(task._id));
        //         oldProject.tasks = updatedTasks;
        //         await oldProject.save();
        //     }
        //     if (start_date < newProject.start_date || start_date > newProject.end_date || end_date < newProject.start_date || end_date > newProject.end_date){
        //         return res.status(400).json({message: 'invalid start date or end date'});
        //     }
        // }
        // // check type id
        // if (typeId){
        //     const type = await TaskType.findById(typeId);
        //     if (!type){
        //         return res.status(400).json({message: 'Invalid type id'});
        // }
        // }
        // // check priority id
        // if (priorityId){
        //     const priority = await TaskPriority.findById(priorityId);
        //     if (!priority){
        //         return res.status(400).json({message: 'Invalid priority id'});
        //     }
        // }
        
        // // check status id
        // if (statusId){
        //     const status = await TaskStatus.findById(statusId);
        //     if (!status) {
        //         return res.status(400).json({ message: 'Invalid status id' });
        //     }   
        // }
        const updateData = {
            projectId, name, typeId, priorityId, statusId, userId, start_date, end_date
        }
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        ).lean().select('-__v'); // .lean() để trả về object thuần tuý, ko gồm các thông tin khác
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
