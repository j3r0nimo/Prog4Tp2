#### 1. Explique el ciclo Rojo → Verde → Refactor y por qué es importante el tamaño de los pasos.

es un proceso que se usa en los TDDs, primero se hace un test que falla(Rojo), después una implementación mínima para que pase el test(Verde) y por ultimo se mejora la implementación mínima (refactorizar) sin cambiar el comportamiento de la función

**Rojo:** El propósito de esta fase es escribir una prueba que informe la implementación de una característica. La prueba sólo pasará cuando se cumplan sus expectativas
**Verde:** El objetivo es encontrar una solución, sin preocuparse por optimizar su implementación
**Refactorizar:** buscamos mejorar el código de implementación, hacerlo mas descriptivo y mas rapido

---

#### 2. Diferencie tests unitarios, de integración y E2E en APIs.

**Test unitarios:** se verifican funcionamientos aislados, sin usar dependencias externas

**Test de integración:** se verifica que varias funciones trabajen bien juntas, ejemplo en la api seria probar un endpoint

**Test E2E:** aca simulamos todo el flujo del usuario, desde el principio hasta el final.

---

#### 3. ¿Qué es un doble de prueba? Defina mock, stub y spy y cuándo conviene cada uno.

un doble de prueba es un objeto false el cual funciona como un reemplazo de una dependencia real, es usado para controlar el comportamiento en una etapa de prueba

**Mock:** funcion falsa que registra su uso y verifica llamadas, es útil si queremos comprobar que llamamos a un método con ciertos datos

**Stub:** devuelve datos fijos, se usa para ejecutar una función sin usar su lógica real

**Spy:** observa una función real con datos reales sin cambiar nada, nos conviene cuando queremos ver como opera nuestro código sin tener que cambiar su funcionamiento

---

#### 4️. ¿Por qué es útil separar app de server?

Separar la instancia de Express (app) del archivo que inicia el servidor (server) permite testear la aplicación sin abrir puertos reales.
Esto hace que los tests de integración sean más rápidos y seguros, porque Supertest puede inyectar peticiones directamente sobre la app sin usar sockets.
Además, mejora la organización del código y evita conflictos al correr los tests y el servidor en paralelo.

---

#### 5️. Zod: diferencia entre parse y safeParse. ¿Dónde usarías cada uno y por qué?

**parse()** lanza una excepción si la validación falla.

**safeParse()** no lanza; devuelve un objeto { success, data, error }.

En una ruta Express conviene usar safeParse() si queremos manejar el error de forma controlada y devolver un código 422 sin romper el servidor.
parse() puede usarse en lugares donde querés fallar rápido (por ejemplo, en inicializaciones internas o tests).

---

#### 6️. Ejemplos de reglas de dominio que deben probarse con tests unitarios

Las reglas de dominio son la lógica propia del negocio, no validaciones de entrada.
En la pizzería, algunos ejemplos son:

1. Precio calculado según tamaño y toppings

El precio base depende del tamaño y se suman $100 por cada topping.
→ Se prueba con un test unitario que verifique el valor final.

2. No se puede cancelar un pedido entregado

Si el status es "delivered", el servicio debe lanzar un error "Cannot cancel delivered order".
→ Se prueba con un test unitario del método cancel().

---

#### 7. ¿Qué malos olores suele haber en suites de tests? Dé 3 ejemplos (naming, duplicación, asserts débiles, mocks frágiles, etc.).

El mal olor se refiere a formas o estilos de programar que no resultan convincentes en algún aspecto y/o que debido a cierto aspectos del programa, se aprecia que serán fuente de problemas.

El Naming se refiere al empleo de nombres que no resultan suficientemente indicativos de la razón de ser de esa pieza de software, como ser "test1", "prueba_jorgito", "probandoEsaCosa". El problema inicial es que se necesita tiempo para estudiar el código y para entender el porqué existe, para recién entonces poder entender porque falla o, por ejemplo, que podría necesitarse para hacer un refactoring o determinar una posible solución.

La Duplicación se refiere a la creación de pruebas que tienen la misma configuración, diseño o código y que obligan a múltiples modificaciones o configuraciones, dificultando demasiado el mantenimiento. Por ejemplo, en el caso de los tests de los pedidos de la pizzeria y en un escenario donde tenemos varios tests para calcular totales de pedidos, como "totales de pedidos básicos", "totales de pedidos menú del día" etc, podríamos escribir el mismo objeto pedido(cliente, items) para cada caso de test, pero si este objeto debe cambiarse, tendríamos que modificarlo en múltiples lugares.

