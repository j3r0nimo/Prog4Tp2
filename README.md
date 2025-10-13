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

#### Validaciones con Zod

size: "S" | "M" | "L"

toppings: máx. 5 elementos

address: mínimo 10 caracteres

Error 422 si la validación falla

---

### Matriz de casos

- ID	
- Caso / Descripción 
- Precondición-Input	
- Acción	
- Resultado esperado
- Test

##### CA1	
- Crear orden válida	
- {size:"M", toppings:["olives"], address:"Av. Siempre Viva 742"}	
- POST /orders	
- 201 con status:"pending"	
- orders.routes.test.ts

##### CA2	
- Dirección inválida
- {address:"short"}	
- POST /orders	
- 422 error validación	
- orders.routes.test.ts


##### ERR1
- Cancelar pedido entregado	
- Pedido entregado	
- POST /orders/:id/cancel	
- 409 error "Cannot cancel delivered order"	
- orders.routes.test.ts	

##### ERR2	
- Pedido inexistente	
- sin pedidos	
- POST /orders/fake-id/cancel	
- 404 error "Order not found"	
- orderService.test.ts

## Evidencia del ciclo TDD

Se siguió el ciclo **Rojo → Verde → Refactor** para cada historia:

### Historia 1: Crear pedido (`POST /orders`)
- 🟥 **Rojo:** Se creó un test unitario que fallaba (`orderService.test.ts`).
- 🟩 **Verde:** Se implementó la función `create()` hasta que el test pasó.
- 🟦 **Refactor:** Se mejoró el código y se añadieron tests de integración.

### Historia 2: Cancelar pedido (`POST /orders/:id/cancel`)
- 🟥 **Rojo:** Se escribió un test que esperaba error al cancelar entregado.
- 🟩 **Verde:** Se implementó validación de estado en el servicio.
- 🟦 **Refactor:** Se simplificaron mensajes de error y se agregó validación Zod.

### Historia 3: Validación con Zod
- 🟥 **Rojo:** Test con `address` corto → esperaba 422.
- 🟩 **Verde:** Se agregó validación en la ruta con Zod.
- 🟦 **Refactor:** Centralización de esquema y nombres descriptivos.

##### Cobertura de código

Se obtuvo más del 80 % de cobertura total, cumpliendo el requisito

