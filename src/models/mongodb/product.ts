import { IntItem, BaseIntItem, QueryIntItem } from 'common/interfaces';
import moment from 'moment';
import mongoose, { FilterQuery } from 'mongoose';
import { NotFound } from 'errors';
import { productsMock } from 'mocks/products';

const ProductSchema = new mongoose.Schema<BaseIntItem>({
  name: { type: String, require: true, max: 100 },
  description: { type: String, require: true, max: 100 },
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

export const productsModel = mongoose.model<BaseIntItem>(
  'products',
  ProductSchema,
);

export class ProductsModelMongoDB {
  private products;
  constructor() {
    this.products = productsModel;
    this.get()
      .then(products => {
        if (products.length === 0) {
          this.products
            .insertMany(productsMock)
            .then(() => console.log('Products added successfully.'))
            .catch(e => console.log(e));
        }
      })
      .catch(e => console.log(e));
  }

  async get(id?: string): Promise<IntItem | IntItem[]> {
    try {
      let output: IntItem | IntItem[] = [];
      if (id) {
        const document = await this.products.find({ _id: id });
        if (document) output = document as unknown as IntItem;
      } else {
        const products = await this.products.find();
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

  async save(data: IntItem): Promise<IntItem> {
    const newProduct = await new this.products(data);
    await newProduct.save();
    return newProduct as unknown as IntItem;
  }

  async update(id: string, data: IntItem): Promise<IntItem> {
    try {
      const updatedProduct = await this.products.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        rawResult: true,
      });
      return updatedProduct.value as unknown as IntItem;
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'Product to update does not exist.');
      } else {
        throw { error: e, message: 'Product could not be updated.' };
      }
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.products.findByIdAndRemove(id);
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'Product to delete does not exist.');
      } else {
        throw { error: e, message: 'Product could not be deleted.' };
      }
    }
  }

  async query(options: QueryIntItem): Promise<IntItem[]> {
    const query: FilterQuery<BaseIntItem> = {};

    if (options.name) query.name = options.name;

    if (options.code) query.code = options.code;

    if (options.minPrice && options.maxPrice) {
      query.price = {
        $gte: options.minPrice,
        $lte: options.maxPrice,
      };
    } else if (options.minPrice) {
      query.price = { $gte: options.minPrice };
    } else if (options.maxPrice) {
      query.price = { $lte: options.maxPrice };
    }

    if (options.minStock && options.maxStock) {
      query.stock = {
        $gte: options.minStock,
        $lte: options.maxStock,
      };
    } else if (options.minStock) {
      query.stock = { $gte: options.minStock };
    } else if (options.maxStock) {
      query.stock = { $lte: options.maxStock };
    }

    const products = await this.products.find(query);

    return products as IntItem[];
  }
}
