
import request from "supertest";
import { makeApp } from "../../src/app";
/*prueban toda la api express, routes+zod+rptaHTTP */
describe("Orders routes", () => {
  const app = makeApp();

  it("POST /orders deberia devolver 201 con pedido pendiente", async () => {
    const res = await request(app)
      .post("/orders")
      .send({ size: "M", toppings: ["olives"], address: "Av. Siempre Viva 742" });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("pending");
  });

  it("POST /orders deberia devolver 422 por error del adress", async () => {
    const res = await request(app)
      .post("/orders")
      .send({ size: "M", toppings: ["olives"], address: "short" });

    expect(res.status).toBe(422);
  });

it("POST /orders/:id/cancel deberia devolver 409 si ya fue entregado", async () => {
  // creo pedido nuevo
  const create = await request(app)
    .post("/orders")
    .send({ size: "L", toppings: ["onion"], address: "Av. Falsa 9999" });

  const id = create.body.id;

  // simulo que fue entregado reemplazando directamente el status en el store
  const orders = app.locals.service.getAll();
  const order = orders.find((o: any) => o.id === id);
  if (order) order.status = "delivered"; 

  // intento cancelarlo
  const res = await request(app).post(`/orders/${id}/cancel`);
  expect(res.status).toBe(409);
});

  it("GET /orders/:id dberia devolver 404 si no se encuentra", async () => {
    const res = await request(app).get("/orders/fake-id");
    expect(res.status).toBe(404);
  });

  it("GET /orders/:id deberia devolver 200 si se encuentra por id", async () => {
    const create = await request(app)
      .post("/orders")
      .send({ size: "M", toppings: [], address: "Av. Siempre Viva 742" });

    const id = create.body.id;
    const res = await request(app).get(`/orders/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  });

  it("GET /orders?status deberia filtrar por status y devolver 200", async () => {
    await request(app).post("/orders").send({
      size: "L",
      toppings: [],
      address: "Av. Siempre Viva 1234",
    });

    const res = await request(app).get("/orders?status=pending");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].status).toBe("pending");
  });
});
