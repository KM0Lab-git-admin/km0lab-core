# MediaFrame

Componente de frame para imágenes con borde, sombra y badge opcional. Usado para encapsular imágenes hero en slides y cards.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `src` | `string` | - | URL de la imagen |
| `alt` | `string` | - | Texto alternativo |
| `bgColor` | `string` | `'bg-km0-yellow-100'` | Clase de color de fondo |
| `badgeText` | `string` | - | Texto del badge opcional |
| `badgeSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del badge |
| `layout` | `'stack' \| 'side'` | `'side'` | Layout que afecta el ancho |
| `maxHeight` | `'default' \| 'compact'` | `'default'` | Altura máxima de la imagen |
| `rounded` | `'sm' \| 'md' \| 'lg'` | `'sm'` | Radio de bordes |

## Uso básico

```tsx
import { MediaFrame } from '@/components/ui/media-frame';

<MediaFrame
  src="/images/product.png"
  alt="Producto destacado"
  bgColor="bg-km0-coral-100"
  badgeText="+ 10 XP"
  layout="side"
/>
```

## Estructura visual

```
┌─────────────────────────────┐
│ ┌─────────────────────────┐ │ ← Container (bgColor)
│ │                         │ │
│ │        Imagen           │ │ ← Inner frame (white + shadow)
│ │                         │ │
│ └─────────────────────────┘ │
│ [+ 10 XP]                   │ ← Badge (opcional)
└─────────────────────────────┘
```

## Responsive

El componente ajusta su ancho según el layout:
- `stack`: Ancho completo
- `side`: 40-45% del ancho en `laptop-short`

