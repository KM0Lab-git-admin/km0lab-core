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

## Layouts

1.  **stack (default)**: El marco ocupa el ancho disponible. Ideal para contenedores fluidos.
2.  **side**: El marco ocupa un ancho fijo/proporcional (aprox. 40-45%) diseñado para layouts horizontales.

## Uso Básico

```tsx
import { MediaFrame } from '@/components/ui/media-frame';

<MediaFrame 
  src="/path/to/image.png" 
  badgeText="+ 10 XP" 
  radius="xl"
/>
```

## Con Children (Next.js Image)

```tsx
<MediaFrame badgeText="Nuevo" layout="side">
  <Image src="..." width={500} height={300} alt="..." />
</MediaFrame>
```
