import { describe, it, expect } from "vitest";
import request from "supertest";
import { makeApp } from "../../src/app";

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
});
