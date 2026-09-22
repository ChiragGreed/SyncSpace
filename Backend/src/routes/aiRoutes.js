import express from "express";
import { generateTasks } from "../controllers/aiController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const aiRouter = express.Router();

aiRouter.post("/generate-tasks", verifyToken, generateTasks);

export default aiRouter;
