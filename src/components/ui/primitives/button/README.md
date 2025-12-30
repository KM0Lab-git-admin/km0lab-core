# Button Component

Componente de botón implementado usando `class-variance-authority` (CVA) y Radix UI Slot, con soporte para múltiples variantes visuales, tamaños y estados.

## Características

El componente Button proporciona una interfaz de botón flexible y accesible con las siguientes características:

- **Múltiples variantes visuales**: default, destructive, outline, secondary, ghost, link
- **Diferentes tamaños**: xs, sm, default, lg, icon
- **Soporte para iconos**: iconos SVG integrados con estilos automáticos
- **Composición flexible**: soporte para `asChild` usando Radix Slot
- **Accesibilidad**: atributos ARIA apropiados, focus visible, soporte para estados invalid
- **Transiciones suaves**: animaciones entre estados
- **Diseño responsive**: se adapta al contenedor padre

## Uso Básico

```tsx
import { Button } from '@/components/ui/primitives/button';

// Botón simple
<Button>Click me</Button>

// Botón con onClick
<Button onClick={() => console.log('Clicked')}>
  Click me
</Button>

// Botón con tipo específico
<Button type="submit">Enviar</Button>
```

## Variantes

### Default

```tsx
<Button variant="default">
  Botón principal
</Button>
```

### Destructive

```tsx
<Button variant="destructive">
  Eliminar
</Button>
```

### Outline

```tsx
<Button variant="outline">
  Cancelar
</Button>
```

### Secondary

```tsx
<Button variant="secondary">
  Secundario
</Button>
```

### Ghost

```tsx
<Button variant="ghost">
  Sin fondo
</Button>
```

### Link

```tsx
<Button variant="link">
  Ver más
</Button>
```

## Tamaños

### Extra Small (xs)

```tsx
<Button size="xs">
  Pequeño
</Button>
```

### Small (sm)

```tsx
<Button size="sm">
  Pequeño
</Button>
```

### Default

```tsx
<Button size="default">
  Normal
</Button>
```

### Large (lg)

```tsx
<Button size="lg">
  Grande
</Button>
```

### Icon

```tsx
<Button size="icon">
  <svg>...</svg>
</Button>
```

## Estados

### Estado Deshabilitado

```tsx
<Button disabled>
  Deshabilitado
</Button>
```

### Con Icono

```tsx
<Button>
  <svg width="16" height="16">...</svg>
  Con icono
</Button>
```

### Composición con asChild

```tsx
import { Link } from 'next/link';

<Button asChild>
  <Link href="/dashboard">Ir al dashboard</Link>
</Button>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Variante visual del botón que determina colores de fondo, texto y bordes |
| `size` | `'xs' \| 'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | Tamaño del botón que controla altura, padding y tamaño de fuente |
| `disabled` | `boolean` | `false` | Deshabilita el botón (aplica `disabled:pointer-events-none` y `disabled:opacity-50`) |
| `asChild` | `boolean` | `false` | Si es `true`, usa `Slot` de Radix para renderizar el botón como hijo (útil para composición con otros componentes) |
| `className` | `string` | - | Clases CSS adicionales que se combinan con las variantes |

Además, acepta todas las props estándar de `<button>` de HTML (onClick, type, aria-label, tabIndex, onKeyDown, etc.).

## Variantes de Estilo

### Default
- Fondo: `bg-primary` con texto `text-primary-foreground`
- Hover: `hover:bg-primary/90`
- Uso: Botones de acción principal

### Destructive
- Fondo: `bg-destructive` con texto blanco
- Hover: `hover:bg-destructive/90`
- Focus ring: `focus-visible:ring-destructive/20` (dark mode: `dark:focus-visible:ring-destructive/40`)
- Dark mode: `dark:bg-destructive/60`
- Uso: Acciones destructivas (eliminar, cancelar operaciones críticas)

### Outline
- Fondo: `bg-background` con borde
- Hover: `hover:bg-accent hover:text-accent-foreground`
- Dark mode: `dark:bg-input/30 dark:border-input dark:hover:bg-input/50`
- Uso: Acciones secundarias con borde visible

### Secondary
- Fondo: `bg-km0-yellow-500` con texto `text-km0-blue-700`
- Hover: `hover:bg-km0-yellow-400`
- Uso: Acciones secundarias con colores de marca

### Ghost
- Sin fondo por defecto
- Hover: `hover:bg-accent hover:text-accent-foreground`
- Dark mode: `dark:hover:bg-accent/50`
- Uso: Acciones terciarias, botones en toolbars

