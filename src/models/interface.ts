export type Size = 'S' | 'M' | 'L';

export interface Item {
  name: string;
  size: Size;
  toppings?: string[]; // max 5
}

export type OrderStatus = 'pending' | 'preparing' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  items: Item[];
  address: string;
  status: OrderStatus;
  price: number;
  createdAt: string;
}