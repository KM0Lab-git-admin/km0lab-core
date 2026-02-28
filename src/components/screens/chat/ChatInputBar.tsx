'use client';

import { Mic, Send } from 'lucide-react';
import { Input } from '@/components/ui/primitives/input';

export interface ChatInputBarProps {
  text: string;
  placeholder: string;
  canSend: boolean;
  isLoading: boolean;
  onTextChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onStartRecording: () => void;
  onSend: () => void;
}

export function ChatInputBar({
  text,
  placeholder,
  canSend,
  isLoading,
  onTextChange,
  onKeyDown,
  onStartRecording,
  onSend,
}: ChatInputBarProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-km0-beige-200 bg-white px-3 py-2 shadow-sm transition-colors duration-200">
      <Input
        type="text"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="h-auto rounded-none border-0 bg-transparent px-0 py-0 font-body text-sm text-neutral-900 shadow-none outline-0 focus-visible:outline-0"
      />
      <button
        type="button"
        onClick={onStartRecording}
        disabled={isLoading}
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        aria-label="Voice"
      >
        <Mic size={18} />
      </button>
      <button
        type="button"
        onClick={onSend}
        disabled={!canSend}
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        aria-label="Send"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
