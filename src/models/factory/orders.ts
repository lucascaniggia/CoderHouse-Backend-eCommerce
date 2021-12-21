import { ModelType } from 'common/enums';
import { IntOrder, BaseIntOrder } from 'common/interfaces/orders';
import { OrdersModelMongoDb } from 'models/mongodb/orders';

interface IntModel {
  save: (userId: string, data: BaseIntOrder) => Promise<IntOrder>;
  // get: (id?: string) => Promise<IntUser | IntUser[]>;
  // update: (id: string, userData: BaseIntUser) => Promise<IntUser>;
  // delete: (id: string) => Promise<void>;
  // query: (email: string) => Promise<IntUser>;
}

export class OrdersModelFactory {
  static model(type: number): IntModel {
    //TODO: add model types (sql, firebase, etc)
    switch (type) {
      case ModelType.localMongo:
      case ModelType.mongoAtlas:
        return new OrdersModelMongoDb();
      default:
        return new OrdersModelMongoDb();
    }
  }
}
