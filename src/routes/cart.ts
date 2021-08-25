import express from 'express';
import { getCart, getCartProduct, saveCartProduct, deleteCartProduct } from '../persistence/cart';

const cartRoutes = express.Router();

cartRoutes.get('/list', getCart);
cartRoutes.get('/list/:id', getCartProduct);
cartRoutes.get('/save/:id', saveCartProduct);
cartRoutes.get('/delete/:id', deleteCartProduct);

export default cartRoutes;