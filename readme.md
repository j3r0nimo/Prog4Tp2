# Pizzería TDD - Base del Proyecto

Este repositorio contiene la **base inicial** del proyecto de pizzería. Incluye la estructura de carpetas y configuraciones para **TypeScript, Node.js y Vitest**, listas para que cada integrante continúe con su desarrollo.
## Requisitos

- Node.js >= 20  
- npm >= 10  
- TypeScript >= 5

## Instalación y configuración

1. Instalar dependencias con: **npm install**

2. Con: **npm run dev** se levanta el servidor en modo desarrollo con recarga automática.

3. Con: **npm run build** compila TypeScript a dist/

4. Con: **npm run test** corre todos los tests con Vitest

5. Con **npm run coverage** genera reporte de cobertura de tests.

## Tests

* Los tests unitarios van en tests/unit
* Los tests de integración van en tests/integration
* La cobertura se genera con Vitest y se puede ver en coverage/ en formato HTML.

### Ejemplos de Curl:
- mostrar listado de pedidos: ``curl http://localhost:3000/orders``
- crear pedido (usamos un archivo json llamado "test-order" en el cual almacenamos los datos para el post): ``curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d @test-order.json``
- cancelar pedido: ``curl -X POST http://localhost:3000/orders/1/cancel``
- cambiar status a delivered: ``curl -X POST http://localhost:3000/orders/1/status -H "Content-Type: application/json" -d "{\"status\":\"delivered\"}"``

user stories:
1. crear pedido con calculo de precio:
- Rojo: prueba que debe calcular el precio segun el tamaño y toppings, la cual falla
- Verde: implementamos calcularPrecio() en OrdersService
- Refactor: ordenamiento de codigo y se añaden comentarios
- Rojo: prueba de integracion con la api con POST /orders el cual falla
- Verde: se añade el endpoint POST /orders validado con zod
- Refactor: mejora en los mensajes de error

2. cancelar pedidos con validacion de estado:

- Rojo: prueba que falla para cancelar pedidos que tienen como dato delivered
- Verde: se implementa la funcion cancel() que no puede cancelar si el pedido tiene delivered
- Refactor: adicion de comentarios
- Rojo: prueba de integracion con la api con el endpoint "orders/:id/cancel" el cual falla
- Verde: se añade el endpoint POST /orders/:id/cancel
- Refactor: cambio de nombre de funciones y adicion de comentarios

3. listar y filtrar pedidos:

- Rojo: prueba que falla al listar pedidos
- Verde: se implementa la funcion lista()
- Refactor: se modifica la funcion lista() para que pueda filtar pedidos por status y se añade comentario sobre funcionamiento
- Rojo: prueba de integracion de api que falla y se verifica que requiere la funcion lista()
- Verde: se añaden funciones requeridas y el endpoint
- Refactor: adicion del archivo json "test-order" para el uso en el curl y se acomodan funciones