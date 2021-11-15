import { IntItem, QueryIntItem } from 'common/interfaces/products';
import { ModelType } from 'common/enums';
import { ProductsModel } from 'models/memory/product';
import { ProductsModelFs } from 'models/fs/product';
import { ProductsModelFirebase } from 'models/firebase/product';
import { ProductsModelMongoDB } from 'models/mongodb/product';
import { ProductsModelMySQL } from 'models/mysql/product';

interface IntModel {
  get: (id?: string) => Promise<IntItem | IntItem[]>;
  save: (product: IntItem) => Promise<IntItem>;
  update: (id: string, product: IntItem) => Promise<IntItem>;
  delete: (id: string) => Promise<void>;
  query: (options: QueryIntItem) => Promise<IntItem | IntItem[]>;
}

export class ProductsModelFactory {
  static model(type: number): IntModel {
    switch (type) {
      case ModelType.fs:
        return new ProductsModelFs();
      case ModelType.mySql:
        return new ProductsModelMySQL('mysql');
      case ModelType.sqlite:
        return new ProductsModelMySQL('sqlite');
      case ModelType.localMongo:
      case ModelType.mongoAtlas:
        return new ProductsModelMongoDB();
      case ModelType.firebase:
        return new ProductsModelFirebase();
      default:
        return new ProductsModel();
    }
  }
}
