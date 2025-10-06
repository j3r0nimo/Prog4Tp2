import { describe, it, expect } from "vitest";
import request from "supertest";
import { makeApp } from "../../src/app";
import OrdersService from "../../src/services/orders.service";

const app = makeApp();

describe("POST /orders", () => {
  it("debe crear un pedido válido (201)", async () => {
    const res = await request(app)
      .post("/orders")
      .send({
        items: [{ size: "M", toppings: ["queso"] }],
        direccion: "Almafuerte 2003"
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

});
