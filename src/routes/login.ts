import express from 'express';
import passport from 'middlewares/auth';
import { loginUser, logoutUser, signUpUser } from 'controllers/login';

const loginRouter = express.Router();

loginRouter.post('/login', passport.authenticate('login'), loginUser);
loginRouter.get('/signup', passport.authenticate('signup'), signUpUser);
loginRouter.get('/logout', logoutUser);

export default loginRouter;
