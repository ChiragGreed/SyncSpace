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
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'https://syncspace-bz0v.onrender.com',
    credentials: true
}));

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/projects', projectRouter);
app.use('/api/team', teamRouter);
app.use('/api/invitations', invitationRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/ai', aiRouter);

const frontendPath = path.join(__dirname, "../public/dist");

app.use(express.static(frontendPath));

app.get("/{*splat}", (req, res, next) => {
    if (req.path.startsWith("/api")) {
        return next();
    }

    res.sendFile(path.join(frontendPath, "index.html"));
});

// Must come after all routes.
app.use(notFoundHandler);
app.use(errorHandler);

export default app;