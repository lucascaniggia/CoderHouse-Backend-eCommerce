import getOrders from './getOrders';
import getOrder from './getOrder';
import createOrder from './createOrder';
import completeOrder from './completedOrder';

export default {
  '/orders': {
    ...getOrders,
    ...createOrder,
  },
  '/orders/{id}': {
    ...getOrder,
  },
  '/orders/complete': {
    ...completeOrder,
  },
};
