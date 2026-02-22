'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChatInput } from './ChatInput';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ChatEventListItem {
  id: string;
  title: string;
  subtitle?: string;
}

export type AssistantReply =
  | string
  | {
      type: 'text';
      content: string;
    }
  | {
      type: 'event-list';
      events: ChatEventListItem[];
    };

export type ChatMessage =
  | {
      id: string;
      role: 'user' | 'assistant';
      type: 'text';
      content: string;
      timestamp: Date;
    }
  | {
      id: string;
      role: 'assistant';
      type: 'event-list';
      events: ChatEventListItem[];
      timestamp: Date;
    };

export interface VoiceChatProps {
  /**
   * Called when the user sends a message. Receives the user text
   * and a callback to append the assistant's reply.
   *
   * Example with streaming / non-streaming:
   * ```ts
   * async function handleUserMessage(text, addReply) {
   *   const res = await fetch('/api/chat', { ... });
   *   const data = await res.json();
   *   addReply(data.answer);
   * }
   * ```
   */
  onUserMessage?: (
    text: string,
    addAssistantReply: (reply: AssistantReply) => void,
  ) => Promise<void> | void;
  onEventClick?: (eventId: string) => void;
  /** Initial greeting shown in the chat. */
  welcomeMessage?: string;
}

/* ------------------------------------------------------------------ */
/*  Message bubble                                                     */
/* ------------------------------------------------------------------ */

function MessageBubble({
  message,
  onEventClick,
}: {
  message: ChatMessage;
  onEventClick?: (eventId: string) => void;
}) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Avatar - assistant only */}
      {!isUser && (
        <img
          src="/assets/images/km0_robot_icon_v2.png"
          alt="Bot"
          className="size-9 shrink-0 rounded-full border-2 border-km0-teal-400 object-contain"
        />
      )}

      {/* Bubble */}
      {message.type === 'text' ? (
        <div
          className={`
            max-w-[75%] rounded-2xl px-4 py-3 font-body text-sm leading-relaxed
            ${isUser
              ? 'rounded-br-md bg-km0-blue-700 text-white'
              : 'rounded-bl-md bg-white text-neutral-800 shadow-sm'
            }
          `}
        >
          {message.content}
        </div>
      ) : (
        <div className="max-w-[75%] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-neutral-800 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Eventos encontrados
          </p>
          <div className="mt-2 flex flex-col gap-2">
            {message.events.map((event) => (
              <button
                key={event.id}
                type="button"
                onClick={() => onEventClick?.(event.id)}
                className="rounded-lg border border-km0-beige-200 bg-km0-beige-50 px-3 py-2 text-left text-sm font-medium text-km0-blue-700 transition hover:bg-km0-blue-50"
              >
                <span className="block">{event.title}</span>
                {event.subtitle ? (
                  <span className="mt-1 block text-xs font-normal text-neutral-500">
                    {event.subtitle}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Typing indicator                                                   */
/* ------------------------------------------------------------------ */

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <img
        src="/assets/images/km0_robot_icon_v2.png"
        alt="Bot"
        className="size-9 shrink-0 rounded-full border-2 border-km0-teal-400 object-contain"
      />
      <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
        <span className="size-2 animate-pulse rounded-full bg-neutral-400" />
        <span className="size-2 animate-pulse rounded-full bg-neutral-400" />
        <span className="size-2 animate-pulse rounded-full bg-neutral-400" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

let idCounter = 0;
function genId() {
  idCounter += 1;
  return `msg-${Date.now()}-${idCounter}`;
}

export function VoiceChat({
  onUserMessage,
  onEventClick,
  welcomeMessage = '¡Hola! Soy tu asistente de voz. Puedes escribirme o usar el micrófono para hablar. ¿En qué puedo ayudarte?',
}: VoiceChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: genId(),
      role: 'assistant',
      type: 'text',
      content: welcomeMessage,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ---- auto-scroll ---- */
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isLoading]);

  /* ---- handle send ---- */
  const handleSend = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = {
        id: genId(),
        role: 'user',
        type: 'text',
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      const addReply = (reply: AssistantReply) => {
        const assistantMsg: ChatMessage =
          typeof reply === 'string'
            ? {
                id: genId(),
                role: 'assistant',
                type: 'text',
                content: reply,
                timestamp: new Date(),
              }
            : reply.type === 'event-list'
              ? {
                  id: genId(),
                  role: 'assistant',
                  type: 'event-list',
                  events: reply.events,
                  timestamp: new Date(),
                }
              : {
                  id: genId(),
                  role: 'assistant',
                  type: 'text',
                  content: reply.content,
                  timestamp: new Date(),
                };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsLoading(false);
      };

      try {
        if (onUserMessage) {
          await onUserMessage(text, addReply);
        } else {
          // Default: echo back (for testing without a backend)
          setTimeout(() => {
            addReply(`Has dicho: "${text}"`);
          }, 1000);
        }
      } catch {
        addReply('Lo siento, ha ocurrido un error. Inténtalo de nuevo.');
      }
    },
    [onUserMessage],
  );

  return (
    <div className="flex h-full flex-col overflow-hidden bg-gradient-to-b from-km0-beige-50 to-km0-beige-100">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} onEventClick={onEventClick} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>

      {/* Input */}
      <div className="px-3 pb-4 pt-2">
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  );
}
