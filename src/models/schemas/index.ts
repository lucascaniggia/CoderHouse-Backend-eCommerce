import { BaseIntItem, IntMessage } from '../../common/interfaces';
import moment from 'moment';
import mongoose from 'mongoose';

const productsCollection = 'products';
const messagesCollection = 'messages';

const ProductSchema = new mongoose.Schema<BaseIntItem>({
  name: { type: String, require: true, max: 100 },
  description: { type: String, require: true, max: 500 },
  code: { type: String, require: true, max: 14 },
  price: { type: Number, require: true, max: 5000 },
  photo: { type: String, require: true },
  timestamp: { type: String, default: moment().format('DD/MM/YYYY HH:mm:ss') },
  stock: { type: Number, default: 0 },
});

ProductSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const MessageSchema = new mongoose.Schema<IntMessage>({
  email: { type: String, require: true, max: 100 },
  text: { type: String, require: true },
  date: { type: String, default: moment().format('DD/MM/YYYY HH:mm:ss') },
});

MessageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export const Product = mongoose.model<BaseIntItem>(productsCollection, ProductSchema);
export const Message = mongoose.model<IntMessage>(messagesCollection, MessageSchema);