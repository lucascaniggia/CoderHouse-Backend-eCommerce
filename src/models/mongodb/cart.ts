import { IntItem, IntCart } from 'common/interfaces';
import { ProductsModel } from 'models/mongodb/product';
import { UserModel } from 'models/mongodb/user';
import { NotFound } from 'errors';
import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema<IntCart>({
  user: {
    type: 'ObjectId',
    ref: 'User',
  },
  products: [
    {
      type: 'ObjectId',
      ref: 'Product',
    },
  ],
});

CartSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const CartModel = mongoose.model<IntCart>('Cart', CartSchema);

export class CartModelMongoDB {
  private cartModel;
  private productsModel;
  private userModel;
  constructor() {
    this.cartModel = CartModel;
    this.productsModel = ProductsModel;
    this.userModel = UserModel;
  }

  async get(userEmail: string, id?: string): Promise<IntItem | IntItem[]> {
    try {
      let output: IntItem | IntItem[] = [];
      const user = (
        await this.userModel.find({
          email: userEmail,
        })
      )[0];
      const cart = await this.cartModel
        .findById(user.cart)
        .populate('products');
      if (cart && id) {
        const product = cart.products.find(item => item._id.toString() === id);
        if (product) output = product as unknown as IntItem;
        else throw new NotFound(404, 'Product does not exist on cart.');
      } else if (cart) {
        const products = cart.products;
        output = products as unknown as IntItem[];
      }
      return output;
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'Product not found.');
      } else {
        throw { error: e, message: 'An error occurred when loading products.' };
      }
    }
  }

  async save(id: string, userEmail: string): Promise<IntItem> {
    try {
      const user = (
        await this.userModel.find({
          email: userEmail,
        })
      )[0];
      const product = await this.productsModel.findById(id);

      if (product) {
        const cart = (await this.cartModel.findById(user.cart)) as IntCart;
        return cart as unknown as IntItem;
      }
      throw new NotFound(404, 'Product to add does not exist.');
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

  async delete(id: string, userEmail: string): Promise<IntItem[]> {
    try {
      const user = (
        await this.userModel.find({
          email: userEmail,
        })
      )[0];
      const cart = await this.cartModel
        .findById(user.cart)
        .populate('products');
      if (cart) {
        const productToDelete = cart.products.find(
          item => item._id.toString() === id,
        );
        if (productToDelete) {
          const newProductsInCart = cart.products.filter(
            item => item._id.toString() !== id,
          );
          cart.products = newProductsInCart;
          await cart.save();
          return newProductsInCart as unknown as IntItem[];
        }
        throw new NotFound(404, 'Product to delete does not exist on cart');
      }
      throw new NotFound(404, 'Cart does not exist.');
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'Product to delete does not exist.');
      } else {
        throw { error: e, message: 'Product could not be deleted.' };
      }
    }
  }
}
