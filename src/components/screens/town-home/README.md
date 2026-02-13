# TownHome

Pantalla principal de una poblacion ("Town Home").

## Descripcion

Se muestra cuando el usuario introduce un codigo postal habilitado para town (ej. 08380 - Malgrat de Mar).
Recibe el codigo postal via query param `cp` y muestra:

1. **Header**: campanita de notificacion (decorativa) | nombre de la poblacion | logo KM0 LAB
2. **Seccion hero**: nombre grande de la poblacion (font-brand) + label "Chat" + logo circular `chat_blue.png`
3. **Tarjetas de categoria**: Ayuntamiento, Productos, Servicios (con icono SVG, titulo y descripcion)
4. **Navegacion inferior**: Home, Info, Perfil (usa `NavigationFooter`)

## Uso

```tsx
import TownHome from '@/components/screens/town-home/TownHome';

// En la ruta /town?cp=08380
<TownHome />
```

## Anadir nuevas poblaciones

1. Anadir el codigo postal a `src/features/postal-code/postalCodeDb.ts`
2. Anadir el codigo postal al Set en `src/features/postal-code/townEnabledPostalCodes.ts`

## Componentes reutilizados

- `ContentShell` - contenedor principal
- `ContentCard` - tarjeta de contenido
- `NavigationFooter` - barra de navegacion inferior
- `Logo` - logo KM0 LAB
- `Button` - botones de navegacion

## Traducciones

Namespace: `TownHome` (en, es, fr, ca)
