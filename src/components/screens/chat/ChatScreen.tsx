'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronLeft } from 'lucide-react';

import { Logo } from '@/components/ui/logo';
import { NotificationBell } from '@/components/ui/notification-bell';
import { ChatInput } from '@/components/voice-chat/ChatInput';
import { getPostalCodeCity } from '@/components/screens/postal-code/postalCodeDb';

type Message = {
  id: number;
  role: 'assistant' | 'user';
  content: string;
};

export function ChatScreen() {
  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const searchParams = useSearchParams();
  const t = useTranslations('Chat');

  const locale = params?.locale ?? 'es';
  const cp = (searchParams.get('cp') ?? '').trim();
  const cityName = getPostalCodeCity(cp) ?? t('defaultCity');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>(() => [
    { id: 1, role: 'assistant', content: t('greeting', { city: cityName }) },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = useCallback(
    (text: string) => {
      const userMsg: Message = {
        id: Date.now(),
        role: 'user',
        content: text,
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      setTimeout(() => {
        const assistantMsg: Message = {
          id: Date.now() + 1,
          role: 'assistant',
          content: t('mockReply'),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsLoading(false);
      }, 1200);
    },
    [t],
  );

  const handleBack = () => {
    router.push(`/${locale}/postal-code`);
  };

  const dateLabel = new Date().toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-gradient-to-b from-km0-beige-50 to-km0-beige-100">
      <div className="flex h-full w-full max-w-md flex-col">
        {/* Header */}
        <header className="flex shrink-0 items-center gap-3 px-4 pt-3 pb-2">
          {/* Back button */}
          <button
            type="button"
            onClick={handleBack}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-km0-yellow-500 text-km0-yellow-600 transition-all hover:bg-km0-yellow-50"
            aria-label={t('back')}
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          {/* City name + KM0 LAB logo */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="min-w-0">
              <h1 className="truncate font-brand text-xl font-black leading-tight text-km0-blue-700">
                {cityName}
              </h1>
              <Logo scale="xxs" alt="KM0 LAB" className="mt-0.5" />
            </div>
          </div>

          {/* Agenda badge + Notification bell */}
          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-full bg-km0-teal-500 px-3 py-1 font-body text-xs font-semibold text-white">
              {t('agenda')}
            </span>
            <button
              type="button"
              className="text-km0-yellow-600 transition-opacity hover:opacity-70"
              aria-label={t('notifications')}
            >
              <NotificationBell hasAlerts />
            </button>
          </div>
        </header>

        {/* Date banner */}
        <div className="shrink-0 px-4 py-1">
          <div className="flex items-center justify-center rounded-full bg-km0-yellow-500 px-4 py-1.5">
            <span className="font-body text-xs font-semibold text-km0-blue-800">
              {dateLabel}
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <div className="flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2.5 animate-fade-in-up ${
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {msg.role === 'assistant' && (
                  <img
                    src="/assets/images/km0_robot_icon_v2.png"
                    alt={t('robotAlt')}
                    className="size-9 shrink-0 rounded-full object-cover shadow-md"
                  />
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 font-body text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-km0-blue-700 text-white'
                      : 'bg-white text-neutral-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-end gap-2.5 animate-fade-in-up">
                <img
                  src="/assets/images/km0_robot_icon_v2.png"
                  alt={t('robotAlt')}
                  className="size-9 shrink-0 rounded-full object-cover shadow-md"
                />
                <div className="flex gap-1.5 rounded-2xl bg-white px-4 py-3 shadow-sm">
                  <span className="size-2 animate-bounce rounded-full bg-neutral-400" />
                  <span className="size-2 animate-bounce rounded-full bg-neutral-400 animate-delay-100" />
                  <span className="size-2 animate-bounce rounded-full bg-neutral-400 animate-delay-200" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input bar */}
        <div className="shrink-0 px-4 pb-4 pt-2">
          <ChatInput
            onSend={handleSend}
            isLoading={isLoading}
            placeholder={t('placeholder')}
          />
        </div>
      </div>
    </div>
  );
}
