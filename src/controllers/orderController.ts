import { Request, Response } from 'express';
import * as service from '../services/orderService';

export async function createOrderHandler(req: Request, res: Response) {
  try {
    const { items, address } = req.body;
    const order = service.createOrder(items, address);
    res.status(201).json({ success: true, order });
  } catch (err: any) {
    res.status(err.status || 500).json({ success: false, error: err.message || 'internal' });
  }
}

export async function getOrderHandler(req: Request, res: Response) {
  const id = req.params.id;
  const order = service.getOrder(id);
  if (!order) return res.status(404).json({ success: false, error: 'not found' });
  res.json({ success: true, order });
}

export async function cancelOrderHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const updated = service.cancelOrder(id);
    res.json({ success: true, order: updated });
  } catch (err: any) {
    res.status(err.status || 500).json({ success: false, error: err.message || 'internal' });
  }
}

export async function listOrdersHandler(req: Request, res: Response) {
  const status = (req.query.status as string | undefined);
  const list = service.listOrders(status);
  res.json({ success: true, orders: list });
}