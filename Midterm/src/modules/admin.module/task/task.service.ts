import { Request, Response } from 'express';

export const createTask = async (req: Request, res: Response) => {
    try {
        const { project, name, type, priority, status, assignee, start_date, end_date } = req.body;
        if (!project || !type || !priority || !status || !assignee || !end_date) {
            return res.status(400).json({message: 'Missing information'});
        }
        if (start_date >= end_date) {
            
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}