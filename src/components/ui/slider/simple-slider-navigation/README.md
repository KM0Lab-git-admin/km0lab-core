# Simple Slider Navigation

Compact slider navigation with arrows and dots.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `currentSlide` | `number` | - | Current slide index (0-based) |
| `totalSlides` | `number` | - | Total number of slides |
| `onPrev` | `() => void` | - | Previous handler |
| `onNext` | `() => void` | - | Next handler |
| `layout` | `'default' \| 'compact'` | `'default'` | Layout density |
| `showDots` | `boolean` | `true` | Toggle dot indicators |
| `showArrows` | `boolean` | `true` | Toggle arrow buttons |
| `disabledPrev` | `boolean` | - | Force disable previous arrow |
| `disabledNext` | `boolean` | - | Force disable next arrow |
| `onDotSelect` | `(index: number) => void` | - | Optional dot selection handler |
| `arrowVariant` | `'ghost' \| 'solid'` | `'ghost'` | Arrow button style |
| `dotsTone` | `'default' \| 'brand'` | `'default'` | Dots color tone |
| `className` | `string` | - | Additional class names |

## Examples

```tsx
<SimpleSliderNavigation
  currentSlide={1}
  totalSlides={4}
  onPrev={handlePrev}
  onNext={handleNext}
/>
```

### Compact layout + no dots

```tsx
<SimpleSliderNavigation
  currentSlide={0}
  totalSlides={3}
  onPrev={handlePrev}
  onNext={handleNext}
  layout="compact"
  showDots={false}
/>
```

## States

- Default: arrows + dots enabled.
- Disabled: use `disabledPrev` / `disabledNext` at the edges.
- Interactive dots: pass `onDotSelect` to enable selection.
