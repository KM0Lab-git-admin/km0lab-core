# HeroSlide

Componente de slide hero con imagen enmarcada y título/subtítulo. Diseñado para ser usado dentro de un carrusel.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `titleLine1` | `string` | - | Primera línea del título |
| `titleLine2` | `string` | - | Segunda línea del título |
| `subtitle` | `string` | - | Texto descriptivo |
| `imageSrc` | `string` | - | URL de la imagen |
| `bgColor` | `string` | `'bg-km0-yellow-100'` | Clase de color de fondo para el frame |
| `badgeText` | `string` | - | Texto del badge (ej: '+ 10 XP') |
| `layout` | `'stack' \| 'side'` | `'side'` | Layout del contenido |
| `size` | `'default' \| 'compact'` | `'default'` | Tamaño de tipografía |

## Uso básico

```tsx
import { HeroSlide } from '@/components/ui/hero-slide';

<HeroSlide
  titleLine1="BIENVENIDO"
  titleLine2="A KM0 LAB"
  subtitle="Tu comercio local, más cerca que nunca."
  imageSrc="/images/welcome.png"
  bgColor="bg-km0-yellow-100"
  badgeText="+ 10 XP"
  layout="side"
/>
```

## Layouts

### Stack (vertical)
- Imagen arriba
- Texto centrado abajo
- Por defecto en móvil y tablet

### Side (horizontal)
- Imagen a la izquierda
- Texto a la derecha
- Se activa en `laptop-short` para ahorrar altura

## Breakpoints

El componente respeta los breakpoints del proyecto:
- `mobile-p`, `mobile-l`: Layout stack
- `tablet`: Layout stack
- `laptop-short`: Layout side (horizontal)
- `desktop`, `ultra-wide`: Layout side

