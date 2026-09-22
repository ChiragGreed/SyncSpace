import express from 'express';
import { getMe, login, logout, register } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validateLogin, validateRegister } from '../middlewares/validateMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register', validateRegister, register);

authRouter.post('/login', validateLogin, login);

authRouter.get('/', verifyToken, getMe);

authRouter.post('/logout', verifyToken, logout);

export default authRouter;
