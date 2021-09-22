import { Request, Response } from 'express';
import { isValidProduct } from 'utils/validations';
// import { productsModel } from '/models/mySqlProduct';
import { productsAPI } from 'api/products';
import { MissingFieldsProduct, NotFound, ProductValidation } from 'errors';


export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await productsAPI.get();
    if (products.length !== 0) res.json({ data: products });
    else throw new NotFound('There is no products!');
  } catch (e) {
    if (e instanceof NotFound) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(404).json(e);
    }
  }
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await productsAPI.get(req.params.id);
    if (product) res.json({ data: product });
    else throw new NotFound('Product not found.');
  } catch (e) {
    if (e instanceof NotFound) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(404).json(e);
    }
  }
};

export const saveProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = req.body;
    
    // product.id = uuidv4();
    product.price = Number(product.price);
    product.stock = Number(product.stock);
    // product.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');

    isValidProduct(product);

    const newProduct = await productsAPI.save(product);
    res.json({ data: newProduct });
  } catch (e) {
    if (e instanceof MissingFieldsProduct) {
      res.status(400).json({
        error: e.error,
        message: e.message,
        description: e.description,
      });
    } else if (e instanceof ProductValidation) {
      res.status(404).json({
        error: e.error,
        message: e.message,
      });
    } else {
      res.status(404).json(e);
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

    const product = await productsAPI.update(
      req.params.id,
      dataToUpdate
    );
    res.json({ data: product });
  } catch (e) {
    if (e instanceof MissingFieldsProduct) {
      res.status(400).json({
        error: e.error,
        message: e.message,
        description: e.description,
      });
    } else if (e instanceof ProductValidation) {
      res.status(400).json({
        error: e.error,
        message: e.message,
      });
    } else if (e instanceof NotFound) {
      res.status(404).json(e);
    }
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await productsAPI.delete(req.params.id);
    res.json({ data: 'Product deleted.' });
  } catch (e) {
    if (e instanceof NotFound) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(404).json(e);
    }
  }
};
