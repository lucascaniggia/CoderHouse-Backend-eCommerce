import { Document, Types } from 'mongoose';
import { IntObject } from './others';

export interface IntCart extends IntObject, Document {
  id: string;
  user: Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
}

export interface CartIntItem {
  product: string;
  quantity: number;
}
