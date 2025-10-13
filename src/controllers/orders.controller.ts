import { Request, Response } from "express";
import { CrearPedidoSchema } from "../schemas/order.schema";
import OrdersService from "../services/orders.service";

export function crearPedido(req: Request, res: Response) {
  const parse = CrearPedidoSchema.safeParse(req.body);
  if (!parse.success)
    return res.status(422).json({ error: parse.error.flatten() });

  try {
    // Usar el método create del servicio para que se guarde en el store
    const order = OrdersService.create(parse.data.items, parse.data.direccion);
    return res.status(201).json(order);
  } catch (err: any) {
    if (err.message === "TOPPINGS MAXIMOS EXCEDIDOS")
      return res.status(422).json({ error: "toppings maximos excedidos" });
    return res.status(500).json({ error: "error interno que pasa todo conocimiento humano y lo puede entender nada mas un ente omnipotente, omnisciente y omnipresente" });
  }
}

export function cancelarPedido(req: Request, res: Response) {
  try {
    const order = OrdersService.cancel(req.params.id);
    return res.json(order);
  } catch (err: any) {
    if (err.message === "NO_SE_PUEDE_CANCELAR_DELIVERED")
      return res.status(409).json({ error: "cancelar_delivered_es_imposible" });
    return res.status(404).json({ error: "no_esta" });
  }
}
export function listarPedidos(req: Request, res: Response) {
  const status = req.query.status as any;
  const data = OrdersService.list(status);
  return res.json(data);
}
export function cambiarStatus(req: Request, res: Response) {
    const order = OrdersService._setStatus(req.params.id, req.body.status);
    return res.json(order);
}
