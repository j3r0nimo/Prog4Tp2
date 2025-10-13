import { z } from "zod";

export const createOrderSchema = z.object({
  size: z.enum(["S", "M", "L"]),
  toppings: z.array(z.string()).max(5),
  address: z.string().min(10),
});
