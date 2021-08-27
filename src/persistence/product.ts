import { promises as fsPromises } from 'fs';
import moment from 'moment';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { IntItem } from '../common/interfaces';
import { EnumErrorCodes } from '../common/enums';
import { isValidProduct } from '../utils/validations';

const productsPath = path.resolve(__dirname, '../../products.json');

class Products {
  async getProductsPersist(): Promise<IntItem[]> {
    try {
      const products = await fsPromises.readFile(productsPath, 'utf-8');
      return JSON.parse(products);
    } catch (e) {
      throw { error: e, message: 'An error occurred when loading products.' };
    }
  }

  async getProductPersist(id: string): Promise<IntItem> {
    try {
      const products = await fsPromises.readFile(productsPath, 'utf-8');
      const productsJSON = JSON.parse(products);
      const product = productsJSON.find((item: IntItem) => item.id === id);
      return product;
    } catch (e) {
      throw { error: e, message: 'An error occurred when loading product.' };
    }
  }

  async saveProductPersist(product: IntItem): Promise<IntItem> {
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
        throw { error: e, message: 'Product could not be saved.' };
      } else {
        throw {
          error: e.error,
          description: e.description,
          message: e.message,
        };
      }
    }
  }

  async updateProductPersist(id: string, product: IntItem): Promise<IntItem> {
    try {
      const products = await fsPromises.readFile(productsPath, 'utf-8');
      const productsJSON = JSON.parse(products);

      product.price = Number(product.price);
      product.stock = Number(product.stock);

      // check if not empty and valid fields in Product
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
        throw { error: e, message: 'An error occurred when updating product.' };
      } else {
        throw {
          error: e.error,
          description: e.description,
          message: e.message,
        };
      }
    }
  }

  async deleteProductPersist(id: string): Promise<void> {
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
      } else {
        throw {
          error: `-${EnumErrorCodes.ProductNotFound}`,
          message: 'Product to delete does not exist.',
        };
      }
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'Product could not be deleted.' };
      } else {
        throw { error: e.error, message: e.message };
      }
    }
  }
}

export const products = new Products();
