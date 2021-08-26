import { Request, Response } from 'express';
import { IntItem } from '../common/interfaces';
import { servicesProduct } from '../services/product';
import { EnumErrorCodes } from '../common/enums';

const {
  getServiceProducts,
  getServiceProduct,
  saveServiceProduct,
  updateServiceProduct,
  deleteServiceProduct,
} = servicesProduct;

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await getServiceProducts();
    if (products.length !== 0) res.json({ data: products });
    else
      throw {
        error: `-${EnumErrorCodes.ProductNotFound}`,
        message: 'There is no products on the list.',
      };
  } catch (e) {
    res.status(400).json({ error: e.error, message: e.message });
  }
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await getServiceProduct(req.params.id);
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
    const newProduct: IntItem = await saveServiceProduct(product);
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
    const product = await updateServiceProduct(req.params.id, req.body);
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
    const newProductList = await deleteServiceProduct(req.params.id);
    res.json({ data: newProductList });
  } catch (e) {
    res
      .status(400)
      .json({ error: e.error, message: e.message, description: e.description });
  }
};
