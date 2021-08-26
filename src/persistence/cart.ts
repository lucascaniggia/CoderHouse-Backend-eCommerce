import { Request, Response } from 'express';
import { servicesCart } from '../services/cart';
import { EnumErrorCodes } from '../common/enums';

const {
  getServicesCart,
  getServicesCartProduct,
  saveServicesCartProduct,
  deleteServicesCartProduct,
} = servicesCart;

export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getServicesCart();
    if (products.length !== 0) res.json({ data: products });
    else
      throw {
        error: `-${EnumErrorCodes.ProductNotFound}`,
        message: 'There is no products on cart.',
      };
  } catch (e) {
    res.status(400).json({ error: e.error, message: e.message });
  }
};

export const getCartProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await getServicesCartProduct(req.params.id);
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
    const newProduct = await saveServicesCartProduct(req.params.id);
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
    const newCartProductList = await deleteServicesCartProduct(req.params.id);
    res.json({ data: newCartProductList });
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};
