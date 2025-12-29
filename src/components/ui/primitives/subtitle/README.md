# Subtitle Component

Primitive subtitle/text component for UI copy with responsive sizing, tones, and alignment.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `'p' \| 'span'` | `'p'` | HTML tag to render |
| `size` | `'lg' \| 'md' \| 'sm' \| 'xs'` | `'md'` | Visual size scale |
| `align` | `'left' \| 'center'` | `'left'` | Text alignment |
| `tone` | `'default' \| 'muted'` | `'default'` | Color tone |
| `className` | `string` | - | Additional class names |
| `children` | `ReactNode` | - | Subtitle content |

## Examples

### Sizes

```tsx
<Subtitle size="lg">Large subtitle</Subtitle>
<Subtitle size="md">Medium subtitle</Subtitle>
<Subtitle size="sm">Small subtitle</Subtitle>
<Subtitle size="xs">Extra small subtitle</Subtitle>
```

### Alignment + Tone

```tsx
<Subtitle size="md" align="left" tone="default">Left Default</Subtitle>
<Subtitle size="md" align="center" tone="muted">Centered Muted</Subtitle>
```

### Laptop-short adjustment

```tsx
<Subtitle size="lg">
  This subtitle scales down at the laptop-short breakpoint (1280x550).
</Subtitle>
```

## Variants

- `size`: lg, md, sm, xs
- `align`: left, center
- `tone`: default, muted
