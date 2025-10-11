import express from 'express';
import { ordersRouter } from './routes/orderRoutes';

export function makeApp() {
  const app = express();
  app.use(express.json());
  app.use(ordersRouter);

  return app;
}