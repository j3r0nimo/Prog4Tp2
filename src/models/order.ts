
export type OrderStatus = "pending" | "delivered" | "cancelled";
export type OrderSize = "S" | "M" | "L";

export interface Order {
  id: string;
  size: OrderSize;
  toppings: string[];
  address: string;
  status: OrderStatus;
  price: number;
}
