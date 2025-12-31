# LanguageButton Component

Componente de botón especializado para selección de idioma, que extiende el componente `Button` base con soporte para bandera, título, subtítulo y flecha de navegación.

## Características

El componente LanguageButton proporciona una interfaz de botón especializada con las siguientes características:

- **Extiende Button**: Hereda todas las variantes visuales y tamaños del componente Button base
- **Bandera de idioma**: Muestra una imagen de bandera a la izquierda
- **Título y subtítulo**: Texto principal y secundario con estilos apropiados
- **Flecha de navegación**: Icono ChevronRight a la derecha indicando acción
- **Responsive**: Se adapta al contenedor padre y trunca texto largo
- **Accesibilidad**: Hereda todas las características de accesibilidad del Button base

## Uso Básico

```tsx
import { LanguageButton } from '@/components/ui/primitives/language-button';

// Botón de idioma simple
<LanguageButton
  flagSrc="/assets/images/spanish_flag.png"
  flagAlt="Bandera de España"
  title="Español"
  subtitle="Anquim idioma vos cum ansa"
  onClick={() => console.log('Idioma seleccionado')}
/>

// Con bandera catalana
<LanguageButton
  flagSrc="/assets/images/catalan_flag.png"
  flagAlt="Bandera de Cataluña"
  title="Català"
  subtitle="Anquim idioma vos cum ansa"
  variant="outline"
/>
```

## Variantes

El componente hereda todas las variantes del Button base:

### Default

```tsx
<LanguageButton
  flagSrc="/assets/images/spanish_flag.png"
  flagAlt="España"
  title="Español"
  subtitle="Anquim idioma vos cum ansa"
  variant="default"
/>
```

### Outline

```tsx
<LanguageButton
  flagSrc="/assets/images/spanish_flag.png"
  flagAlt="España"
  title="Español"
  subtitle="Anquim idioma vos cum ansa"
  variant="outline"
/>
```

### Secondary

```tsx
<LanguageButton
  flagSrc="/assets/images/spanish_flag.png"
  flagAlt="España"
  title="Español"
  subtitle="Anquim idioma vos cum ansa"
  variant="secondary"
/>
```

### Ghost

```tsx
<LanguageButton
  flagSrc="/assets/images/spanish_flag.png"
  flagAlt="España"
  title="Español"
  subtitle="Anquim idioma vos cum ansa"
  variant="ghost"
/>
```

### Destructive

```tsx
<LanguageButton
  flagSrc="/assets/images/spanish_flag.png"
  flagAlt="España"
  title="Español"
  subtitle="Anquim idioma vos cum ansa"
  variant="destructive"
/>
```

### Link

```tsx
<LanguageButton
  flagSrc="/assets/images/spanish_flag.png"
  flagAlt="España"
  title="Español"
  subtitle="Anquim idioma vos cum ansa"
  variant="link"
/>
```

## Tamaños

El componente hereda todos los tamaños del Button base:

### Extra Small (xs)

```tsx
<LanguageButton
  flagSrc="/assets/images/spanish_flag.png"
  flagAlt="España"
  title="Español"
  subtitle="Anquim idioma vos cum ansa"
  size="xs"
/>
```

### Small (sm)

```tsx
<LanguageButton
  flagSrc="/assets/images/spanish_flag.png"
  flagAlt="España"
  title="Español"
  subtitle="Anquim idioma vos cum ansa"
  size="sm"
/>
```

### Default

```tsx
<LanguageButton
  flagSrc="/assets/images/spanish_flag.png"
  flagAlt="España"
  title="Español"
  subtitle="Anquim idioma vos cum ansa"
  size="default"
/>
```

### Large (lg)

```tsx
<LanguageButton
  flagSrc="/assets/images/spanish_flag.png"
  flagAlt="España"
  title="Español"
  subtitle="Anquim idioma vos cum ansa"
  size="lg"
/>
```

## Estados

### Estado Deshabilitado

