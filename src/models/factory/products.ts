import { IntItem, QueryIntItem } from 'common/interfaces';
import { ModelType } from 'common/enums';
import { ProductsModel } from 'models/memory/product';
import { ProductsModelFs } from 'models/fs/product';
import { ProductsModelFirebase } from 'models/firebase/product';
import { ProductsModelMongoDB } from 'models/mongodb/product';
import { ProductsModelMySQL } from 'models/mysql/product';
import { ProductsModelFaker } from 'models/faker/product';

interface IntModel {
  get: (id?: string) => Promise<IntItem | IntItem[]>;
  save: (product: IntItem) => Promise<IntItem>;
  update: (id: string, product: IntItem) => Promise<IntItem>;
  delete: (id: string) => Promise<void>;
  query?: (options: QueryIntItem) => Promise<IntItem | IntItem[]>;
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
        return new ProductsModelMongoDB('local');
      case ModelType.mongoAtlas:
        return new ProductsModelMongoDB('atlas');
      case ModelType.firebase:
        return new ProductsModelFirebase();
      case ModelType.faker:
        return new ProductsModelFaker();
      default:
        return new ProductsModel();
    }
  }
}
