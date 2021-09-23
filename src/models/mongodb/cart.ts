import Config from 'config';
import { IntItem, BaseIntItem } from 'common/interfaces';
import { productsModel } from 'models/mongodb/product';
import moment from 'moment';
import mongoose from 'mongoose';
import { NotFound } from 'errors';

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
  },
});

export class CartModelMongoDB {
  private dbURL: string;
  private cart;
  private products;
  constructor(type: 'local' | 'atlas') {
    this.cart = mongoose.model<BaseIntItem>('cart', ProductSchema);
    this.products = productsModel;
    if (type === 'local') {
      this.dbURL = 'mongodb://0.0.0.0:27017/ecommerce';
    } else {
      this.dbURL = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
    }
    mongoose
      .connect(this.dbURL)
      .then(() => {
        console.log('Mongo DB connected!');
      })
      .catch(e => console.log(e));
  }

  async get(id?: string): Promise<IntItem | IntItem[]> {
    try {
      let output: IntItem | IntItem[] = [];
      if (id) {
        const document = await this.cart.findById(id);
        if (document) output = document as unknown as IntItem;
        else throw new NotFound(404, 'Product does not exist on cart.');
      } else {
        const products = await this.cart.find();
        output = products as unknown as IntItem[];
      }
      return output;
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'Product not found.');
      } else {
        throw { error: e, message: 'An error occurred when loading products.' };
      }
    }
  }

  async save(id: string): Promise<IntItem> {
    try {
      const addedProduct = await this.products.findById(id);
      if (addedProduct) {
        const productJSON = addedProduct.toJSON();
        productJSON._id = productJSON.id;
        delete productJSON.id;

        const newProduct = await new this.cart(productJSON as IntItem);
        await newProduct.save();
        return newProduct as IntItem;
      } else {
        throw new NotFound(404, 'Product to add does not exist on cart.');
      }
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'Product to add does not exist on cart.');
      } else {
        throw { error: e, message: 'An error occurred when loading products.' };
      }
    }
  }

  async delete(id: string): Promise<IntItem[]> {
    try {
      await this.cart.findByIdAndRemove(id);
      const cartProducts = await this.get();
      return cartProducts as IntItem[];
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'Product to delete does not exist.');
      } else {
        throw { error: e, message: 'Product could not be deleted.' };
      }
    }
  }
}
