import { IntItem } from '/common/interfaces';
import { ModelType } from '/common/enums';
import { CartModel } from '/models/fs/cart';
import { CartModelMySQL } from '/models/mysql/cart';

interface IntModel {
  get: (id?: string) => Promise<IntItem | IntItem[]>
  save: (id: string) => Promise<IntItem>
  delete: (id: string) => Promise<IntItem[]>
}

// const models = [cartModel];

export class CartModelFactory {
  static model(type: number): IntModel {
    switch (type) {
      case ModelType.mySql:
        return new CartModelMySQL('mysql');
      case ModelType.sqlite:
        return new CartModelMySQL('sqlite');
      default:
        return new CartModel();
    }
  }
}