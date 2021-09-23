import express from 'express';
import {
  getCart,
  getCartProduct,
  saveCartProduct,
  deleteCartProduct,
} from 'controllers/cart';
import asyncHandler from 'express-async-handler';

const cartRouter = express.Router();

cartRouter.get('/list', asyncHandler(getCart));
cartRouter.get('/list/:id', asyncHandler(getCartProduct));
cartRouter.get('/save/:id', asyncHandler(saveCartProduct));
cartRouter.get('/delete/:id', asyncHandler(deleteCartProduct));

export default cartRouter;
