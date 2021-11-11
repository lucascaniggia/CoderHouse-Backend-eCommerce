import { Document, Types, ObjectId, Model } from 'mongoose';

export interface IntObject {
  [key: string]: string | number | boolean | unknown;
}

export interface IntKnex {
  [key: string]: {
    client: string;
    connection: {
      host?: string;
      user?: string;
      password?: string;
      database?: string;
      filename?: string;
    };
    migrations?: {
      directory: string;
    };
    seeds?: {
      directory: string;
    };
    pool?: {
      min?: number;
      max?: number;
    };
    useNullAsDefault?: boolean;
  };
}

export interface BaseIntItem extends IntObject {
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
  _id: ObjectId;
}

export interface MongoModelIntItem extends Model<MongoDocIntItem> {
  get: (id?: string) => Promise<MongoDocIntItem[]>;
}

export interface IntCart extends IntObject, Document {
  id: string;
  user: Types.ObjectId;
  products: Types.ObjectId[];
}

export interface QueryIntItem extends IntObject {
  name?: string;
  code?: string;
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
}

export interface BaseIntUser extends IntObject {
  email: string;
  password: string;
  name: string;
  address: string;
  age: number;
  telephone: string;
  photo: string;
}

export interface IntUser extends BaseIntUser {
  id: string;
  isValidPassword: (password: string) => Promise<boolean>;
}

// export interface IntMessage {
//   _id: string;
//   email: string;
//   text: string;
//   date: string;
// }
