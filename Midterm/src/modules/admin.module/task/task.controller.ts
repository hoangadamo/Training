import { Router }  from "express";
import { verifyAdmin } from "../../../middlewares/verifyAuth";

const taskRoute = Router();

// create task
taskRoute.post('/create', verifyAdmin, );

// Get all task
taskRoute.get('/', verifyAdmin, );

// Get task details
taskRoute.get('/:id', verifyAdmin, );

// update task
taskRoute.put('/update/:id', verifyAdmin, );

// delete task
taskRoute.delete('/:id', verifyAdmin, );


export default taskRoute;