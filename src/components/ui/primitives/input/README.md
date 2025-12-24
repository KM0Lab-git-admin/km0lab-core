# Input Component

Componente de campo de entrada (input field) implementado según el diseño de Figma, con soporte para múltiples estados, iconos y mensajes de validación.

## Características

El componente Input proporciona una interfaz de entrada de texto flexible y accesible con las siguientes características:

- **Múltiples estados visuales**: default, filled, error, disabled
- **Iconos opcionales**: soporte para iconos a la izquierda y/o derecha del campo
- **Mensajes de ayuda**: texto descriptivo o de error debajo del input
- **Accesibilidad**: atributos ARIA apropiados para estados de error
- **Transiciones suaves**: animaciones entre estados
- **Diseño responsive**: se adapta al contenedor padre

## Uso Básico

```tsx
import { Input } from '@/components/ui/primitives/input';

// Input simple
<Input placeholder="Email address" />

// Input con valor controlado
<Input 
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email address"
/>
```

## Con Iconos

```tsx
import { Input, EmailIcon, ChevronDownIcon } from '@/components/ui/primitives/input';

// Icono a la izquierda
<Input 
  placeholder="Email address"
  iconLeft={<EmailIcon />}
/>

// Icono a la derecha
<Input 
  placeholder="Select option"
  iconRight={<ChevronDownIcon />}
/>

// Ambos iconos
<Input 
  placeholder="Email address"
  iconLeft={<EmailIcon />}
  iconRight={<ChevronDownIcon />}
/>
```

## Estados

### Estado de Error

```tsx
<Input 
  placeholder="Email address"
  error
  message="Por favor ingresa un email válido"
/>
```

### Estado Deshabilitado

```tsx
<Input 
  placeholder="Email address"
  disabled
/>
```

### Con Mensaje de Ayuda

```tsx
<Input 
  placeholder="Email address"
  message="Usaremos tu email para contactarte"
/>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `'default' \| 'filled' \| 'error'` | `'default'` | Variante visual del input (se calcula automáticamente basado en `error` y `value`) |
| `error` | `boolean` | `false` | Indica si el input está en estado de error |
| `message` | `string` | - | Mensaje de ayuda o error que aparece debajo del input |
| `iconLeft` | `ReactNode` | - | Icono que aparece a la izquierda del texto |
| `iconRight` | `ReactNode` | - | Icono que aparece a la derecha del texto |
| `disabled` | `boolean` | `false` | Deshabilita el input |
| `className` | `string` | - | Clases CSS adicionales |

Además, acepta todas las props estándar de `<input>` de HTML.

## Iconos Incluidos

El componente exporta dos iconos predefinidos:

- `EmailIcon`: Icono de sobre/email
- `ChevronDownIcon`: Flecha hacia abajo para dropdowns

Puedes usar cualquier otro componente React como icono.

## Variantes de Color

### Default
- Fondo: blanco
- Borde: gris (#111112 con 20% opacidad)
- Texto: negro (#111113)
- Placeholder: gris (#111112 con 60% opacidad)

### Filled
- Fondo: verde menta (#8ed9d4 con 90% opacidad)
- Borde: gris (#111112 con 20% opacidad)
- Texto: negro (#111113)

### Error
- Fondo: rosa claro (#fff2f4)
- Borde: rojo (#e30000)
- Texto: rojo (#e30000)
- Icono de error en el mensaje

### Disabled
- Fondo: transparente
- Borde: gris (#111112 con 20% opacidad)
- Texto: gris claro (#111112 con 40% opacidad)

## Accesibilidad

El componente implementa las siguientes prácticas de accesibilidad:

- Uso del atributo `aria-invalid` para indicar errores
- Asociación automática entre el input y el mensaje de error
- Soporte completo para navegación por teclado
- Estados visuales claros para focus, hover y disabled

## Ejemplos Completos

### Formulario de Login

```tsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(!isValid);
  };

  return (
    <form>
      <Input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validateEmail(e.target.value);
        }}
        placeholder="Email address"
        iconLeft={<EmailIcon />}
        error={emailError}
        message={emailError ? "Email inválido" : "Ingresa tu email"}
      />
    </form>
  );
}
```

### Select Personalizado

```tsx
function CustomSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="relative">
      <Input
        value={value}
        placeholder="Selecciona una opción"
        iconRight={<ChevronDownIcon />}
        onClick={() => setIsOpen(!isOpen)}
        readOnly
      />
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded shadow-lg">
          {/* Opciones del select */}
        </div>
      )}
    </div>
  );
}
```

## Notas de Implementación

- El componente usa `class-variance-authority` para gestionar las variantes
- Los estilos están basados en Tailwind CSS
- La variante `filled` se activa automáticamente cuando el input tiene un valor
- El estado de error tiene prioridad sobre otros estados visuales
- Los iconos se posicionan con `position: absolute` dentro del contenedor

## Estructura de Archivos

```
input/
├── input.tsx          # Código del componente
├── input.styles.ts    # Variantes de CVA (default, filled, error)
├── input.test.ts      # Tests (opcional)
├── README.md          # Documentación técnica
└── index.ts           # Exportación limpia
```

