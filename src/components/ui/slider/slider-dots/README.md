# Slider Dots

Dot indicators for slider progress and optional dot selection.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `total` | `number` | - | Total dots to render |
| `current` | `number` | - | Active dot index (0-based) |
| `size` | `'sm' \| 'md'` | `'md'` | Dot size preset |
| `tone` | `'default' \| 'brand'` | `'default'` | Color tone |
| `onSelect` | `(index: number) => void` | - | Enable interactive dots |
| `ariaLabel` | `string` | - | Accessible label for the group |
| `className` | `string` | - | Additional class names |

## Examples

```tsx
<SliderDots total={5} current={2} />
<SliderDots total={4} current={1} tone="brand" />
```

### Interactive

```tsx
<SliderDots total={4} current={current} onSelect={setCurrent} />
```

## States

- Default: renders non-interactive progress dots.
- Active: the current dot uses the active style.
- Interactive: pass `onSelect` to enable focus/hover styles and selection.
