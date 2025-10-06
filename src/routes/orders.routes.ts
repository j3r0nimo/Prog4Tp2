import { Router } from "express";
import { crearPedido, cancelOrder } from "../controllers/orders.controller";

const router = Router();
router.post("/", crearPedido);
router.post("/:id/cancel", cancelOrder);

export default router;
