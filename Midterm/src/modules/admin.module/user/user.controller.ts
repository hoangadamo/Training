import { Router }  from "express";
import { verifyAdmin } from "../../../middlewares/verifyAuth";
import { createInviteId, getAllUser } from "./user.service";

const userRoute = Router();

// create invite_id
userRoute.post('/create', verifyAdmin, createInviteId);

//Get all users
userRoute.get('/', verifyAdmin, getAllUser)
// userRoute.get('/', verifyAdmin, );

// Get user details

// update user
// userRoute.put('/update/:id', verifyAdmin, );

// delete user



export default userRoute;