import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { isValidProduct } from 'utils/validations';
import { IntItem } from 'common/interfaces';
import { products } from 'persistence/product';
import { EnumErrorCodes } from 'common/enums';

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await productsModel.getAll();
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
    const product = await productsModel.get(req.params.id);
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
    
    product.id = uuidv4();
    product.price = Number(product.price);
    product.stock = Number(product.stock);
    product.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');

    isValidProduct(product);

    const newProduct: IntItem = await productsModel.save(product);
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
    const dataToUpdate = req.body;

    dataToUpdate.price = Number(dataToUpdate.price);
    dataToUpdate.stock = Number(dataToUpdate.stock);

    isValidProduct(dataToUpdate);

    const product = await productsModel.update(req.params.id, dataToUpdate);
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
    await productsModel.delete(req.params.id);
    res.json({ data: 'Product deleted.' });
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};
