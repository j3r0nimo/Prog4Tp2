import { Router } from "express";
import { createOrderSchema } from "../models/orderSchema";
import { OrderService } from "../services/order";
 
// funcion q recibe instancia del servicio
export default function ordersRouter(service: OrderService) {
  const router = Router(); 

// POST /orders
router.post("/", (req, res) => {
  try {
    const parsed = createOrderSchema.parse(req.body);
    const order =  req.app.locals.service.create(parsed); // uso app.locals para que todos los endpoints usen la misma instanvia de servucui
    res.status(201).json(order);
  } catch (err: any) {
    res.status(422).json({ error: err.message });
  }
});

// POST /orders/:id/cancel
router.post("/:id/cancel", (req, res) => {
  try {
    const order = req.app.locals.service.cancel(req.params.id);
    res.json(order);
  } catch (err: any) {
    const status = err.message.includes("delivered") ? 409 : 404;
    res.status(status).json({ error: err.message });
  }
});

// GET /orders/:id
router.get("/:id", (req, res) => {
  const order = req.app.locals.service.getById(req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: "no se encontro la orden" });
  }
})


  // GET /orders?status=pending ---
  router.get("/", (req, res) => {
       try {
      const { status } = req.query;
      const s = req.app.locals.service; 
      if (status) {
        const orders = s.getByStatus(status as any);
        return res.json(orders);
      }
      res.json(s.getAll());
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });


  return router;
}
