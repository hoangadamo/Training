import jwt from 'jsonwebtoken';
import { Response } from "express";
const generateToken = (userId: string, isAdmin: boolean, isActive: boolean, res: Response) =>{
    const token = jwt.sign(
        {
            id: userId, 
            isAdmin,
            isActive
        }, 
        process.env.JWT_ACCESS_KEY || '123456789',  // process.env.JWT_SECRET as string
        { expiresIn: "15d" }
    );
    // store accessToken to cookie
    res.cookie("accessToken", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15d => MS 
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    });
    return token;
}

export default generateToken;



// import { Response } from "express"; // Assuming you're using Express.js
// import jwt from "jsonwebtoken";

// const generateTokenAndSetCookie = (userId: string, res: Response): void => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
//     expiresIn: "15d",
//   });

//   res.cookie("jwt", token, {
//     maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
//     httpOnly: true, // prevent XSS attacks
//     sameSite: "strict", // prevent CSRF attacks
//     secure: process.env.NODE_ENV !== "development", // use secure cookies in production
//   });
// };
