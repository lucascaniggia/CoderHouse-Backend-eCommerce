import { promises as fsPromises } from 'fs';
import path from 'path';
import { IntItem } from 'common/interfaces';
import { EnumErrorCodes } from 'common/enums';
import { productsModel } from 'models/product';

const cartPath = path.resolve(__dirname, '../../cart.json');

class CartModel {
  async getAll(): Promise<IntItem[]> {
    try {
      const cart = await fsPromises.readFile(cartPath, 'utf-8');
      return JSON.parse(cart).products;
    } catch (e) {
      throw { error: e, message: 'An error occurred when loading cart.' };
    }
  }

  async get(id: string): Promise<IntItem> {
    try {
      const cart = await fsPromises.readFile(cartPath, 'utf-8');
      const products = JSON.parse(cart).products;
      const product = products.find((item: IntItem) => item.id === id);
      return product;
    } catch (e) {
      throw { error: e, message: 'An error occurred when loading product.' };
    }
  }

  async save(id: string): Promise<IntItem> {
    try {
      const allProducts = await productsModel.getAll();
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
        throw { error: e, message: 'An error occurred when saving product.' };
      } else {
        throw { error: e.error, message: e.message };
      }
    }
  }

  async delete(id: string): Promise<IntItem[]> {
    try {
      const cart = await fsPromises.readFile(cartPath, 'utf-8');
      const cartJSON = JSON.parse(cart);
      const productToDelete = cartJSON.products.find(
        (item: IntItem) => item.id === id
      );

      if (productToDelete) {
        const productToDeleteIndex = cartJSON.products
          .map((item: IntItem) => item.id)
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

export const cartModel = new CartModel();
