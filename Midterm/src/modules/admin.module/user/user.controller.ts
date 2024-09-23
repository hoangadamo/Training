import { Router }  from "express";
import { verifyAdmin } from "../../../middlewares/verifyAuth";
import { createInviteId, deleteUser, getAllUser, getUserDetails, updateUser } from "./user.service";
import { validateInfo } from "../../../middlewares/validateInfo";

const userRoute = Router();

// create invite_id
userRoute.post('/create', verifyAdmin, validateInfo, createInviteId);

//Get all users
userRoute.get('/:page', verifyAdmin, getAllUser);

// Get user details
userRoute.get('/details/:id', verifyAdmin, getUserDetails);

// update user
userRoute.put('/update/:id', verifyAdmin, updateUser);

// delete user
userRoute.delete('/:id', verifyAdmin, deleteUser);

export default userRoute;