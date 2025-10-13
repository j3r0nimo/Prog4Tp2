import express from "express";
import ordersRouter from "./routes/orders";
import { OrderService } from "./services/order";

export function makeApp() {
  const app = express();
  app.use(express.json());

  // misma instancia compartida
  const service = new OrderService();
  app.locals.service = service;

  app.use("/orders", ordersRouter(service));
  return app;
}