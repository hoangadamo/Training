import { Request, Response } from 'express';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import generateToken from '../../utils/generateToken';
import validateEmail from '../../utils/validateEmail';
import IUser from '../../interface/IUser';
import validateInfo from '../../utils/validateInfo';

export const register = async (req: Request, res: Response) => {
  try {
    const { invite_id } = req.params;
    const user = await User.findOne({ invite_id: invite_id });
    if (!user) {
      return res.status(400).json({message: "Invalid invite_id"});
    }
    const id = user._id;

    const {username, password, name, date_of_birth, email} = req.body;
    if(!username || !password || !name || !date_of_birth || !email){
      return res.status(400).json({message: 'Missing information'});
    }
      if (!validateInfo(username,password) || !validateEmail(email) || new Date(date_of_birth).getTime() > Date.now()){
        return res.status(400).json({message: 'Invalid input'});
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const newUser = 
      {
        username, 
        password: hashed,
        name,
        date_of_birth,
        email,
        invite_id: ""
      }
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: newUser },
        { new: true }
      ).lean().select('-__v -password -is_admin -invite_id');

    res.status(200).json({user: updatedUser});
    
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const {username, password} = req.body;
  try {
    if(!username || !password){
      return res.status(400).json({message: 'Missing information'});
    } 
    const user = await User.findOne({username: username});
    if (!user) {
      return res.status(404).json({message: 'Wrong username or password!'});
    } 
    if (!user.is_active){ // check if user is active
      res.status(400).json({message: 'User is inactive'});
    } else {
      const validPassword = await bcrypt.compare(
        password,
        user.password as string
      );
      if (!validPassword) {
        return res.status(404).json({message: "Wrong username or password!"});
      }
      // generate access token and store in cookie
      const token = generateToken(user.id, user.name, user.is_admin as boolean, user.is_active as boolean, res);
      const { password: _, date_of_birth, invite_id, ...userWithoutPassword } = user.toObject();
      res.status(200).send({ user: userWithoutPassword, token});
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message});
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("accessToken", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}