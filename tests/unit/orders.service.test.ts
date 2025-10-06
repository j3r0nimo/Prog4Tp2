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

  it("debe listar todos los pedidos", () => {
    const o1 = { id: "1", status: "pending" } as any;
    const o2 = { id: "2", status: "delivered" } as any;
    OrdersService._seed(o1);
    OrdersService._seed(o2);

    const result = OrdersService.list(); // sin filtro
    expect(result.length).toBe(2);
  });

});
