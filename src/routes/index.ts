import express, { Request, Response } from 'express';
import { IntItem } from '../common/interfaces';
import { Products } from '../services/product';

const routes = express.Router();

const {
  getProducts,
  getProduct,
  saveProduct,
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
  '/products/save',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const product = req.body;
      const newProduct: IntItem = await saveProduct(product);
      res.json({ data: newProduct });
    } catch (e) {
      res.status(400).json({ error: e.error, message: e.message });
    }
  }
);

export default routes;