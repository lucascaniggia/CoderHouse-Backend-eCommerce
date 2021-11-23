import express from 'express';
import productRouter from './product';
import cartRouter from './cart';
import loginRouter from './login';
import userRouter from './user';
import ordersRouter from './orders';
import { isLoggedIn } from 'middlewares/auth';
import { isAdmin } from 'middlewares/checkAdmin';

const Router = express.Router();

Router.use('/auth', loginRouter);
Router.use('/products', isLoggedIn, productRouter);
Router.use('/cart', isLoggedIn, cartRouter);
Router.use('/orders', isLoggedIn, ordersRouter);
Router.use('/users', isLoggedIn, isAdmin, userRouter);

export default Router;
