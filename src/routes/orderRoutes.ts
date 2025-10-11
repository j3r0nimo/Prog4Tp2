import { Router } from 'express';
import {
  createOrderHandler,
  getOrderHandler,
  cancelOrderHandler,
  listOrdersHandler
} from '../controllers/orderController';
import { validateBody, CreateOrderSchema } from '../schemas/orderSchemas';

export const ordersRouter = Router();

// POST /orders crear orden
ordersRouter.post('/orders', validateBody(CreateOrderSchema), createOrderHandler);

// GET /order/:id obtener una orden específica
ordersRouter.get('/order/:id', getOrderHandler);

// POST /orders/:id/cancel cancelar una orden
ordersRouter.post('/orders/:id/cancel', cancelOrderHandler);

// GET /orders?status= listar o filtrar por estado
ordersRouter.get('/orders', listOrdersHandler);