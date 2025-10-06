import { describe, it, expect, beforeEach } from "vitest";
import OrdersService from "../../src/services/orders.service";

describe("OrdersService_Crear pedido", () => {
  beforeEach(() => OrdersService._clear());

  it("debe calcular el precio correctamente según tamaño y toppings", () => {
    const items = [
      { size: "S", toppings: ["queso", "jamon"] },
      { size: "L", toppings: ["aceitunas"] }
    ] as any;

    const price = OrdersService.calcularPrecio(items);
    expect(price).toBe(500 + 2 * 200 + 900 + 200); // tendria que dar 2000, si no entonces llueve fuego y eso no creo que es bueno
  });

  it("no debe permitir cancelar un pedido entregado", () => {
    const order = { id: "1", items: [], direccion: "Valida", status: "delivered" } as any;
    OrdersService._seed(order);
    expect(() => OrdersService.cancel(order.id)).toThrow("NO_SE_PUEDE_CANCELAR_DELIVERED");
  });

});
