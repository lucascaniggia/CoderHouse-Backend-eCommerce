import mongoose from 'mongoose';
import { Product, Message } from 'models/schemas';
import { IntItem, MongoDocIntItem, IntMessage, DocumentIntMessage } from 'common/interfaces';

class MongoDB {
  private DbUrl: string;
  constructor() {
    this.DbUrl = 'mongodb://0.0.0.0:27017/ecommerce';
  }

  async init() {
    try {
      await mongoose.connect(this.DbUrl);
      console.log('Mongo DB connected successfully');
    } catch (e) {
      console.log(e);
    }
  }
}

class MongoProducts {
  async get(id?: string): Promise<MongoDocIntItem[]> {
    if (id) return await Product.find({ _id: id });
    return await Product.find({});
  }

  async create(data: IntItem): Promise<MongoDocIntItem> {
    const saveModel = await new Product(data);
    return await saveModel.save();
  }

  async update(id: string, data: IntItem): Promise<MongoDocIntItem> {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true, rawResult: true });
    return updatedProduct.value;
  }

  async delete(id: string) {
    return await Product.findByIdAndRemove(id);
  }
}

class MongoMessages {
  async get(id?: string): Promise<DocumentIntMessage[]> {
    if (id) return await Message.find({ _id: id });
    return await Message.find({});
  }

  async create(data: IntMessage): Promise<DocumentIntMessage> {
    const saveModel = await new Message(data);
    return await saveModel.save();
  }
}

export const mongoDBServ = new MongoDB();
export const mongoProductsDBServ = new MongoProducts();
export const mongoMessagesDBServ = new MongoMessages();