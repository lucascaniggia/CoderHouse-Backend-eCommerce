import express from 'express';
import { isAdmin } from 'middlewares/checkAdmin';
import {
  deleteProduct,
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
} from 'controllers/product';
import asyncHandler from 'express-async-handler';

const productRouter = express.Router();

productRouter.get('/list', asyncHandler(getProducts));
productRouter.get('/list/:id', asyncHandler(getProduct));
productRouter.post('/save', isAdmin, asyncHandler(saveProduct));
productRouter.put('/update/:id', isAdmin, asyncHandler(updateProduct));
productRouter.delete('/delete/:id', isAdmin, asyncHandler(deleteProduct));

export default productRouter;