### Link
- Estilo de texto: `text-primary`
- Hover: `hover:underline` con `underline-offset-4`
- Uso: Acciones que se ven como enlaces

## Tamaños Detallados

### Extra Small (xs)
- Altura: `h-6` (24px)
- Padding: `px-2` (8px horizontal)
- Gap: `gap-1` (4px)
- Texto: `text-xs`
- Border radius: `rounded`
- Padding con icono: `has-[>svg]:px-1.5`

### Small (sm)
- Altura: `h-8` (32px)
- Padding: `px-3` (12px horizontal)
- Gap: `gap-1.5` (6px)
- Border radius: `rounded-md`
- Padding con icono: `has-[>svg]:px-2.5`

### Default
- Altura: `h-9` (36px)
- Padding: `px-4 py-2` (16px horizontal, 8px vertical)
- Gap: `gap-2` (8px)
- Padding con icono: `has-[>svg]:px-3`

### Large (lg)
- Altura: `h-10` (40px)
- Padding: `px-6` (24px horizontal)
- Border radius: `rounded-md`
- Padding con icono: `has-[>svg]:px-4`

### Icon
- Tamaño: `size-9` (36px × 36px, cuadrado)
- Border radius: `rounded-md`
- Uso: Botones que solo contienen un icono

## Accesibilidad

El componente implementa las siguientes prácticas de accesibilidad:

- **Focus visible**: Ring de 3px con `focus-visible:ring-[3px]` y color `ring-ring/50`
- **Estados invalid**: Soporte para `aria-invalid` con ring destructivo (`aria-invalid:ring-destructive/20`)
- **Deshabilitado**: `disabled:pointer-events-none` y `disabled:opacity-50` para deshabilitar completamente las interacciones
- **Navegación por teclado**: Soporte completo para Enter y Espacio (props estándar de HTML button)
- **Iconos**: Los iconos SVG tienen `pointer-events-none` para no interferir con la interacción
- **Atributos ARIA**: Acepta todos los atributos ARIA estándar (`aria-label`, `aria-describedby`, etc.)

## Ejemplos Completos

### Formulario de Login

```tsx
function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Lógica de login...
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Inputs del formulario */}
      
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="default"
          disabled={isLoading}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </div>
    </form>
  );
}
```

### Botón de Eliminación con Confirmación

```tsx
function DeleteButton({ itemId }: { itemId: string }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    // Lógica de eliminación...
    setShowConfirm(false);
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => {
        if (showConfirm) {
          handleDelete();
        } else {
          setShowConfirm(true);
        }
      }}
      aria-label="Eliminar elemento"
    >
      {showConfirm ? 'Confirmar eliminación' : 'Eliminar'}
    </Button>
  );
}
```

### Botón con Icono

```tsx
function DownloadButton() {
  return (
    <Button variant="secondary" size="lg">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Descargar
    </Button>
  );
}
```

### Botón como Enlace (con Next.js Link)

```tsx
import { Link } from 'next/link';

function NavigationButton() {
  return (
    <Button asChild variant="link">
      <Link href="/dashboard">
        Ir al dashboard
      </Link>
    </Button>
  );
}
```

### Botón Icono Solo

```tsx
function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={onClose}
      aria-label="Cerrar"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </Button>
  );
}
```

### Botón en Toolbar

```tsx
function Toolbar() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm">
        Editar
      </Button>
      <Button variant="ghost" size="sm">
        Compartir
      </Button>
      <Button variant="ghost" size="icon" aria-label="Más opciones">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      </Button>
    </div>
  );
}
```

## Notas de Implementación

- El componente usa `class-variance-authority` (CVA) para gestionar las variantes y tamaños
- Los estilos están basados en Tailwind CSS
- Usa `@radix-ui/react-slot` para soportar composición con `asChild`
- Los iconos SVG se estilizan automáticamente: `[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4`
- El padding se ajusta automáticamente cuando hay iconos usando `has-[>svg]:px-*`
- El componente tiene `shrink-0` para evitar que se comprima en flex containers
- El focus ring usa `focus-visible` para solo mostrarse en navegación por teclado
- Soporte para dark mode en variantes `destructive` y `outline`

## Estructura de Archivos

```
button/
├── button.tsx          # Código del componente
├── button.styles.ts    # Variantes de CVA (buttonVariants)
├── index.ts            # Exportación limpia
└── README.md           # Documentación técnica
```

