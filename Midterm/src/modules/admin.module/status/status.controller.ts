import { Router }  from "express";
import { verifyAdmin } from "../../../middlewares/verifyAuth";
import { createStatus, getAllStatuses, hiddenStatus, updateStatus } from "./status.service";

const statusRoute = Router();

// create status
statusRoute.post('/create', verifyAdmin, createStatus);

//Get all status
statusRoute.get('/', verifyAdmin, getAllStatuses);

// update status
statusRoute.put('/update/:id', verifyAdmin, updateStatus);

// hidden status
statusRoute.put('/hidden/:id', verifyAdmin, hiddenStatus);



export default statusRoute;