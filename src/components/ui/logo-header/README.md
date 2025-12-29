# LogoHeader

Header genérico con logo centrado y padding responsivo. Útil para pantallas que requieren un header simple con el logo de KM0 Lab.

**Nota:** Este componente reemplaza a `AppHeader`. Por defecto se comporta igual que `AppHeader` (sin padding, sin escalado), pero ofrece opciones adicionales cuando se necesitan.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `scale` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` | Controla el padding bottom del header (`none` = sin padding, como AppHeader) |
| `logoScale` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` | Controla el tamaño del logo (`none` = tamaño por defecto, como AppHeader) |
| `logoAlt` | `string` | `'KMØ LAB®'` | Texto alternativo para el logo (accesibilidad) |
| `as` | `'header' \| 'div' \| 'section'` | `'div'` | Elemento HTML a renderizar |
| `className` | `string` | - | Clases adicionales para personalización |

## Variantes de Escala

### Escala del Header (padding bottom)

- **none** (default): Sin padding - comportamiento idéntico a `AppHeader`
- **sm**: `clamp(8px, 1.5vh, 12px)`
- **md**: `clamp(12px, 2vh, 16px)` → `tablet: clamp(16px, 2.5vh, 24px)`
- **lg**: `clamp(16px, 2.5vh, 24px)` → `tablet: clamp(20px, 3vh, 32px)` → `desktop: clamp(24px, 3.5vh, 40px)`

### Escala del Logo

- **none** (default): Sin escalado - tamaño por defecto del `logo-1` (comportamiento idéntico a `AppHeader`)
- **sm**: `scale-[clamp(0.5, 8vw, 0.65)]`
- **md**: `scale-[clamp(0.6, 9vw, 0.75)]` → `tablet: scale-[clamp(0.7, 10vw, 0.85)]`
- **lg**: `scale-[clamp(0.7, 10vw, 0.85)]` → `tablet: scale-[clamp(0.8, 11vw, 0.95)]` → `desktop: scale-[clamp(0.85, 12vw, 1)]`

## Estilos Base

El componente incluye automáticamente:
- `flex items-center justify-center`: Centra el logo horizontalmente
- `shrink-0`: Evita que el header se comprima
- Logo con clase `logo-1`: Utiliza el sprite de logos del sistema

## Uso Básico

```tsx
import { LogoHeader } from '@/components/ui/logo-header';

// Comportamiento idéntico a AppHeader (sin padding, sin escalado)
<LogoHeader />

// Con padding y escalado responsivo
<LogoHeader scale="md" logoScale="md" />
```

## Con Escalas Personalizadas

```tsx
<LogoHeader 
  scale="lg" 
  logoScale="md" 
  logoAlt="KM0 Lab - Tu comercio local"
/>
```

## Como Otro Elemento HTML

```tsx
<LogoHeader as="div" scale="sm">
  {/* El logo se renderiza dentro del div */}
</LogoHeader>
```

## Casos de Uso

- Headers de pantallas de onboarding
- Headers de pantallas de bienvenida
- Cualquier pantalla que requiera un header simple con logo centrado

## Notas Técnicas

- Utiliza `class-variance-authority` (CVA) para la gestión de variantes
- El logo utiliza el sprite `logo-1` definido en el sistema de diseño global
- La escala del header y del logo son independientes para mayor flexibilidad
- Compatible con todos los breakpoints del sistema: `tablet`, `desktop`
- Incluye atributos de accesibilidad (`role="img"`, `aria-label`)