Un Assert débil es aquella prueba de resultado esperado que se diseña en forma demasiado genérica, tanto que no cumple su función de test. Por ejemplo, expect(listado.length > 0).toBeTruthy(), es demasiado genérico, porque pasa siempre que el listado tenga al menos un elemento.

---

####  8. ¿Cómo trazará criterios de aceptación ↔ tests? Incluya un mini ejemplo de tabla con 2 filas.

Los criterios de aceptación son las condiciones que debe cumplir una historia de usuario para poder considerarse completa. Idealmente, cada criterio debe tener al menos un test asociado. Para hacer el seguimiento correcto, se organizan con una tabla de trazabilidad, donde cada fila conecta un criterio con su test correspondiente.

Siempre con nuestro ejemplo de la pizzeria, tenemos entonces una tabla de dos filas y dos columnas:


Criterio de aceptación	----> Test asociado

El sistema no debe permitir mas de 5 toppings ---> test("Verifica que no se soliciten mas de 5 toppings"

Se aplica descuento 5% total por pago contado --->test("Si paga en efectivo, se descuenta 5 por ciento al total")

---

#### 9. ¿Por qué no perseguir 100% de cobertura a toda costa? Mencione riesgos/limitaciones.

No es recomendable perseguir 100% de cobertura porque no garantiza la calidad del software, el 100% significa que se pudieron ejecutar todas las líneas de código, pero no significa que todas hagan lo correcto, y tampoco asegura que haya probado todos los casos de uso, entonces puede llegar a dar una falsa sensación de seguridad.

Hay un riesgo principal y es la ley de rendimiento decreciente: el esfuerzo requerido para cubrir el último 5 o 10% del código es desproporcionadamente alto en comparación con el valor que se obtiene. Este tiempo que se pierde dedicado a perseguir ese 100% podría usarse para desarrollar nuevas funcionalidades o terminar otras tareas más críticas, por ejemplo.

---

#### 10. Defina y dé un ejemplo de helper/builder para tests.

* **Helper:**
Un Helper es típicamente una función que ayuda a realizar tareas de configuración o limpieza que se repiten en muchos tests. Es decir, una función simple que hace una tarea común por vos en los tests, como preparar datos o configurar algo. Su objetivo es reducir la repetición de código.

```JavaScript
// HELPER: Crea un objeto de Usuario base para pruebas
function crearUsuarioBase() {
    return {
        id: 1,
        rol: "ADMIN",       // Valor fijo solo para el test
        Login: true 
    };
}
// TEST: Se usa solo el helper para obtener el objeto.
function test_acceso_admin() {
    const usuario = crearUsuarioBase(); 
    // ... logica principal del test ...

    /* Y acá verifica que el valor de la propiedad rol del objeto usuario
       sea exactamente igual a "ADMIN"
    */
    console.assert(usuario.rol === "ADMIN", "Rol incorrecto."); 
}
```

* **Builder:**
Un Builder es una clase (o función) que ayuda a construir un objeto complejo de forma flexible. Da valores por defecto para la mayoría de los campos y permite cambiar solo los que importan para el test.

```JavaScript
// BUILDER: Permite construir el objeto Producto cambiando solo lo necesario.
class ProductoBuilder {
    constructor() {
        this.precio = 100; // Por defecto
        this.stock = 5;    // Por defecto
    }

    // Método para cambiar el precio (permite encadenar)
    cambiarPrecio(nuevoPrecio) {
        this.precio = nuevoPrecio;
        return this; 
    }
    
    // Método para crear el objeto final
    construir() {
        return { 
            nombre: "Nombre genérico aca", 
            precio: this.precio, 
            stock: this.stock 
        };
    }
}

// TEST: Solo define el campo que importa para el test (el precio).
function test_producto_caro() {
    const producto = new ProductoBuilder()
                            .cambiarPrecio(500) // Metodo encadenado, le dice al Builder que cambie el precio predeterminado de 100 a 500.
                            .construir(); // Llamada al metodo final del Builder, que crea y devuelve el objeto producto terminado.
    
    // Comprueba que el precio del producto sea exactamente igual a 500.
    console.assert(producto.precio === 500, "El precio no es el esperado.");
    // Comprueba que el stock mantenga su valor predeterminado de 5. Esto confirma que el Builder es eficiente, solo hubo que especificar el precio y el stock se manejó solo.
    console.assert(producto.stock === 5, "El stock es el valor por defecto."); 
}
```
