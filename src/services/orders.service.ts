import { Item, Size } from "../models/order.model";

const SIZE_FIJOS: Record<Size, number> = { S: 500, M: 700, L: 900 };
const TOPPING_PRECIO = 200;
const MAX_TOPPINGS = 5;

export class OrdersService {
    private store: Map<string, any> = new Map();
    private idContador = 0;
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

    _seed(order: any) {
        this.store.set(order.id, order);
    }
    // funcion para cancelar pedido mientras no tenga como status "delivered" ("enviado" para los que no saben)
    cancel(id: string) {
        // "ord" hace referencia al "order", aclaro porque me no se me ocurre otro nombre y repetir "order" no da
        const ord = this.store.get(id);
        if (!ord) throw new Error("NO_SE_ENCONTRO");
        if (ord.status === "delivered") throw new Error("NO_SE_PUEDE_CANCELAR_DELIVERED");
        ord.status = "cancelled";
        this.store.set(id, ord);
        return ord;
    }
    // funcion para listar los pedidos, tambien tiene implementado el filtrado por status
    list(status?: string) {
  const all = Array.from(this.store.values());
  if (!status) return all;
  return all.filter((o) => o.status === status);
}

    create(items: any[], direccion: string) {
        this.idContador++;
        const id = this.idContador;
        const precio = this.calcularPrecio(items);

        const order = {
            id,
            items,
            direccion,
            status: "pending",
            precio,
            createdAt: new Date().toISOString(),
        };

        this._seed(order);
        return order;
    }


    // agregar dentro de OrdersService(tarea futura)
    _clear() {
        this.store.clear();
    }
}

export default new OrdersService();
