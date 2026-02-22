'use client';

import { ChevronLeft } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { NotificationBell } from '@/components/ui/notification-bell';

export interface ChatHeaderProps {
  backLabel: string;
  onBack: () => void;
  cityName: string;
  agendaLabel: string;
  notificationsLabel: string;
  dateLabel: string;
  hasAlerts?: boolean;
}

export function ChatHeader({
  backLabel,
  onBack,
  cityName,
  agendaLabel,
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

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="min-w-0">
            <h1 className="truncate font-brand text-xl font-black leading-tight text-km0-blue-700">
              {cityName}
            </h1>
            <Logo context="chat" alt="KM0 LAB" className="mt-0.5" />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="font-brand text-lg text-accent-foreground bg-accent rounded-full px-3 py-1">
            {agendaLabel}
          </span>
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
            {dateLabel}
          </span>
        </div>
      </div>
    </>
  );
}
