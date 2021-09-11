import moment from 'moment';
import mongoose from 'mongoose';

const productsCollection = 'productos';

const ProductSchema = new mongoose.Schema({
  name: { type: String, require: true, max: 100 },
  description: { type: String, require: true, max: 500 },
  code: { type: String, require: true, max: 14 },
  price: { type: Number, require: true, max: 5000 },
  photo: { type: String, require: true },
  timestamp: { type: String, default: moment().format('DD/MM/YYYY HH:mm:ss') },
  stock: { type: Number, default: 0 },
});

export const products = mongoose.model(productsCollection, ProductSchema);