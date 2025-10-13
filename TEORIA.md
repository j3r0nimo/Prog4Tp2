1. Explique el ciclo Rojo → Verde → Refactor y por qué es importante el tamaño de los
pasos.

es un proceso que se usa en los TDDs, primero se hace un test que falla(Rojo), después una implementación mínima para que pase el test(Verde) y por ultimo se mejora la implementación mínima (refactorizar) sin cambiar el comportamiento de la función

Rojo: El propósito de esta fase es escribir una prueba que informe la implementación de una característica. La prueba sólo pasará cuando se cumplan sus expectativas
Verde: El objetivo es encontrar una solución, sin preocuparse por optimizar su implementación
Refactorizar: buscamos mejorar el código de implementación, hacerlo mas descriptivo y mas rapido

2. Diferencie tests unitarios, de integración y E2E en APIs.

Test unitarios: se verifican funcionamientos aislados, sin usar dependencias externas

Test de integración: se verifica que varias funciones trabajen bien juntas, ejemplo en la api seria probar un endpoint

Test E2E: aca simulamos todo el flujo del usuario, desde el principio hasta el final.

3. ¿Qué es un doble de prueba? Defina mock, stub y spy y cuándo conviene cada uno.

un doble de prueba es un objeto false el cual funciona como un reemplazo de una dependencia real, es usado para controlar el comportamiento en una etapa de prueba

Mock: funcion falsa que registra su uso y verifica llamadas, es útil si queremos comprobar que llamamos a un método con ciertos datos

Stub: devuelve datos fijos, se usa para ejecutar una función sin usar su lógica real

Spy: observa una función real con datos reales sin cambiar nada, nos conviene cuando queremos ver como opera nuestro código sin tener que cambiar su funcionamiento
