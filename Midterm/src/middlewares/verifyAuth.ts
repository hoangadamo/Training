import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: any;
}

export const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.token as string;
  if (token) {
    // Bearer 123456 => accessToken: 123456
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY as string, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You're not authenticated");
  }
};

export const verifyAdmin = async (req: CustomRequest, res: Response, next: NextFunction) =>{
    verifyToken(req,res,()=>{
        if (req.user.isAdmin) {
            next();
        } else {
            return res
                .status(403)
                .json("You're not allowed, only admin has permission!");
        }
    })
}
