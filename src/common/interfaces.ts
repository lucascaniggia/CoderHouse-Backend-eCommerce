import { Document, ObjectId, Model } from 'mongoose';

export interface IntObject {
  [key: string]: string | number | boolean | unknown;
}

export interface BaseIntItem {
  name: string;
  description: string;
  code: string;
  price: number;
  photo: string;
  timestamp: string;
  stock: number;
}

export interface IntItem extends BaseIntItem, IntObject {
  id: string;
}

export interface MongoDocIntItem extends BaseIntItem, Document {
  _id: ObjectId
}

export interface MongoModelIntItem extends Model<MongoDocIntItem> {
  get: (id?: string) => Promise<MongoDocIntItem[]>
}

export interface IntMessage {
  email: string
  text: string
  date: string
}

export interface DocumentIntMessage extends Document {
  _id: ObjectId
}