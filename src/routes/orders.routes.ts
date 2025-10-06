import { Router } from "express";
import { crearPedido } from "../controllers/orders.controller";

const router = Router();
router.post("/", crearPedido);
export default router;
