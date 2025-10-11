import { Order, Item } from '../models/interface';
import { db } from '../db/inMemoryStore';
import { v4 as uuidv4 } from 'uuid';

export const PRICE = {
  S: 500,
  M: 800,
  L: 1100
};

export function calculatePrice(items: Item[]): number {
  // price = sum(sizeBase + topping * 100)
  let total = 0;
  for (const it of items) {
    const base = PRICE[it.size];
    const toppingsCount = (it.toppings || []).length;
    total += base + toppingsCount * 100;
  }
  return total;
}

export function validateBusinessRules(items: Item[]) {
  if (!items || items.length === 0) {
    throw { status: 422, message: 'items must not be empty' };
  }
  for (const it of items) {
    if (!['S','M','L'].includes(it.size)) {
      throw { status: 422, message: 'invalid size' };
    }
    const tcount = (it.toppings || []).length;
    if (tcount > 5) {
      throw { status: 422, message: 'max 5 toppings per item' };
    }
  }
}

export function createOrder(items: Item[], address: string) {
  validateBusinessRules(items);
  const price = calculatePrice(items);
  const order: Order = {
    id: uuidv4(),
    items,
    address,
    status: 'pending',
    price,
    createdAt: new Date().toISOString()
  };
  return db.save(order);
}

export function getOrder(id: string) {
  const order = db.get(id);
  if (!order) return null;
  return order;
}

export function cancelOrder(id: string) {
  const order = db.get(id);
  if (!order) {
    throw { status: 404, message: 'Order not found' };
  }
  if (order.status === 'delivered') {
    throw { status: 409, message: 'Cannot cancel delivered order' };
  }
  const updated = db.update(id, { status: 'cancelled' });
  return updated;
}

export function listOrders(status?: string) {
  return db.queryByStatus(status);
}