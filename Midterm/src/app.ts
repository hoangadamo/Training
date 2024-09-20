import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import cookieParser from 'cookie-parser';

import authRoute from './modules/auth.module/auth.controller';
import projectRoute from './modules/admin.module/project/project.controller';
import userRoute from './modules/admin.module/user/user.controller';
import typeRoute from './modules/admin.module/types/type.controller';
import statusRoute from './modules/admin.module/status/status.controller';
import priorityRoute from './modules/admin.module/priority/priority.controller';
import taskRoute from './modules/admin.module/task/task.controller';

dotenv.config();
const app = express();
connectDB();

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoute);
app.use('/admin/project', projectRoute);
app.use('/admin/user', userRoute);
app.use('/admin/type', typeRoute);
app.use('/admin/status', statusRoute);
app.use('/admin/priority', priorityRoute);
app.use('/admin/task', taskRoute);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
