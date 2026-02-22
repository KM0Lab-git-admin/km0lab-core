'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Loader2, Square } from 'lucide-react';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function WaveformCanvas({
  analyser,
  isActive,
}: {
  analyser: AnalyserNode | null;
  isActive: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);
  const barsRef = useRef<number[]>(Array.from({ length: 40 }, () => 0.05));

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    if (analyser && isActive) {
      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(data);

      const step = Math.floor(data.length / 40);
      for (let i = 0; i < 40; i++) {
        const val = (data[i * step] ?? 0) / 255;
        barsRef.current[i] = barsRef.current[i]! * 0.6 + val * 0.4;
      }
    } else {
      for (let i = 0; i < 40; i++) {
        barsRef.current[i] = barsRef.current[i]! * 0.95;
      }
    }

    const barW = Math.max(2, (width / 40) * 0.65);
    const gap = (width - barW * 40) / 39;

    for (let i = 0; i < 40; i++) {
      const h = Math.max(3, barsRef.current[i]! * height * 0.85);
      const x = i * (barW + gap);
      const y = (height - h) / 2;

      ctx.fillStyle = isActive ? '#00b8a9' : '#9ca3af';
      ctx.beginPath();
      ctx.roundRect(x, y, barW, h, 1.5);
      ctx.fill();
    }

    animRef.current = requestAnimationFrame(draw);
  }, [analyser, isActive]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => {
      if (animRef.current != null) cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={36}
      className="h-9 w-full max-w-[200px]"
    />
  );
}

export interface VoiceRecorderProps {
  analyser: AnalyserNode | null;
  recordingTime: number;
  isProcessing?: boolean;
  previewText?: string;
  onStop: () => void;
}

export function VoiceRecorder({
  analyser,
  recordingTime,
  isProcessing = false,
  previewText = '',
  onStop,
}: VoiceRecorderProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-km0-beige-200 bg-white px-3 py-2 shadow-sm transition-colors duration-200">
      <div className="flex flex-1 items-center gap-3 overflow-hidden">
        <span className="shrink-0 font-ui text-sm font-semibold text-primary">
          {isProcessing ? 'Transcribiendo…' : 'Escuchando…'}
        </span>
        <WaveformCanvas analyser={isProcessing ? null : analyser} isActive={!isProcessing} />
        <span className="truncate font-ui text-sm text-neutral-500">
          {isProcessing ? 'Procesando audio…' : previewText || formatTime(recordingTime)}
        </span>
      </div>

      <button
        type="button"
        onClick={onStop}
        disabled={isProcessing}
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        aria-label={isProcessing ? 'Processing' : 'Stop'}
      >
        {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Square size={16} fill="currentColor" />}
      </button>
    </div>
  );
}
