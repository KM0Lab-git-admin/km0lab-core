# Title Component

Primitive heading component for brand titles with responsive sizing, tones, and alignment.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'` | HTML heading tag to render |
| `size` | `'h1' \| 'h2' \| 'h3' \| 'xl' \| 'lg' \| 'md' \| 'sm'` | `'h1'` | Visual size scale |
| `align` | `'left' \| 'center'` | `'left'` | Text alignment |
| `tone` | `'default' \| 'muted' \| 'brand'` | `'default'` | Color tone |
| `uppercase` | `boolean` | `false` | Enable uppercase styling |
| `className` | `string` | - | Additional class names |
| `children` | `ReactNode` | - | Title content |

## Examples

### Sizes

```tsx
<Title size="h1">Hero Title</Title>
<Title size="h2">Section Title</Title>
<Title size="h3">Subsection Title</Title>
<Title size="xl">XL Title</Title>
<Title size="lg">LG Title</Title>
<Title size="md">MD Title</Title>
<Title size="sm">SM Title</Title>
```

### Alignment + Tone

```tsx
<Title size="lg" align="left" tone="default">Left Default</Title>
<Title size="lg" align="center" tone="muted">Centered Muted</Title>
<Title size="lg" align="center" tone="brand">Centered Brand</Title>
```

### Uppercase

```tsx
<Title size="h2" uppercase>KM0 LAB</Title>
```

### Laptop-short adjustment

```tsx
<Title size="h1">
  This title scales down at the laptop-short breakpoint (1280x550).
</Title>
```

## Variants

- `size`: h1, h2, h3, xl, lg, md, sm
- `align`: left, center
- `tone`: default, muted, brand
- `uppercase`: true, false
