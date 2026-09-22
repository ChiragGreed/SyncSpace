import express from "express";
import taskRouter from "./routes/taskRoutes.js";
import authRouter from "./routes/authRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import teamRouter from "./routes/teamRoutes.js";
import invitationRouter from "./routes/invitationRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import cookieParser from "cookie-parser";
import { notFoundHandler, errorHandler } from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/projects', projectRouter);
app.use('/api/team', teamRouter);
app.use('/api/invitations', invitationRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/ai', aiRouter);

// Must come after all routes.
app.use(notFoundHandler);
app.use(errorHandler);

export default app;