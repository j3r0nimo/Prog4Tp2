import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const ItemSchema = z.object({
  name: z.string().min(1),
  size: z.enum(['S','M','L']),
  toppings: z.array(z.string()).optional()
});

export const CreateOrderSchema = z.object({
  items: z.array(ItemSchema).min(1),
  address: z.string().min(10)
});

export function validateBody(schema: z.ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(422).json({ success: false, errors: result.error.format() });
    }
    next();
  };
}