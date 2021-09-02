import { Request, Response } from 'express';
import { cartModel } from 'models/cart';
import { EnumErrorCodes } from 'common/enums';

export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await cartModel.getAll();
    if (products.length !== 0) res.json({ data: products });
    else
      throw {
        error: `-${EnumErrorCodes.ProductNotFound}`,
        message: 'There is no products in cart.',
      };
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};

export const getCartProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await cartModel.get(req.params.id);
    if (product) res.json({ data: product });
    else
      throw {
        error: `-${EnumErrorCodes.ProductNotFound}`,
        message: 'Product does not exist on cart.',
      };
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};

export const saveCartProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newProduct = await cartModel.save(req.params.id);
    res.json({ data: newProduct });
  } catch (e) {
    res.status(400).json({ error: e.error, message: e.message });
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
    res.status(404).json({ error: e.error, message: e.message });
  }
};
