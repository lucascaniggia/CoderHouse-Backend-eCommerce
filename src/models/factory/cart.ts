import { IntItem } from '/common/interfaces';
import { cartModel } from '/models/fs/cart';

interface IntModel {
  get: (id?: string) => Promise<IntItem | IntItem[]>
  save: (id: string) => Promise<IntItem>
  delete: (id: string) => Promise<IntItem[]>
}

const models = [cartModel];

export class CartModelFactory {
  public modelNumber: number;
  constructor(modelNumber: number) {
    this.modelNumber = modelNumber;
  }

  model(): IntModel {
    return models[this.modelNumber];
  }
}