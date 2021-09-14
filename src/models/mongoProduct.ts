import { mongoProductsDBServ } from '/services/mongodb';
import { IntItem, MongoDocIntItem } from '/common/interfaces';
import { EnumErrorCodes } from '/common/enums';

class ProductsModel {
  async getAll(): Promise<MongoDocIntItem[]> {
    try {
      return mongoProductsDBServ.get();
    } catch (e) {
      throw { error: e, message: 'An error occurred when loading products.' };
    }
  }

  async get(id: string): Promise<MongoDocIntItem> {
    try {
      const product = await mongoProductsDBServ.get(id);
      return product[0];
    } catch (e) {
      throw { error: e, message: 'An error occurred when loading the product.' };
    }
  }

  async save(product: IntItem): Promise<MongoDocIntItem> {
    try {
      const newProduct = await mongoProductsDBServ.create(product);
      return newProduct;
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

  async update(id: string, product: IntItem): Promise<MongoDocIntItem> {
    try {
      const updatedProduct = await mongoProductsDBServ.update(id, product);

      if (updatedProduct) {
        return updatedProduct;
      } else {
        throw {
          error: `-${EnumErrorCodes.ProductNotFound}`,
          message: 'Product to be updated does not exist.',
        };
      }
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'Product could not be updated.' };
      } else {
        throw {
          error: e.error,
          message: e.message,
        };
      }
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deletedProduct = await mongoProductsDBServ.delete(id);
      if (!deletedProduct) {
        throw {
          error: `-${EnumErrorCodes.ProductNotFound}`,
          message: 'Product to be deleted does not exist.',
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

export const productsModel = new ProductsModel();