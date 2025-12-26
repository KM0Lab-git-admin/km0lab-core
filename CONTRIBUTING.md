# 📘 Guía de Contribución y Estándares de Diseño - KMO LAB
Esta guía establece los estándares técnicos y de diseño para asegurar que la aplicación sea escalable, documentada y visualmente perfecta en cualquier resolución, especialmente en pantallas con altura reducida.

## 1. Estructura de Componentes (Colocación)
Para mantener el proyecto organizado, cada componente debe vivir en su propia subcarpeta dentro de `src/components/ui/primitives/`.

**Estructura obligatoria:**
- `[componente].tsx`: Estructura y lógica de React.
- `[componente].styles.ts`: Definición de variantes usando `class-variance-authority`.
- `README.md`: Documentación de uso, props y ejemplos.
- `index.ts`: Exportación del componente.

## 2. Estándar de Responsividad (Matriz de Viewports)
Todo componente o pantalla debe validarse en las siguientes resoluciones antes de ser aprobado. El orden de maquetación debe ser **Mobile First**.

| Escenario | Resolución | Objetivo Crítico |
| :--- | :--- | :--- |
| **Móvil Vertical** | 375 x 667 px | Base del diseño. |
| **Móvil Horizontal**| 667 x 375 px | Test de estrés de altura mínima. |
| **Escritorio Bajo** | 1280 x 550 px | **Cero Scroll:** Todo el contenido debe ser visible. |
| **Escritorio Pro** | 1440 x 900 px | Diseño final con márgenes elegantes. |

## 3. Estrategia contra el Scroll Vertical
Para cumplir con el límite de **550px de altura**, se deben seguir estas reglas técnicas:

1. **Unidades Dinámicas**: Usar `vh` o `dvh` para alturas máximas en imágenes (ej. `max-h-[30vh]`).
2. **Variante x-short**: Utilizar la variante de Tailwind `x-short:` (definida para `@media (max-height: 550px)`) para reducir paddings, gaps y tamaños de fuente en pantallas críticas.
3. **Contenedores**: El layout principal debe usar `min-h-dvh` para ocupar exactamente el espacio visible del navegador.

## 4. Documentación y Registro
Cada componente debe registrarse en `src/app/[locale]/dev/components/registry.ts` para que aparezca automáticamente en el inventario de componentes.

- Los `README.md` deben incluir una tabla de **Props**, ejemplos de uso y descripción de **Estados** (default, filled, error, disabled).
- Se debe usar **JSDoc** en las interfaces de TypeScript para proporcionar ayuda contextual en el editor.

## 5. Validaciones de Datos
La lógica de validación (Regex) debe estar separada de la UI:
- Definir reglas en `src/utils/validations.ts`.
- El componente `Input` base solo recibe el estado `error` (booleano) y el `message` (texto) para mostrar feedback visual.

## 6. Automatización (E2E)
Se utilizará **Playwright** para verificar que en la resolución **1280x550px** el `scrollHeight` de la página no supere al `innerHeight`, garantizando la ausencia de barras de desplazamiento vertical.



¿Cómo usar este archivo con una IA?
Cuando pidas a una IA que cree un nuevo componente o pantalla, puedes decirle:

"Actúa como un experto en React. Lee mi archivo CONTRIBUTING.md y asegúrate de que el código que generes cumpla estrictamente con la estructura de carpetas, los estándares de validación y, sobre todo, que el diseño sea fluido para no generar scroll en el breakpoint de 550px de alto."