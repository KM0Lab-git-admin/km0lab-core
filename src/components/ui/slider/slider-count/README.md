# Slider Count

Inline count display for sliders with an optional action.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `current` | `number` | - | Current slide number |
| `total` | `number` | - | Total number of slides |
| `layout` | `'default' \| 'compact'` | `'default'` | Layout spacing |
| `size` | `'sm' \| 'md'` | `'md'` | Text size |
| `actionLabel` | `string` | - | Optional action label |
| `onAction` | `() => void` | - | Optional action handler (button is disabled without it) |
| `className` | `string` | - | Additional class names |

## Examples

```tsx
<SliderCount current={2} total={5} />
```

### With action

```tsx
<SliderCount current={1} total={3} actionLabel="Skip" onAction={onSkip} />
```

## States

- Default: shows current and total.
- Action: renders a button when `actionLabel` is provided (disabled without `onAction`).
