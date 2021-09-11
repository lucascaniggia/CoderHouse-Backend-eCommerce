import { Request, Response } from 'express';
import { cartModel } from '/models/cart';
import { NotFound } from '/errors';

export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await cartModel.getAll();
    if (products.length !== 0) res.json({ data: products });
    else throw new NotFound('There is no products on cart.');
  } catch (e) {
    if (e instanceof NotFound) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(4040).json(e);
    }
  }
};

export const getCartProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await cartModel.get(req.params.id);
    if (product) res.json({ data: product });
    else throw new NotFound('Products does not exist on cart.');
  } catch (e) {
    if (e instanceof NotFound) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(404).json(e);
    }
  }
};

export const saveCartProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newProduct = await cartModel.save(req.params.id);
    res.json({ data: newProduct });
  } catch (e) {if (e instanceof NotFound) {
    res.status(400).json({ error: e.error, message: e.message });
  } else {
    res.status(404).json(e);
  }
  }
};

export const deleteCartProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newCartProductList = await cartModel.delete(req.params.id);
    res.json({ data: newCartProductList });
  } catch (e) {
    if (e instanceof NotFound) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(404).json(e);
    }
  }
};
