import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { getRecentTeammates, searchUsers } from '../controllers/teamController.js';

const teamRouter= express.Router();

teamRouter.use(verifyToken);

teamRouter.get('/recent', getRecentTeammates);
teamRouter.get('/', searchUsers);

export default teamRouter;
