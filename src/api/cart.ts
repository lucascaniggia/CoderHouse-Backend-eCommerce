import { CartModelFactory } from 'models/factory/cart';
import { modelTypeToUse } from './modelType';

class CartAPI {
  private factory;

  constructor() {
    this.factory = CartModelFactory.model(modelTypeToUse);
  }

  get(id?: string) {
    if (id) return this.factory.get(id);
    return this.factory.get();
  }

  async save(id: string) {
    const newProduct = await this.factory.save(id);
    return newProduct;
  }

  async delete(id: string) {
    return this.factory.delete(id);
  }
}

export const cartAPI = new CartAPI();