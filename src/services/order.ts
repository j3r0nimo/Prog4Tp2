/*El servicio tiene la logica (sin Express),
 y es donde se escriben los tests unitarios */

import { randomUUID } from "crypto";
/*función nativa de Node.js, genera un UUID (identificador único universal), para cada pedido.
 */
import { Order, OrderSize } from "../models/order";

export class OrderAlreadyDeliveredError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "OrderAlreadyDeliveredError";
  }
}
export class OrderNotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "OrderNotFoundError";
  }
}
export class OrderService {
  private orders: Order[] = [];

  create(order: Omit<Order, "id" | "price" | "status">): Order {
    const basePrices: Record<OrderSize, number> = { S: 500, M: 800, L: 1000 };
    const toppingPrice = 100;

    const newOrder: Order = {
      id: randomUUID(),
      size: order.size,
      toppings: order.toppings,
      address: order.address,
      status: "pending",
      price: basePrices[order.size] + order.toppings.length * toppingPrice,
    };

    this.orders.push(newOrder);
    return newOrder;
  }
  getAll(): Order[] {
    return this.orders;
  } // donde?

  getById(id: string): Order | undefined {
    return this.orders.find(o => o.id === id);
  }

  cancel(id: string): Order {
    const order = this.getById(id);
  if (!order) throw new OrderNotFoundError("No se encontro la orden");
if (order.status === 'delivered') throw new OrderAlreadyDeliveredError("el pedido ya se envio, no se puede cancelar");
  order.status = 'cancelled';
    return order;
  }

  getByStatus(status: Order["status"]): Order[] {
    return this.orders.filter(o => o.status === status); 
  }
  setStatus(id: string, status: Order["status"]) {
  const order = this.getById(id);
  if (order) order.status = status;
}



}
