# NavigationFooter

Footer de navegación con tres slots equidistantes. Utiliza `justify-evenly` para garantizar que el espacio entre los elementos izquierdo-central y central-derecho sea siempre igual, independientemente del tamaño de cada elemento.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `scale` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controla el tamaño del padding y max-width responsivos |
| `left` | `React.ReactNode` | - | Elemento a renderizar en el slot izquierdo |
| `center` | `React.ReactNode` | - | Elemento a renderizar en el slot central |
| `right` | `React.ReactNode` | - | Elemento a renderizar en el slot derecho |
| `className` | `string` | - | Clases adicionales para personalización |

## Variantes de Escala

Cada variante de `scale` ajusta automáticamente:
- **max-width**: Ancho máximo del contenedor
- **padding-y**: Espaciado vertical con valores responsivos usando `clamp()`

### `sm` (Pequeño)
- Max-width: `clamp(280px, 95vw, 360px)`
- Padding-y: `clamp(12px, 2vh, 16px)`

### `md` (Mediano - Default)
- Max-width: `clamp(320px, 90vw, 512px)` → `tablet: clamp(480px, 85vw, 640px)` → `desktop: clamp(768px, 80vw, 1024px)`
- Padding-y: `clamp(16px, 2.5vh, 20px)` → `tablet: clamp(20px, 3vh, 28px)`

### `lg` (Grande)
- Max-width: `clamp(360px, 85vw, 560px)` → `tablet: clamp(560px, 80vw, 768px)` → `desktop: clamp(800px, 75vw, 1200px)`
- Padding-y: `clamp(20px, 3vh, 28px)`

## Estilos Base

El componente incluye automáticamente:
- `shrink-0`: No se encoge en contextos flex
- `w-full`: Ancho completo del contenedor padre
- `flex items-center`: Layout horizontal con alineación vertical centrada
- `justify-evenly`: Distribución equidistante entre todos los slots

## Uso Básico

```tsx
import { NavigationFooter } from '@/components/ui/navigation-footer';

<NavigationFooter
  left={<span>1/5</span>}
  center={<SliderDots total={5} current={0} />}
  right={<Button>SALTAR</Button>}
/>
```

## Con Escala Personalizada

```tsx
<NavigationFooter
  scale="lg"
  left={<SliderCount current={1} total={5} />}
  center={<SimpleSliderNavigation ... />}
  right={<Button size="lg">CONTINUAR</Button>}
/>
```

## Ejemplo Completo (Onboarding)

```tsx
import { NavigationFooter } from '@/components/ui/navigation-footer';
import { SimpleSliderNavigation } from '@/components/ui/slider';
import { Button } from '@/components/ui/primitives/button';

<NavigationFooter
  scale="md"
  left={(
    <div className="text-km0-blue-700 font-bold text-sm">
      {currentIndex + 1}/{totalSlides}
    </div>
  )}
  center={(
    <SimpleSliderNavigation
      currentSlide={currentIndex}
      totalSlides={totalSlides}
      onPrev={handlePrev}
      onNext={handleNext}
      layout="compact"
    />
  )}
  right={(
    <Button onClick={handleAction}>
      {isLast ? 'EMPEZAR' : 'SALTAR'}
    </Button>
  )}
/>
```

## Casos de Uso

- Footers de navegación en flujos de onboarding
- Controles de slider/carrusel con contador y botón de acción
- Barras de navegación con elementos distribuidos equitativamente
- Cualquier layout que requiera tres elementos con espaciado uniforme

## Notas Técnicas

- Utiliza `class-variance-authority` (CVA) para la gestión de variantes
- Los valores de `clamp()` aseguran escalado fluido entre breakpoints
- Compatible con todos los breakpoints del sistema: `tablet`, `desktop`
- Renderiza un elemento `<footer>` semántico por defecto
- Cada slot está envuelto en un `<div>` con `shrink-0` para evitar compresión

## Diferencia con justify-between

A diferencia de `justify-between` (que distribuye el espacio sobrante entre los elementos), `justify-evenly` garantiza que:
- El espacio entre el borde izquierdo y el primer elemento
- El espacio entre elementos
- El espacio entre el último elemento y el borde derecho

Sean todos **exactamente iguales**, proporcionando una distribución visual perfectamente equilibrada.

