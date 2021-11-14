import { IntCart } from 'common/interfaces/carts';
import { IntItem } from 'common/interfaces/products';
import { ProductsModel } from 'models/mongodb/product';
import { NotFound } from 'errors';
import mongoose from 'mongoose';
import { logger } from 'services/logger';

const CartSchema = new mongoose.Schema<IntCart>({
  user: {
    type: 'ObjectId',
    ref: 'User',
  },
  products: [
    {
      _id: false,
      product: {
        type: 'ObjectId',
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
      },
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
  constructor() {
    this.cartModel = CartModel;
    this.productsModel = ProductsModel;
  }

  async createCart(userId: string): Promise<IntCart> {
    const newCart = new this.cartModel({
      user: userId,
      products: [],
    });
    await newCart.save();
    return newCart;
  }

  async get(userId: string, productId?: string): Promise<IntItem[] | IntItem> {
    try {
      let output: IntItem | IntItem[] = [];

      const cart = await this.cartModel
        .findOne({ user: userId })
        .populate('products.product');

      if (cart && productId) {
        // if there's a productId in the request, search for that product in the cart
        const product = cart.products.find(
          item => item.product._id.toString() === productId,
        );
        // if the product is in the cart return that product, if not throw an error
        if (product) output = product as unknown as IntItem;
        else throw new NotFound(404, 'Product does not exist on cart.');
      } else if (cart) {
        // if there's no productId in the request return all the products in the cart
        output = cart.products as unknown as IntItem[];
      }
      return output;
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'Cart does not exist.');
      } else {
        throw { error: e, message: 'An error occurred when loading products.' };
      }
    }
  }

  async save(userId: string, productId: string): Promise<IntItem> {
    try {
      const product = await this.productsModel.findById(productId);

      if (product) {
        const cart = (await this.cartModel.findOne({
          user: userId,
        })) as IntCart;
        // Checks if product already in cart.
        const productInCartIndex = cart.products.findIndex(
          item => item.product._id.toString() === productId,
        );
        if (productInCartIndex) {
          logger.info('Item already in cart. Adding another unit.');
        }
        await cart.save();
        return cart as unknown as IntItem;
      }
      return product as unknown as IntItem;
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      }
      if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'Product or Cart to add does not exist');
      } else {
        throw { error: e, message: 'An error occurred when loading products.' };
      }
    }
  }

  async delete(userId: string, productId?: string): Promise<IntItem[]> {
    try {
      const cart = await this.cartModel
        .findOne({ user: userId })
        .populate('products.product');
      if (cart && productId) {
        const productInCartIndex = cart.products.findIndex(
          item => item.product._id.toString() === productId,
        );
        if (productInCartIndex !== -1) {
          // if the product is in the cart, check if there's more than 1 of that product, if so, decrease its quantity by 1, if not, remove the product from cart
          if (cart.products[productInCartIndex].quantity > 1)
            cart.products[productInCartIndex].quantity -= 1;
          else {
            const newProductsInCart = cart.products.filter(
              item => item.product._id.toString() !== productId,
            );
            cart.products = newProductsInCart;
          }
          await cart.save();
          return cart.products as unknown as IntItem[];
        }
        throw new NotFound(404, 'Product to delete does not exist on cart');
      }
      if (cart) {
        // if the cart exists but no productId is received, then delete all products
        cart.products = [];
        await cart.save();
        return cart.products as unknown as IntItem[];
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
