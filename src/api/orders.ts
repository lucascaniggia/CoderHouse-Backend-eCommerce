import { BaseIntOrder } from 'common/interfaces/orders';
import { OrdersModelFactory } from 'models/factory/orders';
import { modelTypeToUse } from './modelType';

class OrdersAPI {
  private factory;

  constructor() {
    this.factory = OrdersModelFactory.model(modelTypeToUse);
  }

  async save(userId: string, order: BaseIntOrder) {
    const newOrder = await this.factory.save(userId, order);
    return newOrder;
  }
}

export const ordersAPI = new OrdersAPI();
