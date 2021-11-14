import { IntItem } from 'common/interfaces/products';
import { IntCart } from 'common/interfaces/carts';
import { ModelType } from 'common/enums';
import { CartModel } from 'models/memory/cart';
import { CartModelFs } from 'models/fs/cart';
import { CartModelMySQL } from 'models/mysql/cart';
import { CartModelMongoDB } from 'models/mongodb/cart';
import { CartModelFirebase } from 'models/firebase/cart';

interface IntModel {
  get: (id?: string) => Promise<IntItem | IntItem[]>;
  save: (id: string) => Promise<IntItem>;
  delete: (id: string) => Promise<IntItem[]>;
}

interface MongoIntModel {
  createCart: (userId: string) => Promise<IntCart>;
  get: (userId: string, productId?: string) => Promise<IntItem | IntItem[]>;
  save: (userId: string, productId: string) => Promise<IntItem>;
  delete: (userId: string, productId?: string) => Promise<IntItem[]>;
}

type IntModelType = IntModel | MongoIntModel;

export class CartModelFactory {
  static model(type: number): IntModelType {
    switch (type) {
      case ModelType.fs:
        return new CartModelFs();
      case ModelType.mySql:
        return new CartModelMySQL('mysql');
      case ModelType.sqlite:
        return new CartModelMySQL('sqlite');
      case ModelType.localMongo:
      case ModelType.mongoAtlas:
        return new CartModelMongoDB();
      case ModelType.firebase:
        return new CartModelFirebase();
      default:
        return new CartModel();
    }
  }
}
