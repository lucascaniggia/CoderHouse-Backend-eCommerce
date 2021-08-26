import { promises as fsPromises } from 'fs';
import path from 'path';
import { IntItem } from '../common/interfaces';
import { servicesProduct } from './product';
import { EnumErrorCodes } from '../common/enums';

const { getServiceProducts } = servicesProduct;

const cartPath = path.resolve(__dirname, '../../cart.json');

class Cart {
  async getServicesCart(): Promise<IntItem[]> {
    try {
      const cart = await fsPromises.readFile(cartPath, 'utf-8');
      return JSON.parse(cart).products;
    } catch (e) {
      throw { error: e, message: 'An error ocurred when loading cart.' };
    }
  }

  async getServicesCartProduct(id: string): Promise<IntItem> {
    try {
      const cart = await fsPromises.readFile(cartPath, 'utf-8');
      const products = JSON.parse(cart).products;
      const product = products.find((item: IntItem) => item.id === id);
      return product;
    } catch (e) {
      throw { error: e, message: 'An error ocurred when loading product.' };
    }
  }

  async saveServicesCartProduct(id: string): Promise<IntItem> {
    try {
      const allProducts = await getServiceProducts();
      const productToAdd = allProducts.find((item) => item.id === id);

      if (productToAdd) {
        const cart = await fsPromises.readFile(cartPath, 'utf-8');
        const cartJSON = JSON.parse(cart);
        cartJSON.products.push(productToAdd);
        await fsPromises.writeFile(
          cartPath,
          JSON.stringify(cartJSON, null, '\t')
        );
        return cartJSON.products;
      } else {
        throw {
          error: `-${EnumErrorCodes.ProductNotFound}`,
          message: 'Product to add does not exist.',
        };
      }
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'An error ocurred when saving product.' };
      } else {
        throw { error: e.error, message: e.message };
      }
    }
  }

  async deleteServicesCartProduct(id: string): Promise<IntItem[]> {
    try {
      const cart = await fsPromises.readFile(cartPath, 'utf-8');
      const cartJSON = JSON.parse(cart);
      const productToDelete = cartJSON.products.find(
        (item: IntItem) => item.id === id
      );

      if (productToDelete) {
        const productToDeleteIndex = cartJSON.products
          .filter((item: IntItem) => item.id !== id)
          .indexOf(id);
        cartJSON.products.splice(productToDeleteIndex, 1);
        await fsPromises.writeFile(
          cartPath,
          JSON.stringify(cartJSON, null, '\t')
        );
        return cartJSON.products;
      } else {
        throw {
          error: `-${EnumErrorCodes.ProductNotFound}`,
          message: 'Product to delete does not exist on cart.',
        };
      }
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'An error occurred when deleting product.' };
      } else {
        throw { error: e.error, message: e.message };
      }
    }
  }
}

export const servicesCart = new Cart();
