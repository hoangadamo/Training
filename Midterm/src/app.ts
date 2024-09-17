import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import cookieParser from 'cookie-parser';

import authRoute from './modules/auth/authController';
// import projectRoute from './modules/project/projectController';

dotenv.config();
const app = express();
connectDB();

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoute);
// app.use('/project', projectRoute);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
