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

### 2.1. Breakpoints vs Variantes: Guía de Identificación

#### ¿Qué son los Breakpoints?

Los **breakpoints** son puntos de quiebre basados en el tamaño de la pantalla (viewport). Se definen en CSS/Tailwind mediante media queries y se activan automáticamente según las dimensiones del navegador.

**Características:**
- Se definen en `src/styles/globals.css` con `@custom-variant`
- Se usan en clases Tailwind con el prefijo `:` (ej: `tablet:`, `laptop-short:`)
- Dependen del tamaño de la pantalla, no de props del componente
- Se aplican automáticamente cuando el viewport cumple las condiciones

**Breakpoints disponibles en el proyecto:**

| Breakpoint | Resolución | Condición |
|------------|------------|-----------|
| `xs` | < 375 x 667 px | Default (fallback) |
| `mobile-p` | 375 x 667 px | `min-width: 375px AND min-height: 667px` |
| `mobile-l` | 667 x 375 px | `min-width: 667px AND min-height: 375px` |
| `tablet` | 768 x 1024 px | `min-width: 768px AND min-height: 1024px` |
| `laptop-short` | 1280 x 550 px | `min-width: 1280px AND min-height: 550px` |
| `desktop` | 1440 x 900 px | `min-width: 1440px AND min-height: 900px` |
| `ultra-wide` | 1920 x 1080 px | `min-width: 1920px AND min-height: 1080px` |

**Ejemplo de uso:**
```tsx
// Breakpoint se usa con : en clases Tailwind
<div className="
  p-2                    // XS (default)
  mobile-p:p-3           // Breakpoint mobile-p
  tablet:p-6             // Breakpoint tablet
  laptop-short:p-8       // Breakpoint laptop-short
  desktop:p-10           // Breakpoint desktop
">
```

#### ¿Qué son las Variantes?

Las **variantes** son opciones de configuración de un componente, definidas usando `class-variance-authority` (CVA). Son props que se pasan al componente para cambiar su comportamiento o apariencia.

**Características:**
- Se definen en `*.styles.ts` dentro del objeto `variants` de CVA
- Se pasan como props al componente (ej: `scale="md"`, `variant="ghost"`)
- Son opciones de configuración del componente, no dependen del viewport
- Permiten diferentes estilos o comportamientos según el valor pasado

**Ejemplo de definición:**
```typescript
// En content-shell.styles.ts
export const contentShellVariants = cva(
  'clases-base',
  {
    variants: {
      scale: {        // ← VARIANTE (nombre de la prop)
        sm: [...],    // ← VALOR de la variante
        md: [...],    // ← VALOR de la variante
        lg: [...],    // ← VALOR de la variante
      }
    }
  }
);
```

**Ejemplo de uso:**
```tsx
// Variante se pasa como prop
<ContentShell scale="md">     // Variante "scale" con valor "md"
<Button variant="ghost">      // Variante "variant" con valor "ghost"
<LogoHeader scale="lg">      // Variante "scale" con valor "lg"
```

#### Cómo Identificarlos

**Es un BREAKPOINT si:**
- ✅ Se usa con `:` en clases Tailwind: `tablet:`, `laptop-short:`, `desktop:`
- ✅ Se define en `src/styles/globals.css` con `@custom-variant`
- ✅ Depende del tamaño de la pantalla (viewport)
- ✅ Se activa automáticamente cuando el navegador cumple las condiciones
- ✅ Ejemplo: `tablet:max-w-[570px]` → breakpoint `tablet`

**Es una VARIANTE si:**
- ✅ Se pasa como prop al componente: `<Component scale="md">`
- ✅ Se define en el objeto `variants` de CVA en `*.styles.ts`
- ✅ Es una opción de configuración del componente
- ✅ El desarrollador controla qué valor pasar
- ✅ Ejemplo: `scale="md"` → variante `scale` con valor `md`

#### Ejemplo Práctico: Combinando Breakpoints y Variantes

```typescript
// En content-shell.styles.ts
variants: {
  scale: {  // ← VARIANTE (prop del componente)
    md: [
      'p-[clamp(8px,2vw,24px)]',           // Clase base (siempre)
      'mobile-p:p-[clamp(8px,1.5vw,20px)]', // ← BREAKPOINT mobile-p
      'tablet:p-[clamp(16px,2.5vw,32px)]',  // ← BREAKPOINT tablet
      'desktop:p-[clamp(24px,3.5vw,48px)]', // ← BREAKPOINT desktop
    ]
  }
}
```

**Uso en el componente:**
```tsx
<ContentShell scale="md">  {/* Variante scale="md" */}
  {/* 
    Se aplican las clases de la variante "md"
    Y dentro de esas clases, los breakpoints se activan según el viewport:
    - En mobile-p: p-[clamp(8px,1.5vw,20px)]
    - En tablet: p-[clamp(16px,2.5vw,32px)]
    - En desktop: p-[clamp(24px,3.5vw,48px)]
  */}
</ContentShell>
```

#### Tabla Comparativa

| Aspecto | Breakpoint | Variante |
|---------|------------|----------|
| **Dónde se define** | `src/styles/globals.css` | `*.styles.ts` (CVA) |
| **Cómo se usa** | `tablet:`, `laptop-short:` en clases | `scale="md"` como prop |
| **Depende de** | Tamaño de la pantalla | Prop del componente |
| **Control** | Automático (viewport) | Manual (desarrollador) |
| **Ejemplo** | `tablet:max-w-[570px]` | `<Component scale="md">` |

#### Regla de Oro para IAs

**Cuando trabajes con estilos responsivos:**
1. Si necesitas cambiar estilos según el tamaño de pantalla → usa **BREAKPOINTS** (`tablet:`, `laptop-short:`, etc.)
2. Si necesitas diferentes opciones de configuración del componente → usa **VARIANTES** (props como `scale`, `variant`, etc.)
3. Puedes combinar ambos: variantes que contienen breakpoints dentro de sus clases

**Referencias:**
- Breakpoints definidos en: `src/styles/globals.css`
- Variantes de componentes: `src/components/ui/*/**.styles.ts`
- Lista completa de breakpoints: Sección 2 de este documento

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