import { Router }  from "express";
import { verifyAdmin } from "../../../middlewares/verifyAuth";
import { createProject, deleteProject, getAllProject, getProjectDetails, updateProject } from "./project.service";

const projectRoute = Router();

// create project
projectRoute.post('/create', verifyAdmin, createProject);

//Get all project
projectRoute.get('/:page', verifyAdmin, getAllProject);

// Get project details
projectRoute.get('/details/:id', verifyAdmin, getProjectDetails);

// update project
projectRoute.put('/update/:id', verifyAdmin, updateProject);

// delete project
projectRoute.delete('/:id', verifyAdmin, deleteProject);

// add member

// remove member



export default projectRoute;