```tsx
<LanguageButton
  flagSrc="/assets/images/spanish_flag.png"
  flagAlt="España"
  title="Español"
  subtitle="Anquim idioma vos cum ansa"
  disabled
/>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `flagSrc` | `string \| StaticImageData` | - | **Requerido.** Ruta o StaticImageData de la bandera del idioma |
| `flagAlt` | `string` | - | **Requerido.** Texto alternativo para la bandera (accesibilidad) |
| `title` | `string` | - | **Requerido.** Título principal del botón (nombre del idioma) |
| `subtitle` | `string` | - | **Requerido.** Subtítulo del botón (descripción o texto auxiliar) |
| `flagWidth` | `number` | `24` | Ancho de la bandera en píxeles |
| `flagHeight` | `number` | `24` | Alto de la bandera en píxeles |
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Variante visual del botón (heredada de Button) |
| `size` | `'xs' \| 'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | Tamaño del botón (heredado de Button) |
| `disabled` | `boolean` | `false` | Deshabilita el botón |
| `className` | `string` | - | Clases CSS adicionales |

Además, acepta todas las props estándar de `<button>` de HTML (onClick, type, aria-label, tabIndex, onKeyDown, etc.) y todas las props del componente Button base.

## Estructura Visual

El componente tiene la siguiente estructura interna:

```
[Bandera] [Título]        [Flecha →]
          [Subtítulo]
```

- **Bandera**: Imagen circular a la izquierda (24x24px por defecto)
- **Título**: Texto en negrita (`font-semibold text-sm`)
- **Subtítulo**: Texto más pequeño y con color muted (`text-xs text-muted-foreground`)
- **Flecha**: Icono ChevronRight a la derecha

## Comportamiento del Texto

- El título y subtítulo se truncan automáticamente si el texto es muy largo
- El layout usa `flex-1 min-w-0` para permitir que el texto ocupe el espacio disponible
- La bandera y la flecha son `shrink-0` para mantener su tamaño fijo

## Ejemplos Completos

### Selector de Idioma

```tsx
function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState('es');

  return (
    <div className="space-y-2">
      <LanguageButton
        flagSrc="/assets/images/spanish_flag.png"
        flagAlt="Bandera de España"
        title="Español"
        subtitle="Anquim idioma vos cum ansa"
        variant={selectedLanguage === 'es' ? 'default' : 'outline'}
        onClick={() => setSelectedLanguage('es')}
      />
      <LanguageButton
        flagSrc="/assets/images/catalan_flag.png"
        flagAlt="Bandera de Cataluña"
        title="Català"
        subtitle="Anquim idioma vos cum ansa"
        variant={selectedLanguage === 'ca' ? 'default' : 'outline'}
        onClick={() => setSelectedLanguage('ca')}
      />
    </div>
  );
}
```

### Con Composición asChild

```tsx
import { Link } from 'next/link';

<LanguageButton
  asChild
  flagSrc="/assets/images/spanish_flag.png"
  flagAlt="España"
  title="Español"
  subtitle="Anquim idioma vos cum ansa"
>
  <Link href="/es">Español</Link>
</LanguageButton>
```

## Accesibilidad

El componente hereda todas las características de accesibilidad del Button base:

- **Focus visible**: Ring de 3px con `focus-visible:ring-[3px]`
- **Estados invalid**: Soporte para `aria-invalid`
- **Deshabilitado**: `disabled:pointer-events-none` y `disabled:opacity-50`
- **Navegación por teclado**: Soporte completo para Enter y Espacio
- **Atributos ARIA**: Acepta todos los atributos ARIA estándar
- **Texto alternativo**: Requiere `flagAlt` para la imagen de la bandera

## Notas

- El componente usa `next/image` para optimización de imágenes
- La bandera se renderiza con `rounded-full` para un estilo circular
- El layout interno usa flexbox para distribución del espacio
- El texto se trunca automáticamente para evitar desbordamientos

