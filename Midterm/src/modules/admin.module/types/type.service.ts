import { Request, Response } from 'express';
import TaskType from '../../../models/TaskType';

export const createType = async (req: Request, res: Response) => {
    try {
        const {name, color} = req.body;
        if (!name || !color) {
            return res.status(400).json({message: 'Missing information'});
        }
        // if (name !== 'bug' || name !== 'feature') {
        //     return res.status(400).json({message: 'Invalid name'});
        // }
        const newType = new TaskType({
            name,
            color
        })
        await newType.save();
        res.status(200).json(newType);
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}

export const getAllTypes = async (req: Request, res: Response) => {
    try {
        const types = await TaskType.find().select('-__v');
        res.status(200).json(types);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateType = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const type = await TaskType.findById(id);
        if (!type) {
            return res.status(404).json({message: "Task type not found!"});
        }
        const {name, color} = req.body;
        const updateData = {name, color};
        const updatedType = await TaskType.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        ).lean().select('-__v'); // .lean() để trả về object thuần tuý, ko gồm các thông tin khác
        res.status(200).json(updatedType);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const hiddenType = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const type = await TaskType.findById(id);
        if (!type) {
            return res.status(404).json({message: "Task type not found!"});
        }
        type.is_hidden = !type.is_hidden;
        await type.save();

        return res.status(200).json({ message: "Task type visibility updated successfully!", type });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

