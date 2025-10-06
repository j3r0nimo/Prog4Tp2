import { Request, Response } from "express";
import { CrearPedidoSchema } from "../schemas/order.schema";
import OrdersService from "../services/orders.service";

export function crearPedido(req: Request, res: Response) {
  const parse = CrearPedidoSchema.safeParse(req.body);
  if (!parse.success)
    return res.status(422).json({ error: parse.error.flatten() });

  try {
    const order = {
      id: Date.now().toString(),
      precio: OrdersService.calcularPrecio(parse.data.items),
      items: parse.data.items,
      direccion: parse.data.direccion,
      status: "pending"
    };
    return res.status(201).json(order);
  } catch (err: any) {
    if (err.message === "TOPPINGS MAXIMOS EXCEDIDOS")
      return res.status(422).json({ error: "toppings maximos excedidos" });
    return res.status(500).json({ error: "error interno que pasa todo conocimiento humano y lo puede entender nada mas un ente omnipotente, omnisciente y omnipresente" });
  }
}
