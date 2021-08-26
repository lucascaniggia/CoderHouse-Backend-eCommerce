import { promises as fsPromises } from 'fs';
import moment from 'moment';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { IntItem } from '../common/interfaces';
import { EnumErrorCodes } from '../common/enums';
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

      productsJSON.push(product);
      await fsPromises.writeFile(
        productsPath,
        JSON.stringify(productsJSON, null, '\t')
      );
      return product;
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'Product could not be saved' };
      } else {
        throw {
          error: e.error,
          description: e.description,
          message: e.message,
        };
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

      let productToUpdate = productsJSON.find(
        (item: IntItem) => item.id === id
      );
      if (productToUpdate) {
        productToUpdate = {
          ...productToUpdate,
          ...product,
        };

        const productToUpdateIndex = productsJSON
          .map((item: IntItem) => item.id)
          .indexOf(id);
        productsJSON.splice(productToUpdateIndex, 1, productToUpdate);

        await fsPromises.writeFile(
          productsPath,
          JSON.stringify(productsJSON, null, '\t')
        );
        return productToUpdate;
      } else {
        throw {
          error: `-${EnumErrorCodes.ProductNotFound}`,
          message: 'Product to update does not exist.',
        };
      }
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'Product could not be updated.' };
      } else {
        throw { error: e.error, message: e.message };
      }
    }
  }

  async deleteServiceProduct(id: string): Promise<IntItem> {
    try {
      const products = await fsPromises.readFile(productsPath, 'utf-8');
      const productsJSON = JSON.parse(products);

      const productToDelete = productsJSON.find(
        (item: IntItem) => item.id === id
      );

      if (productToDelete) {
        const newProductList = productsJSON.filter(
          (item: IntItem) => item.id !== id
        );

        await fsPromises.writeFile(
          productsPath,
          JSON.stringify(newProductList, null, '\t')
        );
        return newProductList;
      } else {
        throw {
          error: `-${EnumErrorCodes.ProductNotFound}`,
          message: 'Product to delete does not exist.',
        };
      }
    } catch (e) {
      if (e.code) {
        throw {
          error: e,
          message: 'Product could not be deleted',
        };
      } else {
        throw { error: e.error, message: e.message };
      }
    }
  }
}

export const servicesProduct = new Products();
