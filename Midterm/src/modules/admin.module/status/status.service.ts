import { Request, Response } from 'express';
import TaskStatus from '../../../models/TaskStatus';

export const createStatus = async (req: Request, res: Response) => {
    try {
        const {name, order} = req.body;
        if (!name || !order) {
            return res.status(400).json({message: 'Missing information'});
        }
        const newStatus = new TaskStatus({
            name,
            order
        })
        await newStatus.save();
        res.status(200).json(newStatus);
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}

export const getAllStatuses = async (req: Request, res: Response) => {
    try {
        const Statuses = await TaskStatus.find().select('-__v');
        res.status(200).json(Statuses);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateStatus = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const status = await TaskStatus.findById(id);
        if (!status) {
            return res.status(404).json({message: "Task Status not found!"});
        }
        const {name, order} = req.body;
        const updateData = {name, order};
        const updatedStatus = await TaskStatus.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        ).lean().select('-__v'); // .lean() để trả về object thuần tuý, ko gồm các thông tin khác
        res.status(200).json(updatedStatus);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const hiddenStatus = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const status = await TaskStatus.findById(id);
        if (!status) {
            return res.status(404).json({message: "Task Status not found!"});
        }
        status.is_hidden = !status.is_hidden;
        await status.save();

        return res.status(200).json({ message: "Task Status visibility updated successfully!", status });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

