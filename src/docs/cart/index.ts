import deleteCartProduct from './deleteCartProduct';
import deleteCartProducts from './deleteCartProducts';
import getCartProduct from './getCartProduct';
import getCartProducts from './getCartProducts';
import saveCartProduct from './saveCartProduct';
import updateCartProduct from './updateCartProduct';

export default {
  '/cart': {
    ...getCartProducts,
    ...updateCartProduct,
    ...deleteCartProducts,
  },
  '/cart/{id}': {
    ...getCartProduct,
    ...saveCartProduct,
    ...deleteCartProduct,
  },
};
