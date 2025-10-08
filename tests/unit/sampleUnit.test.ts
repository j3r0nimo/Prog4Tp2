import request from 'supertest';
import { makeApp } from '../../src/app';
import { db } from '../../src/db/inMemoryStore';
import { describe, it, beforeEach, expect } from 'vitest';

const app = makeApp();

beforeEach(() => db.clear());

describe('POST /orders/:id/cancel', () => {
  it('debería responder 409 si el pedido está entregado', async () => {
    const create = await request(app)
      .post('/orders')
      .send({ items: [{ name: 'Muzzarella', size: 'S' }], address: 'Una dirección válida 123' })
      .expect(201);

    const id = create.body.order.id;
    db.update(id, { status: 'delivered' });

    await request(app)
      .post(`/orders/${id}/cancel`)
      .expect(409);
  });
});