# ContentCard

Componente genérico de tarjeta de contenido con estilos responsivos. Incluye sombra, redondeado, fondo blanco y variantes de escala para diferentes contextos de uso.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `scale` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controla el tamaño del padding, gap y max-width responsivos |
| `as` | `'section' \| 'div' \| 'article' \| 'aside'` | `'section'` | Elemento HTML a renderizar |
| `className` | `string` | - | Clases adicionales para personalización |

## Variantes de Escala

Cada variante de `scale` ajusta automáticamente:
- **max-width**: Ancho máximo del contenedor
- **padding**: Espaciado interno con valores responsivos usando `clamp()`
- **gap**: Espaciado entre elementos hijos

### `sm` (Pequeño)
- Max-width: `clamp(280px, 90vw, 320px)`
- Padding: `clamp(12px, 2vw, 16px)`
- Gap: `clamp(12px, 2vh, 16px)`

### `md` (Mediano - Default)
- Max-width: `clamp(320px, 85vw, 565px)` → `tablet: clamp(500px, 80vw, 700px)` → `desktop: clamp(800px, 75vw, 1200px)`
- Padding: `clamp(16px, 2.5vw, 24px)` → `tablet: clamp(24px, 3vw, 32px)` → `desktop: clamp(32px, 4vw, 48px)`
- Gap: `clamp(16px, 2.5vh, 24px)` → `tablet: clamp(24px, 3vh, 32px)`

### `lg` (Grande)
- Max-width: `clamp(400px, 80vw, 700px)` → `tablet: clamp(600px, 75vw, 900px)` → `desktop: clamp(1000px, 70vw, 1400px)`
- Padding: `clamp(20px, 3vw, 28px)` → `tablet: clamp(32px, 4vw, 48px)` → `desktop: clamp(48px, 5vw, 64px)`
- Gap: `clamp(20px, 3vh, 28px)`

## Estilos Base

El componente incluye automáticamente:
- `w-full`: Ancho completo del contenedor padre
- `flex flex-col`: Layout vertical flexible
- `flex-1 min-h-0`: Permite que el contenedor ocupe espacio disponible
- `overflow-hidden`: Oculta contenido que desborde
- `rounded-xl`: Bordes redondeados
- `bg-white`: Fondo blanco
- `km0-card-shadow`: Sombra personalizada del sistema de diseño
- `mx-auto`: Centrado horizontal

## Uso Básico

```tsx
import { ContentCard } from '@/components/ui/content-card';

<ContentCard>
  <h2>Título</h2>
  <p>Contenido de la tarjeta</p>
</ContentCard>
```

## Con Escala Personalizada

```tsx
<ContentCard scale="lg">
  <HeroSlide ... />
</ContentCard>
```

## Como Otro Elemento HTML

```tsx
<ContentCard as="article" scale="sm">
  <header>...</header>
  <main>...</main>
</ContentCard>
```

## Casos de Uso

- Contenedores de contenido principal en pantallas de onboarding
- Tarjetas de información en dashboards
- Secciones destacadas en landing pages
- Contenedores de formularios o contenido interactivo

## Notas Técnicas

- Utiliza `class-variance-authority` (CVA) para la gestión de variantes
- Los valores de `clamp()` aseguran escalado fluido entre breakpoints
- Compatible con todos los breakpoints del sistema: `tablet`, `desktop`
- El elemento HTML por defecto es `section`, pero puede cambiarse según necesidades semánticas

