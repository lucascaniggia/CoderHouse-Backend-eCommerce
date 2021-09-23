import { Request, Response } from 'express';
// import { CartModelFactory } from '../models/factory/cart';
import { cartAPI } from 'api/cart';
import { NotFound } from 'errors';

// const factoryModel = new CartModelFactory(0);

export const getCart = async (req: Request, res: Response): Promise<void> => {
  const products = await cartAPI.get();
  if (products.length !== 0) res.json({ data: products });
  else throw new NotFound(404, 'There is no products on cart.');
};

export const getCartProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const product = await cartAPI.get(req.params.id);
  if (product) res.json({ data: product });
  else throw new NotFound(404, 'Products does not exist on cart.');
};

export const saveCartProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const newProduct = await cartAPI.save(req.params.id);
  res.json({ data: newProduct });
};

export const deleteCartProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const newCartProductList = await cartAPI.delete(req.params.id);
  res.json({ data: newCartProductList });
};
