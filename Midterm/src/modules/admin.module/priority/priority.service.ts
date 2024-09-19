import { Request, Response } from 'express';
import TaskPriority from '../../../models/TaskPriority';

export const createPriority = async (req: Request, res: Response) => {
    try {
        const {name, order} = req.body;
        if (!name || !order) {
            return res.status(400).json({message: 'Missing information'});
        }
        const newPriority = new TaskPriority({
            name,
            order
        })
        await newPriority.save();
        res.status(200).json(newPriority);
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}

export const getAllPriorities = async (req: Request, res: Response) => {
    try {
        const priorities = await TaskPriority.find().select('-__v');
        res.status(200).json(priorities);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updatePriority = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const priority = await TaskPriority.findById(id);
        if (!priority) {
            return res.status(404).json({message: "Task priority not found!"});
        }
        const {name, order} = req.body;
        const updateData = {name, order};
        const updatedPriority = await TaskPriority.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        ).lean().select('-__v'); // .lean() để trả về object thuần tuý, ko gồm các thông tin khác
        res.status(200).json(updatedPriority);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const hiddenPriority = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const priority = await TaskPriority.findById(id);
        if (!priority) {
            return res.status(404).json({message: "Task priority not found!"});
        }
        priority.is_hidden = !priority.is_hidden;
        await priority.save();

        return res.status(200).json({ message: "Task priority visibility updated successfully!", priority });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

