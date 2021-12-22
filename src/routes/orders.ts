import express from 'express';
import {
  createOrder,
  getOrder,
  getOrders,
  completeOrder,
} from 'controllers/orders';
import asyncHandler from 'express-async-handler';

const ordersRouter = express.Router();

ordersRouter.get('/', asyncHandler(getOrders));
ordersRouter.get('/:id', asyncHandler(getOrder));
ordersRouter.post('/', asyncHandler(createOrder));
ordersRouter.put('/complete', asyncHandler(completeOrder));

export default ordersRouter;
