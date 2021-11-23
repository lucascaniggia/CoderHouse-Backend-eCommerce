import getProduct from './getProduct';
import getProducts from './getProducts';
import saveProduct from './saveProduct';
import updateProduct from './updateProduct';
import deleteProduct from './deleteProduct';

export default {
  '/products': {
    ...getProducts,
    ...saveProduct,
  },
  '/products/{id}': {
    ...getProduct,
    ...updateProduct,
    ...deleteProduct,
  },
};
