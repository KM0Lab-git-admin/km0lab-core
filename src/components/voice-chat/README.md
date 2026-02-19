# Voice Chat - Guía de integración

## Archivos

```
components/voice-chat/
├── index.ts          # Barrel exports
├── ChatInput.tsx     # Input bar con voz (waveform, estados, transcripción)
└── VoiceChat.tsx     # Chat completo (mensajes + input)
```

## Uso básico (sin backend de IA)

```tsx
// app/chat/page.tsx
import { VoiceChat } from '@/components/voice-chat';

export default function ChatPage() {
  return (
    <div className="h-screen">
      <VoiceChat />
    </div>
  );
}
```

> Sin `onUserMessage`, el chat hace echo del texto (modo test).

## Con backend de IA

```tsx
'use client';

import { VoiceChat } from '@/components/voice-chat';

export default function ChatPage() {
  const handleUserMessage = async (
    text: string,
    addReply: (reply: string) => void,
  ) => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    addReply(data.answer);
  };

  return (
    <div className="h-screen">
      <VoiceChat
        onUserMessage={handleUserMessage}
        title="Mi Asistente"
        subtitle="GPT-4 · Whisper"
        welcomeMessage="¡Hola! ¿En qué puedo ayudarte hoy?"
      />
    </div>
  );
}
```

## Solo el input (sin chat)

```tsx
import { ChatInput } from '@/components/voice-chat';

function MyComponent() {
  return (
    <ChatInput
      onSend={(text) => console.log('Enviado:', text)}
      placeholder="Pregúntame lo que quieras…"
    />
  );
}
```

## Flujo de la grabación de voz

1. **idle** → El usuario ve textarea + icono de micrófono + botón enviar
2. **recording** → Punto rojo pulsante + cronómetro + waveform en vivo + botones ✕ / ✓
3. **processing** → Waveform congelada + "Transcribiendo…" + spinner (llama a `/api/transcribe`)
4. **done** → El texto transcrito aparece en el textarea, listo para editar o enviar

## Dependencias

Ya las tienes instaladas:
- `lucide-react` (iconos: Mic, X, Check, ArrowUp, Loader2, Bot, User)
- Tailwind CSS v4
- React 19

## Nota sobre el endpoint

El componente llama a `POST /api/transcribe` con un `FormData` que contiene el campo `audio` (Blob webm).
Espera una respuesta JSON: `{ text: string }` o `{ error: string }`.
