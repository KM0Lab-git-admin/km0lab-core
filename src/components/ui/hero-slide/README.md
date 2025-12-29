# HeroSlide

Componente de composición de alto nivel para presentaciones o secciones destacadas. Optimiza automáticamente el layout para pantallas en **landscape con altura corta** (`short-landscape`) sin necesidad de JavaScript.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `ReactNode` | - | Título principal (soporta JSX para énfasis) |
| `subtitle` | `ReactNode` | - | Subtítulo o descripción opcional |
| `imageSrc` | `string` | - | Fuente de la imagen |
| `imageAlt` | `string` | `""` | Texto alternativo de la imagen |
| `badgeText` | `string` | - | Texto del badge sobre la imagen |
| `bgColor` | `string` | - | Clase de color de fondo para el MediaFrame |
| `layout` | `'stack' \| 'side'` | `'stack'` | Comportamiento del layout (ver abajo) |
| `density` | `'default' \| 'compact'`| `'default'` | Controla espaciados internos |
| `align` | `'left' \| 'center'` | `'center'` | Alineación del texto en modo `stack` |

## Comportamiento de Layout

1.  **stack (default)**: Disposición vertical (imagen arriba, texto abajo). Al entrar en el breakpoint `short-landscape` (orientation: landscape AND max-height: 550px), cambia **automáticamente** a disposición horizontal vía CSS para evitar scroll.
2.  **side**: Fuerza la disposición horizontal en todos los breakpoints.

### Breakpoint `short-landscape`

Este breakpoint captura SOLO las siguientes resoluciones:
- ✅ **667×375** (móvil en landscape)
- ✅ **1280×550** (laptop con altura corta)
- ❌ **1440×900** (desktop normal - NO aplica)
- ❌ **1920×1080** (ultra-wide - NO aplica)

## Uso Básico

```tsx
import { HeroSlide } from '@/components/ui/hero-slide';

<HeroSlide
  title={<>BIENVENIDO <span className="text-brand">A KM0 LAB</span></>}
  subtitle="Tu comercio local más cerca que nunca."
  imageSrc="/welcome.png"
  badgeText="+10 XP"
/>
```

## Notas Técnicas
- Utiliza internamente los primitives `Title` y `Subtitle`.
- Utiliza `MediaFrame` para el manejo de la imagen y el badge.
- En `short-landscape` se reduce el tamaño de fuente, los gaps y la imagen para caber sin scroll.
