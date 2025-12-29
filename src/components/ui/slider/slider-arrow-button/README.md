# Slider Arrow Button

Accessible arrow button for slider navigation (previous/next).

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `'prev' \| 'next'` | - | Arrow direction |
| `ariaLabel` | `string` | - | Screen reader label |
| `size` | `'sm' \| 'md'` | `'md'` | Button size |
| `variant` | `'ghost' \| 'solid'` | `'ghost'` | Visual style |
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | - | Additional class names |
| `onClick` | `() => void` | - | Click handler |

## Examples

```tsx
<SliderArrowButton direction="prev" ariaLabel="Previous" onClick={onPrev} />
<SliderArrowButton direction="next" ariaLabel="Next" variant="solid" onClick={onNext} />
```

### Sizes

```tsx
<SliderArrowButton direction="prev" ariaLabel="Prev" size="sm" />
<SliderArrowButton direction="prev" ariaLabel="Prev" size="md" />
```

## States

- Default: interactive arrow button.
- Disabled: set `disabled` to block interaction and reduce opacity.
