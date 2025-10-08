import { Order } from "../models/interface";

const store = new Map<string, Order>();

export const db = {
  get(id: string) { return store.get(id); },
  save(order: Order) { store.set(order.id, order); return order; },
  update(id: string, partial: Partial<Order>) {
    const existing = store.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...partial };
    store.set(id, updated);
    return updated;
  },
  queryByStatus(status?: string) {
    const arr = Array.from(store.values());
    if (!status) return arr;
    return arr.filter(o => o.status === status);
  },
  clear() { store.clear(); }
};