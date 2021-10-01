import express from 'express';
import productRouter from './product';
import cartRouter from './cart';
import loginRouter from './login';
import { validateLogin } from 'middlewares/validLogin';

const Router = express.Router();

Router.use('/', loginRouter);
Router.use('/products', validateLogin, productRouter);
Router.use('/cart', validateLogin, cartRouter);

export default Router;
