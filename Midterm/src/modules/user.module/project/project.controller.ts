import { Router }  from "express";
import { verifyToken } from "../../../middlewares/verifyAuth";
import { getAllProjects, getProjectDetails, getProjectTasks } from "./project.service";

const userProjectRoute = Router();

//Get all project
userProjectRoute.get('/', verifyToken, getAllProjects);

// Get project details
userProjectRoute.get('/:id', verifyToken, getProjectDetails);

// Get project tasks
userProjectRoute.get('/tasks/:id',verifyToken, getProjectTasks);

export default userProjectRoute;