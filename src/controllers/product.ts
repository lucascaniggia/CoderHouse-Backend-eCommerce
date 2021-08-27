import { Request, Response } from 'express';
import { IntItem } from '../common/interfaces';
import { products } from '../persistence/product';
import { EnumErrorCodes } from '../common/enums';

const {
  getProductsPersist,
  getProductPersist,
  saveProductPersist,
  updateProductPersist,
  deleteProductPersist,
} = products;

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await getProductsPersist();
    if (products.length !== 0) res.json({ data: products });
    else
      throw {
        error: `-${EnumErrorCodes.ProductNotFound}`,
        message: 'There is no products.',
      };
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await getProductPersist(req.params.id);
    if (product) res.json({ data: product });
    else
      throw {
        error: `-${EnumErrorCodes.ProductNotFound}`,
        message: 'Product not found.',
      };
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};

export const saveProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = req.body;
    const newProduct: IntItem = await saveProductPersist(product);
    res.json({ data: newProduct });
  } catch (e) {
    if (e.error.errno) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(400).json({
        error: e.error,
        message: e.message,
        description: e.description,
      });
    }
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await updateProductPersist(req.params.id, req.body);
    res.json({ data: product });
  } catch (e) {
    if (e.error.errno) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(400).json({
        error: e.error,
        message: e.message,
        description: e.description,
      });
    }
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await deleteProductPersist(req.params.id);
    res.json({ data: 'Product deleted.' });
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};
