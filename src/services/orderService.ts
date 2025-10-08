import { Order } from '../models/interface';

// Almacena ordenes en memoria con su ID
const store = new Map<string, Order>();

export const db = {
  // Retorna una orden por ID
  get(id: string) { return store.get(id); },
  
  // Guarda una orden o la actualiza si ya existe
  save(order: Order) { store.set(order.id, order); return order; },

  // Actualiza parcialmente una orden existente
  update(id: string, partial: Partial<Order>) {
    const existing = store.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...partial };
    store.set(id, updated);
    return updated;
  },

  // Consulta ordenes por estado, o todas si no se especifica estado
  queryByStatus(status?: string) {
    const arr = Array.from(store.values());
    if (!status) return arr;
    return arr.filter(o => o.status === status);
  },

  // Limpia todas las ordenes almacenadas
  clear() { store.clear(); }
};