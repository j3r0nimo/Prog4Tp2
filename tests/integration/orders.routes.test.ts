import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { makeApp } from "../../src/app";
import OrdersService from "../../src/services/orders.service";

const app = makeApp();

describe("integracion de api- pedidos", () => {
  beforeEach(() => {
    OrdersService._clear();
  });

  it("debe crear un pedido válido (201)", async () => {
    const res = await request(app)
      .post("/orders")
      .send({
        items: [{ size: "M", toppings: ["queso"] }],
        direccion: "direccion 1234"
      });

    expect(res.status).toBe(201);
    expect(res.body.precio).toBeDefined();
  });
  it("retorna 409 si intenta cancelar un pedido entregado", async () => {
    const order = { id: "123", items: [], direccion: "Valida", status: "delivered" } as any;
    OrdersService._seed(order);
    const res = await request(app).post(`/orders/${order.id}/cancel`);
    expect(res.status).toBe(409);
  });

  it("debe devolver todos los pedidos (sin filtrar por status)", async () => {
    const o1 = OrdersService.create([{ size: "S" }], "Direccion valida 123");
    const o2 = OrdersService.create([{ size: "M" }], "Otra direccion valida");

    const res = await request(app).get("/orders");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);

    const ids = res.body.map((o: any) => o.id);
    expect(ids).toContain(o1.id);
    expect(ids).toContain(o2.id);

  });

  it("debe filtrar pedidos por estado si se pasa ", async () => {
    const o1 = OrdersService.create([{ size: "S" }], "Direcion 123");
    const o2 = OrdersService.create([{ size: "L" }], "Direccion 321");
    o2.status = "delivered";
    OrdersService._seed(o2);

    const res = await request(app).get("/orders").query({ status: "delivered" });
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].id).toBe(o2.id);
  });

});