import express from 'express';
import { createOrder } from 'controllers/orders';
import asyncHandler from 'express-async-handler';

const ordersRouter = express.Router();

ordersRouter.post('/', asyncHandler(createOrder));

export default ordersRouter;
