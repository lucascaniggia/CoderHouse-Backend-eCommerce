import express from 'express';
import productRouter from './product';
import cartRouter from './cart';
import loginRouter from './login';
import { isLoggedIn } from 'middlewares/auth';

const Router = express.Router();

Router.use('/', loginRouter);
Router.use('/products', isLoggedIn, productRouter);
Router.use('/cart', isLoggedIn, cartRouter);

export default Router;
