## 9. ¿Por qué no perseguir 100% de cobertura a toda costa? Mencione riesgos/limitaciones.

No es recomendable perseguir 100% de cobertura porque no garantiza la calidad del software, el 100% significa que se pudieron ejecutar todas las líneas de código, pero no significa que todas hagan lo correcto, y tampoco asegura que haya probado todos los casos de uso, entonces puede llegar a dar una falsa sensación de seguridad.

Hay un riesgo principal y es la ley de rendimiento decreciente: el esfuerzo requerido para cubrir el último 5 o 10% del código es desproporcionadamente alto en comparación con el valor que se obtiene. Este tiempo que se pierde dedicado a perseguir ese 100% podría usarse para desarrollar nuevas funcionalidades o terminar otras tareas más críticas, por ejemplo.


---
## 10. Defina y dé un ejemplo de helper/builder para tests.

* Helper:
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
* Builder:
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