import { IntItem } from '/common/interfaces';
import { ModelType, ProductsModelFactory } from '/models/factory/products';

const type = ModelType.mongoAtlas;

class ProductsAPI {
  private factory;

  constructor() {
    this.factory = ProductsModelFactory.model(type);
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