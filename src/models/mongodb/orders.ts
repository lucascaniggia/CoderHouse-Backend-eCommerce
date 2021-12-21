import mongoose from 'mongoose';
import { IOrder, IOrderBase } from 'common/interfaces/orders';

const Schema = mongoose.Schema;

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: 'ObjectId',
      ref: 'User',
    },
    products: [
      {
        _id: false,
        product: {
          type: 'ObjectId',
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: 'timestamp',
    },
  },
);

OrderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const OrdersModel = mongoose.model<IOrder>('Order', OrderSchema);

export class OrdersModelMongoDb {
  private ordersModel;

  constructor() {
    this.ordersModel = OrdersModel;
  }

  async save(userId: string, order: IOrderBase): Promise<IOrder> {
    const newOrder = new this.ordersModel({
      user: userId,
      ...order,
    });
    await newOrder.save();
    return (
      await newOrder.populate({
        path: 'products.product',
        select: 'name description price',
      })
    ).populate({
      path: 'user',
      select: 'name email',
    });
  }
}
