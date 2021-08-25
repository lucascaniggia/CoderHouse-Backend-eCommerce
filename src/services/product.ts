import fs, { promises as fsPromises } from 'fs';
import moment from 'moment';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { IntItem } from '../common/interfaces';
import { isValidProduct } from '../utils/validations';

const productsPath = path.resolve(__dirname, '../../products.json');
class Products {
  async getServiceProducts(): Promise<IntItem[]> {
    try {
      const products = await fsPromises.readFile(productsPath, 'utf-8');
      return JSON.parse(products);
    } catch (e) {
      throw { error: e, message: 'An error ocurred when loading products.' };
    }
  }

  async getServiceProduct(id: string): Promise<IntItem> {
    try {
      const products = await fsPromises.readFile(productsPath, 'utf-8');
      const productsJSON = JSON.parse(products);
      const product = productsJSON.find((item: IntItem) => item.id === id);
      return product;
    } catch (e) {
      throw { error: e, message: 'An error ocurred when loading product.' };
    }
  }

  async saveServiceProduct(product: IntItem): Promise<IntItem> {
    try {
      const products = await fsPromises.readFile(productsPath, 'utf-8');
      const productsJSON = JSON.parse(products);

      product.id = uuidv4();
      product.price = Number(product.price);
      product.stock = Number(product.stock);
      product.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');

      // check if all fields in product are valid and not empty
      isValidProduct(product);

      if (fs.existsSync(productsPath)) {
        productsJSON.push(product);
        await fsPromises.writeFile(
          productsPath,
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

  async updateServiceProduct(id: string, product: IntItem): Promise<IntItem> {
    try {
      const products = await fsPromises.readFile(productsPath, 'utf-8');
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

      const productToUpdateByIndex = productsJSON.map(
        (item: IntItem) => item.id).indexOf(id);
        productsJSON.splice(productToUpdateByIndex, 1, productToUpdate);

      if (fs.existsSync(productsPath)) {
        await fsPromises.writeFile(
          productsPath,
          JSON.stringify(productsJSON, null, '\t')
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

  async deleteServiceProduct(id: string): Promise<IntItem> {
    try {
      const products = await fsPromises.readFile(productsPath, 'utf-8');
      const productsJSON = JSON.parse(products);

      const newProductList = productsJSON.filter(
        (item: IntItem) => item.id !== id
      );

      if (fs.existsSync(productsPath)) {
        await fsPromises.writeFile(
          productsPath,
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

export const servicesProduct = new Products;