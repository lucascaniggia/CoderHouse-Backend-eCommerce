import { Schema } from 'mongoose';
import { ProductDTO } from './products.dto';

export const ProductSchema = new Schema<ProductDTO>(
  {
    name: {
      type: String,
      require: true,
      maxLength: [100, 'Name must have 100 characters max'],
    },
    description: {
      type: String,
      require: true,
      maxLength: [500, 'Description must have 500 characters max'],
    },
    code: {
      type: String,
      require: true,
      maxLength: [14, 'Code must have 14 characters max'],
      unique: true,
    },
    price: {
      type: Number,
      require: true,
      max: [5000, 'Price cannot be higher than 5000'],
    },
    category: {
      type: String,
      require: true,
      maxLength: [20, 'Category must have 20 characters max'],
    },
    photo: { type: String, require: true },
    stock: { type: Number, default: 0 },
  },
  {
    timestamps: {
      createdAt: 'timestamp',
    },
  },
);