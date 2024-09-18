import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import cookieParser from 'cookie-parser';

import authRoute from './modules/admin.module/auth/auth.controller';
import projectRoute from './modules/admin.module/project/project.controller';
import userRoute from './modules/admin.module/user/user.controller';

dotenv.config();
const app = express();
connectDB();

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoute);
app.use('/admin/project', projectRoute);
app.use('/admin/user', userRoute);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
