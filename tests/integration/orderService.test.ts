import { describe, it, expect, beforeEach } from 'vitest';
import * as service from '../../src/services/orderService';
import { db } from '../../src/db/inMemoryStore';

beforeEach(() => db.clear());

describe('Reglas de negocio - cancelOrder', () => {
  it('debería lanzar error 409 si el pedido ya fue entregado', () => {
    const order = service.createOrder([{ name: 'Muzzarella', size: 'S' }], 'Calle larga 123');
    db.update(order.id, { status: 'delivered' });

    expect(() => service.cancelOrder(order.id)).toThrow();
  });
});