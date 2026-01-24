# TitleSubtitle

Componente de composición que agrupa un **título** y un **subtítulo** opcional. Útil para encabezados de sección, pantallas o tarjetas.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `ReactNode` | requerido | Título principal |
| `subtitle` | `ReactNode` | `undefined` | Subtítulo opcional (no se renderiza si no se pasa) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Escala de tipografía (afecta Title y Subtitle) |
| `align` | `'left' \| 'center'` | `'center'` | Alineación del texto |
| `spacing` | `'sm' \| 'md' \| 'lg'` | `'md'` | Gap entre título y subtítulo |
| `titleClassName` | `string` | - | Clases adicionales para el Title |
| `subtitleClassName` | `string` | - | Clases adicionales para el Subtitle |
| `subtitleTone` | `'default' \| 'muted'` | `'muted'` | Tono del subtítulo |

## Mapeo de Tamaños

| `size` | Title Size | Subtitle Size |
|--------|------------|---------------|
| `sm` | `h3` | `xs` |
| `md` | `h2` | `sm` |
| `lg` | `h1` | `md` |

## Comportamiento Responsive

El componente incluye soporte automático para `short-landscape` (pantallas en landscape con altura ≤ 550px), reduciendo los gaps para evitar scroll.

## Uso Básico

```tsx
import { TitleSubtitle } from '@/components/ui/title-subtitle';

// Con título y subtítulo
<TitleSubtitle
  title="Selecciona tu idioma"
  subtitle="¿Con qué idioma te gustaría empezar?"
/>

// Solo título
<TitleSubtitle
  title="Bienvenido"
  size="lg"
/>

// Con clases personalizadas
<TitleSubtitle
  title="Título personalizado"
  subtitle="Subtítulo"
  titleClassName="text-km0-blue-700"
  size="sm"
  align="left"
/>
```

## Notas Técnicas

- Utiliza internamente los primitives `Title` y `Subtitle`.
- El subtítulo no se renderiza si no se proporciona (no deja espacio vacío).
- Soporta todos los breakpoints del proyecto: `mobile-p`, `tablet`, `desktop`, `short-landscape`, etc.

