import { Router }  from "express";
import { verifyAdmin } from "../../../middlewares/verifyAuth";
import { createType, getAllTypes, hiddenType, updateType } from "./type.service";

const typeRoute = Router();

// create type
typeRoute.post('/create', verifyAdmin, createType);

//Get all type
typeRoute.get('/', verifyAdmin, getAllTypes);

// update type
typeRoute.put('/update/:id', verifyAdmin, updateType);

// hidden type
typeRoute.put('/hidden/:id', verifyAdmin, hiddenType);



export default typeRoute;