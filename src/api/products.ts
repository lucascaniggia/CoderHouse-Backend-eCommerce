import { IntItem } from 'common/interfaces';
import { ProductsModelFactory } from 'models/factory/products';
import { modelTypeToUse } from './modelType';

// const type = ModelType.firebase;

class ProductsAPI {
  private factory;

  constructor() {
    this.factory = ProductsModelFactory.model(modelTypeToUse);
  }

  async get(id?: string) {
    if (id) return await this.factory.get(id);
    return await this.factory.get();
  }

  async save(product: IntItem) {
    const newProduct = await this.factory.save(product);
    return newProduct;
  }

  async update(id: string, product: IntItem) {
    const updatedProduct = await this.factory.update(id, product);
    return updatedProduct;
  }

  async delete(id: string) {
    await this.factory.delete(id);
  }
}

export const productsAPI = new ProductsAPI();