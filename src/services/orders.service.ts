import { Item, Size } from "../models/order.model";

const SIZE_FIJOS: Record<Size, number> = { S: 500, M: 700, L: 900 };
const TOPPING_PRECIO = 200;
const MAX_TOPPINGS = 5;

export class OrdersService {
  calcularPrecio(items: Item[]): number {
    let total = 0;
    for (const it of items) {
      const toppings = it.toppings?.length ?? 0;
      if (toppings > MAX_TOPPINGS) throw new Error("TOPPINGS MAXIMOS EXCEDIDOS");
      total += SIZE_FIJOS[it.size] + toppings * TOPPING_PRECIO;
    }
    return total;
  }

  _clear() {}
}

export default new OrdersService();
