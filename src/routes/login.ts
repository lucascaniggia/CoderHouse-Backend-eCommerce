import express from 'express';
import passport from 'middlewares/auth';
import { loginUser, logoutUser, signUpUser, userData } from 'controllers/login';
import { imageUpload } from 'middlewares/uploadImg';

const loginRouter = express.Router();

loginRouter.post('/login', passport.authenticate('login'), loginUser);
loginRouter.post('/signup', imageUpload, signUpUser);
loginRouter.get('/userdata', userData);
loginRouter.get('/logout', logoutUser);

export default loginRouter;
