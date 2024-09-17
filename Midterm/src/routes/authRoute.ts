import { Router }  from "express";
import { login, logout, register } from "../controllers/authController";

const authRoute = Router();

authRoute.post('/register', register);

authRoute.post('/login', login);

authRoute.post('/logout', logout);

export default authRoute;