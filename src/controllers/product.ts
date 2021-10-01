import { Request, Response } from 'express';
import { isValidProduct } from 'utils/validations';
import { IntItem, QueryIntItem } from 'common/interfaces';
import { productsAPI } from 'api/products';
import { NotFound } from 'errors';
import { isEmpty } from 'utils/others';

export const getProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!isEmpty(req.query)) {
    const { name, code, minPrice, maxPrice, minStock, maxStock } = req.query;
    const query: QueryIntItem = {};

    if (name) query.name = name.toString();
    if (code) query.code = code.toString();
    if (minPrice) query.minPrice = Number(minPrice);
    if (maxPrice) query.maxPrice = Number(maxPrice);
    if (minStock) query.minStock = Number(minStock);
    if (maxStock) query.maxStock = Number(maxStock);

    // res.json({
    //   data: await productsAPI.query(query),
    // });
  } else {
    const products = await productsAPI.get();
    if (products.length !== 0) res.json({ data: products });
    else throw new NotFound(404, 'There is no products!');
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const product = await productsAPI.get(req.params.id);
  if (product) res.json({ data: product });
  else throw new NotFound(404, 'Product not found.');
};

export const saveProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const product = req.body;

  product.price = Number(product.price);
  product.stock = Number(product.stock);

  isValidProduct(product);

  const newProduct = await productsAPI.save(product);
  res.json({ data: newProduct });
};

export const updateProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const dataToUpdate = req.body;

  dataToUpdate.price = Number(dataToUpdate.price);
  dataToUpdate.stock = Number(dataToUpdate.stock);

  isValidProduct(dataToUpdate);

  const product = await productsAPI.update(req.params.id, dataToUpdate);
  res.json({ data: product });
};

export const deleteProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  await productsAPI.delete(req.params.id);
  res.json({ data: 'Product deleted.' });
};
