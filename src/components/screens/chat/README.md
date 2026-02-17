# ChatScreen

Pantalla principal del chat. Se renderiza a pantalla completa cuando el usuario
abre un chat desde TownHome, reemplazando header y footer.

## Ubicación

```
src/components/screens/chat/
├── ChatScreen.tsx   # Componente principal
├── index.ts         # Barrel export
└── README.md        # Esta documentación
```

## Comportamiento

1. **TownHome** lee `activeChatType` del store (`useChatStore`).
2. Si `activeChatType !== null` → se renderiza `ChatScreen` en lugar de la
   vista pueblo (header + card + footer).
3. `ChatScreen` muestra:
   - Barra superior mínima con título del chat y botón cerrar (X).
   - `VoiceChat` con la configuración de la tipología activa.
4. Al pulsar X → `closeChat()` → vuelve la vista pueblo.

## Flujo

```
Vista pueblo                    ChatScreen
┌─────────────────┐            ┌─────────────────┐
│ Header          │            │ [Título]    [X]  │
│ ContentCard     │  ──tap──>  │                  │
│  Hero           │  chat btn  │   VoiceChat      │
│  Tabs + Bullets │            │   (pantalla      │
│  Footer         │            │    completa)     │
└─────────────────┘            └─────────────────┘
                    <──tap X──
```

## Props

`ChatScreen` no recibe props externas. Lee del store:

- `activeChatType` → determina qué configuración usar (título, mensaje, etc.).
- `closeChat()` → acción para cerrar y volver a la vista pueblo.

## Configuración por tipología

La configuración (título, subtítulo, mensaje de bienvenida) viene de
`chatConfigs` en `@/stores/chatStore`. Ver `src/stores/README.md`.

## Uso

```tsx
import { ChatScreen } from '@/components/screens/chat';

// Dentro de TownHome, condicionalmente:
if (activeChatType) {
  return <ChatScreen />;
}
```

## Extensión futura

- **Endpoint de IA:** `ChatScreen` puede pasar `onUserMessage` a `VoiceChat`
  para conectar con el endpoint específico de la tipología activa.
- **Historial:** Mensajes gestionados por el store; se puede añadir
  persistencia con el middleware `persist` de Zustand.
- **UI propia:** Si el chat necesita más UI que `VoiceChat`, se puede
  ampliar `ChatScreen` sin tocar TownHome.
