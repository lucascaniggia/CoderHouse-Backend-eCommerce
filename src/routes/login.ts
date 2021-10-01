import { loginUser, logoutUser, loginSession } from 'controllers/login';
import express from 'express';

const loginRouter = express.Router();

loginRouter.post('/login', loginUser);
loginRouter.get('/login', loginSession);
loginRouter.get('/logout', logoutUser);

export default loginRouter;
