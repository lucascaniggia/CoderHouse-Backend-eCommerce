import fs, { promises as fsPromises } from 'fs';
import moment from 'moment';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { IntItem } from '../common/interfaces';
import { isValidProduct } from '../utils/validations';

const ProductsPath = path.resolve(__dirname, '../../products.json');
export class Products {
  async getProducts(): Promise<IntItem[]> {
    try {
      const products = await fsPromises.readFile(ProductsPath, 'utf-8');
      return JSON.parse(products);
    } catch (e) {
      throw { error: e, message: 'An error ocurred when loading products.' };
    }
  }

  async getProduct(id: string): Promise<IntItem> {
    try {
      const products = await fsPromises.readFile(ProductsPath, 'utf-8');
      const productsJSON = JSON.parse(products);
      const product = productsJSON.find((item: IntItem) => item.id === id);
      return product;
    } catch (e) {
      throw { error: e, message: 'An error ocurred when loading product.' };
    }
  }

  async saveProduct(product: IntItem): Promise<IntItem> {
    try {
      const products = await fsPromises.readFile(ProductsPath, 'utf-8');
      const productsJSON = JSON.parse(products);

      product.id = uuidv4();
      product.price = Number(product.price);
      product.stock = Number(product.stock);
      product.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');

      // check if all fields in product are valid and not empty
      isValidProduct(product);

      if (fs.existsSync(ProductsPath)) {
        productsJSON.push(product);
        await fsPromises.writeFile(
          ProductsPath,
          JSON.stringify(productsJSON, null, '\t')
        );
        return product;
      } else {
        throw new Error('Product could not be saved');
      }
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'Product could not be saved' };
      } else {
        throw {error: e.error, message: e.message};
      }
    }
  }

  async updateProduct(id: string, product: IntItem): Promise<IntItem> {
    try {
      const products = await fsPromises.readFile(ProductsPath, 'utf-8');
      const productsJSON = JSON.parse(products);

      product.price = Number(product.price);
      product.stock = Number(product.stock);

      // check if all fields in product are valid and not empty
      isValidProduct(product);

      let productToUpdate = productsJSON.find((item: IntItem) => item.id === id);
      productToUpdate = {
        ...productToUpdate,
        ...product,
      };

      const newProductList = productsJSON.filter(
        (item: IntItem) => item.id !== id
      );
      newProductList.push(productToUpdate);

      if (fs.existsSync(ProductsPath)) {
        await fsPromises.writeFile(
          ProductsPath,
          JSON.stringify(newProductList, null, '\t')
        );
        return productToUpdate;
      } else {
        throw new Error('Product could not be updated');
      }
    } catch (e) {
      if (e.code) {
        throw {
          error: e,
          message: 'Product could not be updated',
        };
      } else {
        throw {error: e.error, message: e.message};
      }
    }
  }

  async deleteProduct(id: string): Promise<IntItem> {
    try {
      const products = await fsPromises.readFile(ProductsPath, 'utf-8');
      const productsJSON = JSON.parse(products);

      const newProductList = productsJSON.filter(
        (item: IntItem) => item.id !== id
      );

      if (fs.existsSync(ProductsPath)) {
        await fsPromises.writeFile(
          ProductsPath,
          JSON.stringify(newProductList, null, '\t')
        );
        return newProductList;
      } else {
        throw new Error('Product could not be deleted');
      }
    } catch (e) {
      if (e.code) {
        throw {
          error: e,
          message: 'Product could not be deleted',
        };
      } else {
        throw Error(e.message);
      }
    }
  }
}