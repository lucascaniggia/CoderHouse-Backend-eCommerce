import express from 'express';
import { isAdmin } from '/middlewares/checkAdmin';
import {
  deleteProduct,
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
} from '/controllers/product';

const productRouter = express.Router();

productRouter.get('/list', getProducts);
productRouter.get('/list/:id', getProduct);
productRouter.post('/save', isAdmin, saveProduct);
productRouter.put('/update/:id', isAdmin, updateProduct);
productRouter.delete('/delete/:id', isAdmin, deleteProduct);

export default productRouter;
