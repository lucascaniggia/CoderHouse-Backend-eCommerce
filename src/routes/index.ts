import express from 'express';
import productRoutes from './product';
import cartRoutes from './cart';

const routes = express.Router();

routes.use('/products', productRoutes);
routes.use('/cart', cartRoutes);

export default routes;