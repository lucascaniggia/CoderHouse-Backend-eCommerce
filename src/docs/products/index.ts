import getProducts from './getProducts';

export default {
  paths: {
    '/products': {
      ...getProducts,
    },
    '/products/{id}': {
      // ...getTodo,
      // ...updateTodo,
      // ...deleteTodo,
    },
  },
};
