import { IntItem } from '/common/interfaces';
import { ProductsModel } from '../../models/fs/product';
import { ProductsModelMySQL } from '/models/mysql/product';
// import { ProductsModelSQLite } from '/models/sqlite/product';

interface IntModel {
  get: (id?: string) => Promise<IntItem | IntItem[]>
  save: (product: IntItem) => Promise<IntItem>
  update: (id: string, product: IntItem) => Promise<IntItem>
  delete: (id: string) => Promise<void>
}

export enum ModelType {
  fs = 1,
  mySql,
  sqlite,
  localMongo,
  mongoAtlas,
  firebase
}

export class ProductsModelFactory {
  static model(type: number): IntModel {
    switch (type) {
      case ModelType.mySql:
        return new ProductsModelMySQL('mysql');
      case ModelType.sqlite:
        return new ProductsModelMySQL('sqlite');
      default:
        return new ProductsModel();
    }
  }
}