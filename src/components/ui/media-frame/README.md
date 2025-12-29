# MediaFrame

Primitive UI para enmarcar imágenes o contenido multimedia con soporte para badges informativos, sombras y radios de borde personalizables.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `layout` | `'stack' \| 'side'` | `'stack'` | Controla el ancho del contenedor |
| `src` | `string` | - | Fuente de la imagen (opcional si se usa children) |
| `alt` | `string` | `""` | Texto alternativo |
| `badgeText` | `string` | - | Texto para el badge informativo |
| `badgePosition`| `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-left'` | Posición del badge |
| `radius` | `'md' \| 'lg' \| 'xl'` | `'lg'` | Radio de los bordes |
| `shadow` | `'none' \| 'sm' \| 'md'` | `'sm'` | Intensidad de la sombra |
| `tone` | `'default' \| 'soft'` | `'default'` | Estilo visual del fondo |
| `imageMaxHeight` | `'fluid' \| 'compact' \| 'full'` | `'fluid'` | Controla el `max-height` aplicado a la imagen interna (usa dvh + clamp) |

## Layouts

1.  **stack (default)**: El marco ocupa el ancho disponible. Ideal para contenedores fluidos.
2.  **side**: El marco ocupa un ancho fijo/proporcional (aprox. 40-45%) diseñado para layouts horizontales.

## Escalado fluido

- **Tokens**: los tamaños del frame usan `clamp()` para el ancho (`max-w-[clamp(240px,80vw,560px)]`) y `short-landscape:flex-[0_0_42%]` para layouts horizontales.
- **Imagen**: por defecto se renderiza con `next/image` y el variant `imageMaxHeight="fluid"` aplica `clamp(220px,45vh,420px)` + `short-landscape:max-h-[clamp(180px,55dvh,320px)]`.
- **Compact**: selecciona `imageMaxHeight="compact"` para pantallas bajas o contenedores side.

## Uso Básico

```tsx
import { MediaFrame } from '@/components/ui/media-frame';

<MediaFrame 
  src="/path/to/image.png" 
  badgeText="+ 10 XP" 
  radius="xl"
/>
```

> **Tip**: puedes sobrescribir la imagen usando `children`. Si usas `next/image`, recuerda respetar `className={imageVariants(...)}` para mantener el escalado.
