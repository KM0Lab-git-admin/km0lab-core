# Carousel

Sistema de carrusel genérico y reutilizable para navegación de slides con soporte para drag/swipe, navegación con flechas y dots.

## Componentes

### `useCarousel` (Hook)

Hook que encapsula toda la lógica del carrusel:
- Estado del slide actual
- Drag offset y detección de arrastre
- Handlers para touch y mouse
- Navegación (next, prev, goTo, skipToEnd)

```tsx
import { useCarousel } from '@/components/ui/carousel';

const { currentIndex, dragOffset, isDragging, next, prev, isLast } = useCarousel({
  totalSlides: 5,
  initialIndex: 0,
  maxDrag: 100,
  threshold: 50,
});
```

### `CarouselViewport`

Contenedor que recorta el track y maneja los gestos de arrastre.

```tsx
<CarouselViewport
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  onMouseDown={handleMouseDown}
  ariaLabel="Mi carrusel"
>
  <CarouselTrack>...</CarouselTrack>
</CarouselViewport>
```

### `CarouselTrack`

Track horizontal que contiene los slides y aplica la transformación translateX.

```tsx
<CarouselTrack
  currentIndex={currentIndex}
  dragOffset={dragOffset}
  isDragging={isDragging}
>
  {slides.map((slide) => (
    <CarouselSlide key={slide.id}>...</CarouselSlide>
  ))}
</CarouselTrack>
```

### `CarouselSlide`

Contenedor individual de cada slide con soporte para layouts:
- `stack`: Layout vertical (imagen arriba, texto abajo)
- `side`: Layout horizontal (imagen izquierda, texto derecha) - activo en `laptop-short`

```tsx
<CarouselSlide layout="side" slideId="slide-1" isActive={index === currentIndex}>
  <HeroSlide ... />
</CarouselSlide>
```

## Ejemplo completo

```tsx
import {
  useCarousel,
  CarouselViewport,
  CarouselTrack,
  CarouselSlide,
} from '@/components/ui/carousel';

const MyCarousel = () => {
  const {
    currentIndex,
    dragOffset,
    isDragging,
    next,
    prev,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
  } = useCarousel({ totalSlides: slides.length });

  return (
    <CarouselViewport
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      <CarouselTrack
        currentIndex={currentIndex}
        dragOffset={dragOffset}
        isDragging={isDragging}
      >
        {slides.map((slide, index) => (
          <CarouselSlide key={slide.id} isActive={index === currentIndex}>
            {/* Contenido del slide */}
          </CarouselSlide>
        ))}
      </CarouselTrack>
    </CarouselViewport>
  );
};
```

## Breakpoints y Layouts

El sistema soporta 2 plantillas de layout:

| Breakpoint | Layout | Descripción |
|------------|--------|-------------|
| Default | `stack` | Vertical: imagen arriba, texto abajo |
| `laptop-short` | `side` | Horizontal: imagen izquierda, texto derecha |

El layout `side` se activa automáticamente en `laptop-short` (1280x550) para evitar scroll vertical.

