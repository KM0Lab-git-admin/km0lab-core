'use client';

import { ChevronLeft } from 'lucide-react';
import { NotificationBell } from '@/components/ui/notification-bell';

export interface ChatHeaderProps {
  locale: string;
  backLabel: string;
  onBack: () => void;
  cityName: string;
  notificationsLabel: string;
  dateLabel: string;
  hasAlerts?: boolean;
}

export function ChatHeader({
  locale,
  backLabel,
  onBack,
  cityName,
  notificationsLabel,
  dateLabel,
  hasAlerts = false,
}: ChatHeaderProps) {
  return (
    <>
      <header className="flex shrink-0 items-center gap-3 px-4 pt-3 pb-2">
        <button
          type="button"
          onClick={onBack}
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-km0-yellow-500 text-km0-yellow-600 transition-all hover:bg-km0-yellow-50"
          aria-label={backLabel}
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>

        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <h1 className="font-brand text-xl font-black leading-tight text-km0-blue-700 text-left">
              {cityName}
            </h1>
            <img
              src={locale === 'ca' ? '/assets/images/km0_xat_blue.png' : '/assets/images/km0_chat_blue.png'}
              alt={locale === 'ca' ? 'KM0 XAT' : 'KM0 CHAT'}
              className="h-5 w-auto shrink-0"
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="text-km0-yellow-600 transition-opacity hover:opacity-70"
            aria-label={notificationsLabel}
          >
            <NotificationBell hasAlerts={hasAlerts} />
          </button>
        </div>
      </header>

      <div className="shrink-0 py-1">
        <div className="flex w-full items-center justify-center bg-km0-yellow-500 px-4 py-1.5">
          <span className="font-ui text-sm font-semibold text-km0-blue-800">
            AGENDA · {dateLabel}
          </span>
        </div>
      </div>
    </>
  );
}
