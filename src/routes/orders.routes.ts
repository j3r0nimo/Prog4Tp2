import { Router } from "express";
import { crearPedido, cancelarPedido, listarPedidos } from "../controllers/orders.controller";

const router = Router();
router.post("/", crearPedido);
router.get("/", listarPedidos);
router.post("/:id/cancel", cancelarPedido);

export default router;
