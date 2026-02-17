'use client';

import { useCallback } from 'react';
import { X } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { VoiceChat } from '@/components/voice-chat';
import type { AssistantReply } from '@/components/voice-chat';
import { Button } from '@/components/ui/primitives/button';
import { useEventQueryStore } from '@/stores/eventQueryStore';
import { useChatStore, chatConfigs } from '@/stores/chatStore';
import type {
  EventQueryEvent,
  EventQueryResponse,
} from '@/types/event-query';

const MIN_PREGUNTA_LENGTH = 3;
const MAX_PREGUNTA_LENGTH = 500;
const CP_REGEX = /^\d{5}$/;
const TOP_EVENTS_IN_CHAT = 5;

/**
 * ChatScreen – Pantalla principal del chat.
 *
 * Se renderiza a pantalla completa cuando el usuario abre un chat
 * desde TownHome. Recibe la tipología activa del store y muestra
 * VoiceChat con la configuración correspondiente.
 *
 * De momento todos los chats usan Event Query (POST /api/event-query)
 * con el código postal de la URL (?cp=08380).
 *
 * Sin header de TownHome ni footer: ocupa todo el espacio disponible.
 */
export function ChatScreen() {
  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const searchParams = useSearchParams();
  const activeChatType = useChatStore((s) => s.activeChatType);
  const closeChat = useChatStore((s) => s.closeChat);
  const setEvents = useEventQueryStore((s) => s.setEvents);

  const locale = params?.locale ?? 'es';
  const cp = (searchParams.get('cp') ?? '').trim();

  const handleEventQueryMessage = useCallback(
    async (text: string, addReply: (reply: AssistantReply) => void) => {
      const trimmed = text.trim();
      if (trimmed.length < MIN_PREGUNTA_LENGTH || trimmed.length > MAX_PREGUNTA_LENGTH) {
        addReply(
          `Escribe una pregunta entre ${MIN_PREGUNTA_LENGTH} y ${MAX_PREGUNTA_LENGTH} caracteres.`,
        );
        return;
      }
      if (!CP_REGEX.test(cp)) {
        addReply(
          'Para consultar actividades necesitas indicar un código postal válido (5 dígitos). Entra al pueblo desde la pantalla principal con el parámetro ?cp=08380.',
        );
        return;
      }
      try {
        const res = await fetch('/api/event-query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pregunta: trimmed,
            cp_usuario: cp,
            limit: 20,
          }),
        });
        const data = (await res.json()) as EventQueryResponse;
        if (!res.ok) {
          const msg =
            typeof data.message === 'string'
              ? data.message
              : 'No se pudo obtener la respuesta. Inténtalo de nuevo.';
          addReply(msg);
          return;
        }

        const respuestaTexto =
          typeof data.respuesta_texto === 'string' && data.respuesta_texto.length > 0
            ? data.respuesta_texto
            : 'No hay respuesta disponible para esta consulta.';

        addReply({
          type: 'text',
          content: respuestaTexto,
        });

        const eventos = Array.isArray(data.eventos) ? data.eventos : [];
        if (eventos.length === 0) {
          addReply('No he encontrado eventos para esta consulta.');
          return;
        }

        setEvents(eventos);
        const topEventos = eventos.slice(0, TOP_EVENTS_IN_CHAT);
        addReply({
          type: 'event-list',
          events: topEventos.map((event: EventQueryEvent) => ({
            id: event.id_unico_evento,
            title: event.titulo,
            subtitle: [event.poblacion_nombre, event.fecha_inicio]
              .filter(Boolean)
              .join(' · '),
          })),
        });
      } catch {
        addReply(
          'Error de conexión. Comprueba tu red e inténtalo de nuevo.',
        );
      }
    },
    [cp, setEvents],
  );

  const handleEventClick = useCallback(
    (eventId: string) => {
      const cpQuery = cp ? `?cp=${encodeURIComponent(cp)}` : '';
      router.push(`/${locale}/event/${encodeURIComponent(eventId)}${cpQuery}`);
    },
    [cp, locale, router],
  );

  // Si no hay chat activo, no renderiza nada
  if (!activeChatType) return null;

  const config = chatConfigs[activeChatType];

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {/* Barra superior mínima: título + botón cerrar */}
      <div className="flex shrink-0 items-center justify-between px-4 py-2">
        <span className="text-sm font-semibold text-km0-blue-700">
          {config.title}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={closeChat}
          aria-label="Cerrar chat"
          className="text-km0-blue-700"
        >
          <X size={20} />
        </Button>
      </div>

      {/* VoiceChat ocupa el resto del espacio */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <VoiceChat
          welcomeMessage={config.welcomeMessage}
          onUserMessage={handleEventQueryMessage}
          onEventClick={handleEventClick}
        />
      </div>
    </div>
  );
}
