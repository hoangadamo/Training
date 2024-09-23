import { Request, Response, NextFunction } from 'express';

export const validateInfo = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email} = req.body;
    // check username
    if (username.length < 5) {
        return res.status(400).json({ message: 'Invalid username' });
    }
    // check password
    if (password.length < 8) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    // check email
    const isValidEmail = String(email)
        .toLowerCase() 
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    if (!isValidEmail) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    next();
};
