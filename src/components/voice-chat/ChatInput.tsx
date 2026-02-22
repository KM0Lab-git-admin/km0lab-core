'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Plus, Mic, Send, X, Check, Loader2 } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type VoiceState = 'idle' | 'recording' | 'processing' | 'done';

export interface ChatInputProps {
  /** Called when the user sends a message (text or transcribed voice). */
  onSend: (text: string) => void;
  /** True while the AI is generating a response – disables the send button. */
  isLoading?: boolean;
  /** Placeholder text for the text input. */
  placeholder?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getSupportedMimeType(): string {
  const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'];
  for (const type of types) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return 'audio/webm';
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/* ------------------------------------------------------------------ */
/*  Waveform visualiser (canvas-based, real mic data)                  */
/* ------------------------------------------------------------------ */

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

      // Downsample to 40 bars
      const step = Math.floor(data.length / 40);
      for (let i = 0; i < 40; i++) {
        const val = (data[i * step] ?? 0) / 255;
        // Smooth transition
        barsRef.current[i] = barsRef.current[i]! * 0.6 + val * 0.4;
      }
    } else {
      // Frozen / decaying bars
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

      ctx.fillStyle = isActive ? '#1a1a2e' : '#9ca3af';
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

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function ChatInput({
  onSend,
  isLoading = false,
  placeholder = 'Escribe un mensaje o usa el micrófono…',
}: ChatInputProps) {
  const [text, setText] = useState('');
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* ---- auto-resize textarea ---- */
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 150)}px`;
  }, [text]);

  /* ---- cleanup on unmount ---- */
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      audioCtxRef.current?.close();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  /* ---- start recording ---- */
  const startRecording = useCallback(async () => {
    setErrorMsg(null);
    setText('');
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = getSupportedMimeType();
      const recorder = new MediaRecorder(stream, { mimeType });
      recorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      // Audio analyser for waveform
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;

      recorder.start(100);
      setVoiceState('recording');
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime((t) => t + 1), 1000);
    } catch {
      setErrorMsg('No se pudo acceder al micrófono. Comprueba los permisos.');
      setVoiceState('idle');
    }
  }, []);

  /* ---- stop + cleanup hardware ---- */
  const stopHardware = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
    analyserRef.current = null;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /* ---- cancel recording ---- */
  const cancelRecording = useCallback(() => {
    if (recorderRef.current?.state === 'recording') {
      recorderRef.current.stop();
    }
    recorderRef.current = null;
    chunksRef.current = [];
    stopHardware();
    setVoiceState('idle');
    setRecordingTime(0);
  }, [stopHardware]);

  /* ---- confirm recording → transcribe ---- */
  const confirmRecording = useCallback(async () => {
    if (!recorderRef.current) return;

    // Wrap onstop in a promise to wait for final chunks
    const blob = await new Promise<Blob>((resolve) => {
      const mimeType = recorderRef.current!.mimeType;
      recorderRef.current!.onstop = () => {
        resolve(new Blob(chunksRef.current, { type: mimeType }));
      };
      recorderRef.current!.stop();
    });

    recorderRef.current = null;
    stopHardware();
    setVoiceState('processing');

    if (!blob || blob.size === 0) {
      setErrorMsg('No se capturó audio. Intenta de nuevo.');
      setVoiceState('idle');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('audio', blob, 'recording.webm');

      const res = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data: Record<string, unknown> = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(typeof data?.error === 'string' ? data.error : 'Error al transcribir');
        setVoiceState('idle');
        return;
      }

      const transcribed = typeof data?.text === 'string' ? data.text : '';
      setText(transcribed);
      setVoiceState('done');
    } catch {
      setErrorMsg('Error de conexión con el servidor.');
      setVoiceState('idle');
    }
  }, [stopHardware]);

  /* ---- send message ---- */
  const handleSend = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setText('');
    setVoiceState('idle');
  }, [text, isLoading, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = text.trim().length > 0 && !isLoading;

  return (
    <div className="flex flex-col gap-1.5">
      {errorMsg && (
        <p className="px-4 text-xs text-red-600">{errorMsg}</p>
      )}

      <div
        className={`
          flex items-center gap-2 rounded-full border bg-white px-3 py-2 shadow-sm
          transition-colors duration-200
          ${voiceState === 'recording' ? 'border-red-400' : 'border-km0-beige-200'}
        `}
      >
        {/* IDLE / DONE: plus + input + mic + send */}
        {(voiceState === 'idle' || voiceState === 'done') && (
          <>
            <button
              type="button"
              className="flex size-9 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100"
              aria-label="Attach"
            >
              <Plus size={20} />
            </button>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 bg-transparent font-body text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            />
            <button
              type="button"
              onClick={startRecording}
              disabled={isLoading}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-km0-teal-500 text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              aria-label="Voice"
            >
              <Mic size={18} />
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-km0-blue-700 text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              aria-label="Send"
            >
              <Send size={18} />
            </button>
          </>
        )}

        {/* RECORDING: dot + time + waveform + cancel/confirm */}
        {voiceState === 'recording' && (
          <>
            <div className="flex flex-1 items-center gap-3">
              <span className="size-2.5 shrink-0 animate-pulse rounded-full bg-red-500" />
              <span className="min-w-[2.25rem] text-xs font-medium text-red-600">
                {formatTime(recordingTime)}
              </span>
              <WaveformCanvas analyser={analyserRef.current} isActive />
            </div>
            <button
              type="button"
              onClick={cancelRecording}
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 transition-colors hover:bg-red-100 hover:text-red-600"
              title="Cancelar grabación"
            >
              <X size={18} />
            </button>
            <button
              type="button"
              onClick={confirmRecording}
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-km0-blue-700 text-white transition-colors hover:opacity-90"
              title="Confirmar grabación"
            >
              <Check size={18} />
            </button>
          </>
        )}

        {/* PROCESSING: frozen waveform + spinner */}
        {voiceState === 'processing' && (
          <>
            <div className="flex flex-1 items-center gap-3">
              <WaveformCanvas analyser={null} isActive={false} />
              <span className="text-xs text-neutral-500">Transcribiendo…</span>
            </div>
            <button
              type="button"
              onClick={cancelRecording}
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 transition-colors hover:bg-red-100 hover:text-red-600"
              title="Cancelar"
            >
              <X size={18} />
            </button>
            <div className="flex size-9 items-center justify-center">
              <Loader2 size={20} className="animate-spin text-neutral-400" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
