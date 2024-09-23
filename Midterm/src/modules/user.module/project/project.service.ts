import { Request, Response } from 'express';
import Project from '../../../models/Project';
import Task from '../../../models/Task';
import TaskStatus from '../../../models/TaskStatus';
import ITaskStatus from '../../../interface/ITaskStatus';
import mongoose from 'mongoose';

interface CustomRequest extends Request {
    user?: any;
}

export const getAllProjects = async (req: CustomRequest, res: Response) => {
    try {
        const projects = await Project.find({members: req.user.id});

        const result = projects.map(project => {
            return {
                _id: project.id,
                name: project.name
            };
        });
        res.status(200).json({joinProjects: result});
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getProjectDetails = async (req: CustomRequest, res: Response) => {
    try {
        const { id } = req.params;
        // check if user is a member of the project
        const project = await Project.findOne({_id: id, members: req.user.id});
        if (!project) {
            return res.status(404).json({ message: 'You are not the member of the project / Project does not exist!' });
        }
        
        // find Status with name Closed
        const status = await TaskStatus.findOne({name: "Closed"}).exec() as ITaskStatus | null;

        // Count tasks that have status: closed
        const closedTasks = await Task.countDocuments({ project: id, status: status?._id });
        
        const totalTasks = project.tasks.length;
        let process;
        if (totalTasks === 0){
            process = 0; 
        } else {
            process = Math.round(closedTasks/totalTasks * 100) / 100;
        }
        res.status(200).json({name: project.name, members: project.members, totalTasks, process, start_date: project.start_date, end_date: project.end_date});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getProjectTasks = async (req: CustomRequest, res: Response) => {
    try {
        const { id } = req.params;
        // Check if user is a member of the project
        const project = await Project.findOne({ _id: id, members: req.user.id });
        if (!project) {
            return res.status(404).json({ message: 'You are not a member of the project / Project does not exist!' });
        }

        const tasks = await Task.aggregate([
            {
                $match: { project: new mongoose.Types.ObjectId(id) }
            },
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
                    'status.order': -1, // sort by status order group
                }
            },
            {
                $project:{
                    tasks: {
                        $map:{
                            input: '$tasks',
                            as: 'task',
                            in: {
                                _id: '$$task._id',
                                name: '$$task.name',
                                priority: { name: '$$task.priority.name' },
                                status: { name: '$$task.status.name' },
                                assignee: '$$task.assignee',
                                start_date: '$$task.start_date',
                                end_date: '$$task.end_date'
                            }
                        }
                    }
                }
            }
        ]);
        res.status(200).json(tasks);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
