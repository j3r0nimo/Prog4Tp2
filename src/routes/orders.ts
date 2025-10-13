import { Router } from "express";
import { createOrderSchema } from "../models/orderSchema";
import { OrderService, OrderAlreadyDeliveredError, OrderNotFoundError } from "../services/order";

export default function ordersRouter(service: OrderService) {
  const router = Router();

  // POST /orders
  router.post("/", (req, res) => {
    try {
      const parsed = createOrderSchema.parse(req.body);
      const order = service.create(parsed);
      res.status(201).json(order);
    } catch (err: any) {
      res.status(422).json({ error: err.message });
    }
  });

  // POST /orders/:id/cancel
  router.post("/:id/cancel", (req, res) => {
    try {
      const order = service.cancel(req.params.id);
      res.json(order);
    } catch (e) {
      if (e instanceof OrderAlreadyDeliveredError)
        return res.status(409).json({ error: "Order already delivered" });
      if (e instanceof OrderNotFoundError)
        return res.status(404).json({ error: "Order not found" });
      res.status(500).json({ error: "internal error" });
    }
  });

  // GET /orders/:id
  router.get("/:id", (req, res) => {
    const order = service.getById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "no se encontro la orden" });
    }
  });

  // GET /orders?status=pending
  router.get("/", (req, res) => {
    try {
      const { status } = req.query;
      if (status) {
        const orders = service.getByStatus(status as any);
        return res.json(orders);
      }
      res.json(service.getAll());
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}