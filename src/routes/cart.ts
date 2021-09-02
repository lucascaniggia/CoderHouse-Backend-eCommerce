import express from 'express';
import {
  getCart,
  getCartProduct,
  saveCartProduct,
  deleteCartProduct,
} from 'controllers/cart';

const cartRouter = express.Router();

cartRouter.get('/list', getCart);
cartRouter.get('/list/:id', getCartProduct);
cartRouter.get('/save/:id', saveCartProduct);
cartRouter.get('/delete/:id', deleteCartProduct);

export default cartRouter;
