import { Router } from "express";
import { crearPedido, cancelarPedido, listarPedidos, cambiarStatus} from "../controllers/orders.controller";

const router = Router();
router.post("/", crearPedido);
router.get("/", listarPedidos);
router.post("/:id/cancel", cancelarPedido);
router.post("/:id/status", cambiarStatus);

export default router;
