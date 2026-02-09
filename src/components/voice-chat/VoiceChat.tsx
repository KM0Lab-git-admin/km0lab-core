'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Bot, User } from 'lucide-react';
import { ChatInput } from './ChatInput';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

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
    addAssistantReply: (reply: string) => void,
  ) => Promise<void> | void;
  /** Initial greeting shown in the chat. */
  welcomeMessage?: string;
  /** Title shown in the header. */
  title?: string;
  /** Subtitle shown under the title. */
  subtitle?: string;
}

/* ------------------------------------------------------------------ */
/*  Message bubble                                                     */
/* ------------------------------------------------------------------ */

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`
          flex size-8 shrink-0 items-center justify-center rounded-full
          ${isUser ? 'bg-muted text-muted-foreground' : 'bg-foreground text-background'}
        `}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Bubble */}
      <div
        className={`
          max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed
          ${isUser
            ? 'rounded-br-sm bg-foreground text-background'
            : 'rounded-bl-sm bg-muted text-foreground'
          }
        `}
      >
        {message.content}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Typing indicator                                                   */
/* ------------------------------------------------------------------ */

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-8 items-center justify-center rounded-full bg-foreground text-background">
        <Bot size={16} />
      </div>
      <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
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
  welcomeMessage = '¡Hola! Soy tu asistente de voz. Puedes escribirme o usar el micrófono para hablar. ¿En qué puedo ayudarte?',
  title = 'Asistente de Voz',
  subtitle = 'Whisper · En línea',
}: VoiceChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: genId(),
      role: 'assistant',
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
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      const addReply = (reply: string) => {
        const assistantMsg: ChatMessage = {
          id: genId(),
          role: 'assistant',
          content: reply,
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
    <div className="flex h-full flex-col overflow-hidden bg-background">
      {/* ═══════ Header ═══════ */}
      <header className="flex items-center gap-3 border-b border-border bg-background px-6 py-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-foreground text-background">
          <Bot size={20} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </header>

      {/* ═══════ Messages ═══════ */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>

      {/* ═══════ Input ═══════ */}
      <div className="border-t border-border bg-background px-6 py-4">
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  );
}
