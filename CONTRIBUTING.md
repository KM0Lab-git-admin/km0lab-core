# 📘 Guía de Contribución y Estándares de Diseño - KM0 LAB

Esta guía establece los estándares técnicos y de diseño para asegurar que la aplicación sea escalable, documentada y visualmente perfecta en cualquier resolución.

## 1. Estructura de Componentes (Colocación)

Para mantener el proyecto organizado, cada componente debe vivir en su propia subcarpeta dentro de `src/components/ui/primitives/`.

**Estructura obligatoria:**
- `[componente].tsx`: Estructura y lógica de React.
- `[componente].styles.ts`: Definición de variantes usando `class-variance-authority`.
- `README.md`: Documentación de uso, props y ejemplos.
- `index.ts`: Exportación del componente.

## 2. Estándar de Responsividad (Matriz de Viewports)

Todo componente o pantalla debe validarse en las siguientes resoluciones antes de ser aprobado. El orden de maquetación debe ser **Mobile First**.

| Breakpoint | Nombre | Resolución | Objetivo Crítico |
| :--- | :--- | :--- | :--- |
| `xs` | XS | < 375 x 667 px | Fallback para pantallas muy pequeñas. |
| `mobile-p` | **Móvil Vertical** | 375 x 667 px | **Base del diseño.** Mobile First. |
| `mobile-l` | Móvil Horizontal | 667 x 375 px | Test de estrés de altura mínima. |
| `tablet` | Tablet | 768 x 1024 px | Tablet en orientación vertical. |
| `laptop-short` | **Laptop Corto** | 1280 x 550 px | **Cero Scroll:** Todo visible sin scroll. |
| `desktop` | Escritorio Pro | 1440 x 900 px | Diseño final con márgenes elegantes. |
| `ultra-wide` | Ultra Wide | 1920 x 1080 px | Pantallas grandes y monitores externos. |

### Uso de Breakpoints en Tailwind

```jsx
// Los breakpoints consideran AMBOS: width Y height
<div className="
  p-2                    // XS (default)
  mobile-p:p-3           // >= 375x667
  mobile-l:p-4           // >= 667x375
  tablet:p-6             // >= 768x1024
  laptop-short:p-8       // >= 1280x550
  desktop:p-10           // >= 1440x900
  ultra-wide:p-12        // >= 1920x1080
">
```

### Variantes de Orientación

Además de los breakpoints por tamaño, el sistema incluye variantes basadas en **orientación**:

```jsx
// Portrait: height > width (vertical)
// Landscape: width > height (horizontal)
<div className="
  portrait:flex-col portrait:text-center    // Stack en portrait
  landscape:flex-row landscape:text-left    // Side en landscape
">
```

**Uso principal**: Para decidir plantillas de layout (stack vs side) en componentes como `HeroSlide`.

### Referencia de Breakpoints

Los breakpoints están definidos en:
- `tailwind.config.js` → `theme.screens`
- `src/styles/globals.css` → `@custom-variant` (incluye `portrait` y `landscape`)
- `src/components/devtools/BreakpointIndicator.tsx` → Indicador visual en desarrollo (muestra breakpoint + orientación)

## 3. Estrategia contra el Scroll Vertical

Para cumplir con el límite de **550px de altura** en `laptop-short`, se deben seguir estas reglas técnicas:

1. **Unidades Dinámicas**: Usar `vh` o `dvh` para alturas máximas en imágenes (ej. `max-h-[30vh]`).
2. **Variante laptop-short**: Utilizar `laptop-short:` para reducir paddings, gaps y tamaños de fuente en pantallas con altura limitada.
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