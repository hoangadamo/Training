import { Router }  from "express";
import { verifyAdmin } from "../../../middlewares/verifyAuth";
import { createPriority, getAllPriorities, hiddenPriority, updatePriority } from "./priority.service";

const priorityRoute = Router();

// create type
priorityRoute.post('/create', verifyAdmin, createPriority);

//Get all type
priorityRoute.get('/', verifyAdmin, getAllPriorities);

// update type
priorityRoute.put('/update/:id', verifyAdmin, updatePriority);

// hidden type
priorityRoute.put('/hidden/:id', verifyAdmin, hiddenPriority);

export default priorityRoute;