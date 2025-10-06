import { z } from "zod";

export const ItemSchema = z.object({
  size: z.enum(["S", "M", "L"]),
  toppings: z.array(z.string()).optional()
});

export const CrearPedidoSchema = z.object({
  items: z.array(ItemSchema).min(1, "items no puede estar vacio"),
  direccion: z.string().min(10, "direccion corta")
});

export type CreateOrderInput = z.infer<typeof CrearPedidoSchema>;
