import { Router }  from "express";
import { verifyAdmin } from "../../../middlewares/verifyAuth";
import { createTask, deleteTask, getAllTasks, getTaskDetails, updateTask } from "./task.service";

const taskRoute = Router();

// create task
taskRoute.post('/create', verifyAdmin, createTask);

// Get all task
taskRoute.get('/:project_id', verifyAdmin, getAllTasks);

// Get task details
taskRoute.get('/details/:id', verifyAdmin, getTaskDetails );

// update task
taskRoute.put('/update/:id', verifyAdmin, updateTask);

// delete task
taskRoute.delete('/:id', verifyAdmin, deleteTask);


export default taskRoute;