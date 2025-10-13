## Prog4Tp2 – Testing (Pizzería API)

**Integrantes:**
- Jerónimo Baltian Ortiz  
- Carlos Alberto Arce  
- Marcos Díaz  
- Jimena Martínez Arana  

---

####  Descripción

API REST desarrollada con **TypeScript + Express**, siguiendo la metodología **TDD (Rojo → Verde → Refactor)**.  
Incluye **validaciones con Zod**, **tests unitarios e integración** con **Jest + Supertest**,  
y cobertura de código **≥ 80 %**.

El dominio modela una **pizzería**, permitiendo crear, consultar y cancelar pedidos.

---
#### Instalación y ejecución

bash 
###### Clonar el repositorio
git clone https://github.com/j3r0nimo/Prog4Tp2.git
cd Prog4Tp2

###### Instalar dependencias
npm install

###### Ejecutar el servidor (modo desarrollo)
npm run dev

###### Correr los tests
npm test

###### Ver reporte de cobertura
npm run coverage

---


#### Endpoints principales
POST  /orders	Crea un nuevo pedido
GET	 /orders/:id	Obtiene un pedido por ID
POST  /orders/:id/cancel	Cancela un pedido (si no fue entregado)
GET /orders?status= ("pending", "delivered", "cancelled") filtra ordenes segun status, si no se pasa status devuelve todos

---

## Endpoints principales

- `POST   /orders`  
  Crea un nuevo pedido

- `GET    /orders/:id`  
  Obtiene un pedido por ID

- `POST   /orders/:id/cancel`  
  Cancela un pedido (si no fue entregado)

- `GET    /orders?status=`  
  Filtra pedidos por estado ("pending", "delivered", "cancelled").  
  Si no se pasa status, devuelve todos los pedidos.

---

## Ejemplos curl

```bash
# Crear un pedido
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"size":"M","toppings":["olives","cheese"],"address":"Av. Siempre Viva 742"}'

# Obtener pedido por ID
curl http://localhost:3000/orders/<id>

# Cancelar un pedido
curl -X POST http://localhost:3000/orders/<id>/cancel

# Listar pedidos entregados
curl http://localhost:3000/orders?status=delivered
```

---

#### Validaciones con Zod

size: "S" | "M" | "L"

toppings: máx. 5 elementos

address: mínimo 10 caracteres

Error 422 si la validación falla

---

## Matriz de Casos

| ID   | Caso / Descripción         | Precondición / Input                                        | Acción                    | Resultado esperado                          | Test                     |
|------|---------------------------|-------------------------------------------------------------|---------------------------|---------------------------------------------|--------------------------|
| CA1  | Crear orden válida        | {size:"M", toppings:["olives"], address:"Av. Siempre Viva 742"} | POST /orders              | 201 con status:"pending"                    | orders.routes.test.ts    |
| CA2  | Dirección inválida        | {address:"short"}                                           | POST /orders              | 422 error de validación                     | orders.routes.test.ts    |
| ERR1 | Cancelar pedido entregado | Pedido entregado                                            | POST /orders/:id/cancel   | 409 error "el pedido ya se envio, no se puede cancelar" | orders.routes.test.ts    |
| ERR2 | Pedido inexistente        | Sin pedidos                                                 | POST /orders/fake-id/cancel | 404 error "No se encontro la orden"         | orderService.test.ts     |

---

## Evidencia del ciclo TDD

Para cada historia de usuario se aplicó el ciclo **Rojo → Verde → Refactor**:

| Historia de usuario                 | Rojo (Test que falla)                                   | Verde (Implementación mínima)          | Refactor (mejoras)                            |
|-------------------------------------|--------------------------------------------------------|----------------------------------------|-----------------------------------------------|
| Crear pedido (`POST /orders`)       | Test unitario en `orderService.test.ts` que espera creación válida y validaciones de dominio.<br>El test falla porque la función aún no existe o no está completa. | Se implementa `OrderService.create()` hasta que el test pasa en verde. | Limpieza de código, nombres descriptivos, y agregado de test de integración en `order.routes.test.ts`. |
| Cancelar pedido (`POST /orders/:id/cancel`) | Test unitario en `orderService.test.ts` que espera error si el pedido fue entregado.<br>El test falla al principio. | Se implementa la lógica de cancelación y los errores personalizados hasta que el test pasa. | Refactor de mensajes de error y agregado de validación en el endpoint. |
| Validaciones con Zod                | Test de integración en `order.routes.test.ts` para validar inputs inválidos (por ejemplo, dirección corta).<br>El test falla al principio. | Se agregan validaciones con Zod en la ruta, hasta pasar el test. | Centralización del esquema Zod y mejora de mensajes de error. |

Cada commit documenta el avance del ciclo, siguiendo la metodología TDD (ver historial en GitHub).

---
## Cobertura de código

La cobertura total supera el **80%** en los archivos modificados.  
Para ver el reporte:  
```bash
npm run coverage
```

---