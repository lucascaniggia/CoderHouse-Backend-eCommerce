import { mySqlDbServ } from '/services/mySqlDB';
import { IntItem } from '/common/interfaces';
import { EnumErrorCodes } from '/common/enums';

class ProductsModel {
  async getAll(): Promise<IntItem[]> {
    try {
      return mySqlDbServ.get('products');
    } catch (e) {
      throw { error: e, message: 'An error occurred when loading products.' };
    }
  }

  async get(id: number): Promise<IntItem> {
    try {
      const product = await mySqlDbServ.get('products', id);
      return product[0];
    } catch (e) {
      throw { error: e, message: 'An error occurred when loading the product.' };
    }
  }

  async save(product: IntItem): Promise<IntItem> {
    try {
      const newProduct = await mySqlDbServ.create('products', product);
      return newProduct[0];
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'Product could not be saved.' };
      } else {
        throw {
          error: e.error,
          message: e.message,
        };
      }
    }
  }

  async update(id: number, product: IntItem): Promise<IntItem> {
    try {
      const productUpdated = await mySqlDbServ.update('products', id, product);

      if (productUpdated[0]) {
        return productUpdated[0];
      } else {
        throw {
          error: `-${EnumErrorCodes.ProductNotFound}`,
          message: 'Product to update does not exist.',
        };
      }
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'An error occurred when updating the product.' };
      } else {
        throw {
          error: e.error,
          message: e.message,
        };
      }
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const productDeleted = await mySqlDbServ.delete('products', id);
      if (!productDeleted) {
        throw {
          error: `-${EnumErrorCodes.ProductNotFound}`,
          message: 'Product to delete does not exist.',
        };
      }
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'An error occurred when deleting the product.' };
      } else {
        throw { error: e.error, message: e.message };
      }
    }
  }
}

export const productsModel = new ProductsModel();