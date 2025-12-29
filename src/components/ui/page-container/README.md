# PageContainer

Contenedor de página genérico con fondo degradado y altura completa. Útil para pantallas completas que requieren un fondo degradado blanco-beige.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `as` | `'div' \| 'main' \| 'section'` | `'div'` | Elemento HTML a renderizar |
| `className` | `string` | - | Clases adicionales para personalización |

## Estilos Base

El componente incluye automáticamente:
- `w-full`: Ancho completo
- `h-dvh-fallback`: Altura completa de la ventana (con fallback para navegadores que no soportan dvh)
- `flex flex-col`: Layout vertical flexible
- `bg-gradient-white-beige`: Fondo degradado de blanco a beige
- `font-ui`: Fuente UI del sistema
- `overflow-hidden`: Oculta contenido que desborde

## Uso Básico

```tsx
import { PageContainer } from '@/components/ui/page-container';

<PageContainer>
  {/* Contenido de la página */}
</PageContainer>
```

## Como Otro Elemento HTML

```tsx
<PageContainer as="main">
  <h1>Título</h1>
  <p>Contenido</p>
</PageContainer>
```

## Casos de Uso

- Pantallas completas con fondo degradado
- Contenedores de página que requieren altura completa
- Layouts que necesitan un fondo específico del sistema de diseño

## Notas Técnicas

- Utiliza `h-dvh-fallback` que proporciona `100vh` como fallback y `100dvh` cuando está disponible
- El fondo degradado `bg-gradient-white-beige` está definido en el sistema de diseño global
- Compatible con todos los breakpoints del sistema

