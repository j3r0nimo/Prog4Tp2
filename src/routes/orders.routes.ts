import { Router } from "express";
import { crearPedido, cancelarPedido } from "../controllers/orders.controller";

const router = Router();
router.post("/", crearPedido);
router.post("/:id/cancel", cancelarPedido);

export default router;
