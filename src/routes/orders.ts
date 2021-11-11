import express from 'express';
import { sendOrder } from 'controllers/orders';

const ordersRouter = express.Router();

ordersRouter.get('/', sendOrder);

export default ordersRouter;
