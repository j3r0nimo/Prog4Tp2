import { OrderService } from "../../src/services/order";
/*unit test, prueban logica del servicio */


describe("OrderService - cancelar", () => {
  it("deberia decir que no se encontro la orden", () => {
    const service = new OrderService();
    expect(() => service.cancel("fake-id")).toThrow("No se encontro la orden");
  });

  it("deberia decir que no se puede cancelar, el pedido ya se envio", () => {
    const service = new OrderService();
    const order = service.create({
      size: "M",
      toppings: [],
      address: "Calle Larga 1234",
    });
    order.status = "delivered";

    expect(() => service.cancel(order.id)).toThrow("el pedido ya se envio, no se puede cancelar");
  });
});

describe("OrderService - get methods", () => {
  it("getById deberia retornar undefined si no se encuentra", () => {
    const service = new OrderService();
    expect(service.getById("fake-id")).toBeUndefined();
  });

  it("getByStatus deberia filtrar por status", () => {
    const service = new OrderService();
    const o1 = service.create({ size: "S", toppings: [], address: "Calle 1" });
    const o2 = service.create({ size: "M", toppings: [], address: "Calle 2" });
    o2.status = "cancelled";
    o1.status = "pending";

    const pending = service.getByStatus("pending");
    const cancelled = service.getByStatus("cancelled");

    expect(pending).toHaveLength(1);
    expect(cancelled).toHaveLength(1);
    expect(cancelled[0].id).toBe(o2.id);
  });
});