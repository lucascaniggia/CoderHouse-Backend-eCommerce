import express from 'express';
import productRouter from './product';
import cartRouter from './cart';

const Router = express.Router();

Router.use('/products', productRouter);
Router.use('/cart', cartRouter);

export default Router;
