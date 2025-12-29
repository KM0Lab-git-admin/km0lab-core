# ContentShell

Contenedor de contenido con padding y gap responsivos. Incluye variantes de escala para diferentes contextos de uso y proporciona un layout flexible para organizar contenido.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `scale` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controla el tamaño del padding y gap responsivos |
| `as` | `'div' \| 'main' \| 'section'` | `'div'` | Elemento HTML a renderizar |
| `className` | `string` | - | Clases adicionales para personalización |

## Variantes de Escala

Cada variante de `scale` ajusta automáticamente:
- **padding**: Espaciado interno con valores responsivos usando `clamp()`
- **gap**: Espaciado entre elementos hijos

### `sm` (Pequeño)
- Padding: `clamp(10px, 2vw, 16px)`
- Gap: `clamp(12px, 2vh, 16px)`

### `md` (Mediano - Default)
- Padding: `clamp(12px, 2.5vw, 24px)` → `tablet: clamp(24px, 3vw, 32px)` → `desktop: clamp(32px, 4vw, 48px)`
- Gap: `clamp(16px, 2.5vh, 24px)` → `tablet: clamp(24px, 3vh, 32px)`

### `lg` (Grande)
- Padding: `clamp(16px, 3vw, 32px)` → `tablet: clamp(32px, 4vw, 48px)` → `desktop: clamp(48px, 5vw, 64px)`
- Gap: `clamp(20px, 3vh, 28px)`

## Estilos Base

El componente incluye automáticamente:
- `flex-1 min-h-0`: Permite que el contenedor ocupe espacio disponible
- `flex flex-col`: Layout vertical flexible
- `items-center justify-start`: Alineación de elementos
- `w-full`: Ancho completo
- `overflow-hidden`: Oculta contenido que desborde

## Uso Básico

```tsx
import { ContentShell } from '@/components/ui/content-shell';

<ContentShell>
  <header>Header</header>
  <main>Contenido</main>
  <footer>Footer</footer>
</ContentShell>
```

## Con Escala Personalizada

```tsx
<ContentShell scale="lg">
  {/* Contenido con más espacio */}
</ContentShell>
```

## Como Otro Elemento HTML

```tsx
<ContentShell as="main" scale="sm">
  <article>Contenido</article>
</ContentShell>
```

## Casos de Uso

- Contenedores principales de pantallas
- Layouts que requieren padding y gap responsivos
- Organización de contenido con espaciado consistente

## Notas Técnicas

- Utiliza `class-variance-authority` (CVA) para la gestión de variantes
- Los valores de `clamp()` aseguran escalado fluido entre breakpoints
- Compatible con todos los breakpoints del sistema: `tablet`, `desktop`
- Diseñado para trabajar en conjunto con `PageContainer` y otros componentes de layout

