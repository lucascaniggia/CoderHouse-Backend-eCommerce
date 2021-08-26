import express from 'express';
import { isAdmin } from '../middlewares/checkAdmin';
import {
  deleteProduct,
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
} from '../persistence/product';

const productRoutes = express.Router();

productRoutes.get('/list', getProducts);
productRoutes.get('/list/:id', getProduct);
productRoutes.post('/save', isAdmin, saveProduct);
productRoutes.put('/update/:id', isAdmin, updateProduct);
productRoutes.delete('/delete/:id', isAdmin, deleteProduct);

export default productRoutes;
