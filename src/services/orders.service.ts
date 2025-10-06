import { Item, Size } from "../models/order.model";

const SIZE_FIJOS: Record<Size, number> = { S: 500, M: 700, L: 900 };
const TOPPING_PRECIO = 200;
const MAX_TOPPINGS = 5;

export class OrdersService {
    // calculo precio del pedido basandome en la cantidad de toppings y el tamaño de la pizza
    calcularPrecio(items: Item[]): number {
        let total = 0;
        for (const it of items) {
            const toppings = it.toppings?.length ?? 0;
            if (toppings > MAX_TOPPINGS)
                throw new Error("TOPPINGS MAXIMOS EXCEDIDOS");
            total += SIZE_FIJOS[it.size] + toppings * TOPPING_PRECIO;
        }
        return total;
    }
    // agregar dentro de OrdersService
    private store: Map<string, any> = new Map();

    _seed(order: any) {
        this.store.set(order.id, order);
    }

    cancel(id: string) {
        const ord = this.store.get(id);
        if (!ord) throw new Error("NO_SE_ENCONTRO");
        if (ord.status === "delivered") throw new Error("NO_SE_PUEDE_CANCELAR_DELIVERED");
        ord.status = "cancelled";
        this.store.set(id, ord);
        return ord;
    }

    _clear() { }
}

export default new OrdersService();
