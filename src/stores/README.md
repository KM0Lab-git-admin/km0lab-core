# Stores (Zustand)

Gestión de estado global de la aplicación con [Zustand](https://github.com/pmndrs/zustand).

## Arquitectura

```
src/stores/
├── chatStore.ts   # Estado y acciones del chat
├── types.ts       # Tipos compartidos (ChatType, ChatMessage, ChatConfig)
└── README.md      # Esta documentación
```

## chatStore

Store principal del chat. Gestiona qué chat está abierto, los mensajes de la
conversación actual y el estado de procesamiento.

### Estado

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `activeChatType` | `ChatType \| null` | Tipología de chat activa (`null` = vista pueblo) |
| `messages` | `ChatMessage[]` | Mensajes de la conversación actual |
| `isProcessing` | `boolean` | Si el asistente está procesando una respuesta |

### Acciones

| Acción | Firma | Descripción |
|--------|-------|-------------|
| `openChat` | `(type: ChatType) => void` | Abre un chat y muestra el mensaje de bienvenida |
| `closeChat` | `() => void` | Cierra el chat activo y limpia mensajes |
| `addMessage` | `(msg: Omit<ChatMessage, 'id' \| 'timestamp'>) => void` | Añade un mensaje |
| `clearMessages` | `() => void` | Limpia mensajes |
| `setProcessing` | `(value: boolean) => void` | Cambia estado de procesamiento |

### Tipologías de chat (ChatType)

Cada tipología tiene su propio endpoint de IA (futuro) y configuración:

| Tipo | Descripción | Endpoint (futuro) |
|------|-------------|-------------------|
| `townHall` | Trámites del ayuntamiento | `/api/chat/town-hall` |
| `products` | Buscador de productos km0 | `/api/chat/products` |
| `services` | Buscador de servicios locales | `/api/chat/services` |
| `activities` | Agenda de actividades | `/api/chat/activities` |

### Uso

```tsx
import { useChatStore } from '@/stores/chatStore';

// En un componente
function MyComponent() {
  const activeChatType = useChatStore((s) => s.activeChatType);
  const openChat = useChatStore((s) => s.openChat);
  const closeChat = useChatStore((s) => s.closeChat);

  // Abrir chat de productos
  openChat('products');

  // Cerrar chat
  closeChat();
}
```

### Configuración por tipología

El mapa `chatConfigs` (exportado desde `chatStore.ts`) define título, subtítulo
y mensaje de bienvenida para cada tipología:

```ts
import { chatConfigs } from '@/stores/chatStore';

const config = chatConfigs['products'];
// { type: 'products', title: 'Productos', subtitle: '...', welcomeMessage: '...' }
```

## Escalabilidad

### Añadir nueva tipología de chat

1. Añadir el valor al tipo `ChatType` en `types.ts`.
2. Añadir la entrada correspondiente en `chatConfigs` en `chatStore.ts`.
3. Si tiene endpoint propio, añadir la propiedad `endpoint` a la config.

### Añadir persistencia (futuro)

Zustand tiene middleware `persist` integrado:

```ts
import { persist } from 'zustand/middleware';

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({ /* ... estado y acciones ... */ }),
    { name: 'chat-store' }, // clave en localStorage
  ),
);
```

### Añadir nuevos stores (futuro)

Para user, notificaciones, etc., crear archivos independientes:

```
src/stores/
├── chatStore.ts
├── userStore.ts          # Auth, perfil, preferencias
├── notificationStore.ts  # Notificaciones
├── types.ts
└── README.md
```

Cada store es independiente y se puede usar en cualquier componente.
