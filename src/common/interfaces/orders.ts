import { Types, Document } from 'mongoose';
import { CartIntItem } from './cart';

export interface BaseIntOrder {
  products: CartIntItem[];
  status: 'placed' | 'completed';
  total: number;
  shippingAddress: string;
  postalCode: string;
}

export interface IntOrder extends BaseIntOrder, Document {
  id: string;
  user: Types.ObjectId;
}
