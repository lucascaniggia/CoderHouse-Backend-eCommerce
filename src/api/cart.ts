import { CartModelFactory } from 'models/factory/cart';
import { modelTypeToUse } from './modelType';

class CartAPI {
  private factory;

  constructor() {
    this.factory = CartModelFactory.model(modelTypeToUse);
  }

  get(userEmail: string, id?: string) {
    if (id) return this.factory.get(userEmail, id);
    return this.factory.get(userEmail);
  }

  async save(id: string, userEmail: string) {
    const newProduct = await this.factory.save(id, userEmail);
    return newProduct;
  }

  delete(userEmail: string, id?: string) {
    if (id) return this.factory.delete(userEmail, id);
    return this.factory.delete(userEmail);
  }
}

export const cartAPI = new CartAPI();
