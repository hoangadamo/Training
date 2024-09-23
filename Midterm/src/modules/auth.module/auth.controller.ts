import { Router }  from "express";
import { login, logout, register } from "./auth.service";
import { validateInfo } from "../../middlewares/validateInfo";

const authRoute = Router();

authRoute.put('/register/:invite_id', validateInfo, register);

authRoute.post('/login', login);

authRoute.post('/logout', logout);

export default authRoute;