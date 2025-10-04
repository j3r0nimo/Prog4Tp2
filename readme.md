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

Por ahora los tests incluidos son de ejemplo.