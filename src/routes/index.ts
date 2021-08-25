import express, { Request, Response } from 'express';
import { IntItem } from '../common/interfaces';
import { isAdmin } from '../middlewares/checkAdmin';
import { Products } from '../services/product';
import { permissionError } from '../utils/others';

const routes = express.Router();

const {
  getProducts,
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
} = new Products();

routes.get(
  '/products/list',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await getProducts();
      if (products.length !== 0) res.json({ data: products });
      else throw new Error('No hay products');
    } catch (e) {
      res.status(400).json({ error: e.error, message: e.message });
    }
  }
);

routes.get(
  '/products/list/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await getProduct(req.params.id);
      if (product) res.json({ data: product });
      else throw new Error('Product not found');
    } catch (e) {
      res.status(400).json({ error: e.error, message: e.message });
    }
  }
);

routes.post(
  '/products/save', isAdmin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.admin) {
        const product = req.body;
        const newProduct: IntItem = await saveProduct(product);
        res.json({ data: newProduct });
      } else {
        permissionError(req);
      }
    } catch (e) {
      res.status(400).json({ error: e.error, message: e.message, description: e.description });
    }
  }
);

routes.put(
  '/products/update/:id', isAdmin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.admin) {
        const product = await updateProduct(req.params.id, req.body);
        res.json({ data: product });
      } else {
        permissionError(req);
      }
    } catch (e) {
      res.status(400).json({ error: e.error, message: e.message, description: e.description });
    }
  }
);

routes.delete(
  '/products/delete/:id', isAdmin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.admin) {
        await deleteProduct(req.params.id);
        const products = await getProducts();
        res.json({ data: products });
      } else {
        permissionError(req);
      }
    } catch (e) {
      res.status(400).json({ error: e.error, message: e.message, description: e.description });
    }
  }
);

export default routes;