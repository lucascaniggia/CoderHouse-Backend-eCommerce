import Config from '/config';
import { IntItem, BaseIntItem, MongoDocIntItem } from '/common/interfaces';
import moment from 'moment';
import mongoose from 'mongoose';
import { productsMock } from '/mocks/products';

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
  }
});

export class ProductsModelMongoDB {
  private dbURL: string;
  private products;
  constructor(type: 'local' | 'atlas') {
    this.products = mongoose.model<BaseIntItem>('products', ProductSchema);
    if (type === 'local') {
      this.dbURL = 'mongodb://0.0.0.0:27017/ecommerce';
    } else {
      this.dbURL = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DB}?retryWrites=true&w=majority`;
    }
    mongoose.connect(this.dbURL)
      .then(() => {
        console.log('Mongo DB connected!');
        this.get()
          .then((products) => {
            if (products.length === 0) {
              this.products.insertMany(productsMock)
                .then(() => console.log('Products added successfully'))
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }

  async get(id?: string): Promise<IntItem | IntItem[]> {
    let output: IntItem | IntItem[] = [];
    if (id) {
      const document = await this.products.find({ _id: id });
      if (document) output = ((document as unknown) as IntItem);
    } else {
      const products = await this.products.find();
      output = (products as unknown) as IntItem[];
    }
    return output;
  }

  async save(data: IntItem): Promise<IntItem> {
    const newProduct = await new this.products(data);
    await newProduct.save();
    return (newProduct as unknown) as IntItem;
  }

  async update(id: string, data: IntItem): Promise<IntItem> {
    const updatedProduct = await this.products.findByIdAndUpdate(id, data, { new: true, runValidators: true, rawResult: true });
    return (updatedProduct.value as unknown) as IntItem;
  }

  async delete(id: string): Promise<void> {
    await this.products.findByIdAndRemove(id);
  }
}