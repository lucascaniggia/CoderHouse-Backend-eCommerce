import { IntItem } from '/common/interfaces';
import { productsModel } from '../../models/fs/product';

interface IntModel {
  get: (id?: string) => Promise<IntItem | IntItem[]>
  save: (product: IntItem) => Promise<IntItem>
  update: (id: string, product: IntItem) => Promise<IntItem>
  delete: (id: string) => Promise<void>
}

const models = [productsModel];

export class ProductsModelFactory {
  public modelNumber: number;
  constructor(modelNumber: number) {
    this.modelNumber = modelNumber;
  }

  model(): IntModel {
    return models[this.modelNumber];
  }
}