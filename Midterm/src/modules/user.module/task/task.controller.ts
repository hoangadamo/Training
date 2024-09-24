import { Router }  from "express";
import { createTask, deleteTask, getAllTasks, getTaskDetails, updateTask} from "./task.service";
import { verifyToken } from "../../../middlewares/verifyAuth";

const userTaskRoute = Router();

// create task
userTaskRoute.post('/create', verifyToken, createTask);

// Get all task
userTaskRoute.get('/:project_id', verifyToken, getAllTasks);

// // Get task details
userTaskRoute.get('/details/:id', verifyToken, getTaskDetails );

// update task
userTaskRoute.put('/update/:id', verifyToken, updateTask);

// delete task
userTaskRoute.delete('/:id', verifyToken, deleteTask);


export default userTaskRoute;