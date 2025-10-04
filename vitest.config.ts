import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true, // para usar describe, it, expect sin importar
    environment: 'node', // usamos node
    include: ['tests/**/*.test.ts'], // donde buscar los tests
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'tests/'],
    }, // El TP pide 80%+. Con text se ve el resumen en consola,
       // con html se genera un reporte navegable en carpeta coverage/.
  },
})