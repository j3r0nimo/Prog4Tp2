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
        address: "Calle Falsa 1234"
      });

    expect(res.status).toBe(201);
    expect(res.body.price).toBeDefined();
  });
  it("retorna 409 si intenta cancelar un pedido entregado", async () => {
    const order = { id: "123", items: [], direccion: "Valida", status: "delivered" } as any;
    OrdersService._seed(order);
    const res = await request(app).post(`/orders/${order.id}/cancel`);
    expect(res.status).toBe(409);
  });

  it("debe listar todos los pedidos existentes (200)", async () => {
    // crear algunos pedidos en memoria antes de hacer el GET
    OrdersService.create([{ size: "S" }], "Direccion 123456");
    OrdersService.create([{ size: "M", toppings: ["jamon"] }], "Otra direccion 123456");

    const res = await request(app).get("/orders");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("status");
  });
});
