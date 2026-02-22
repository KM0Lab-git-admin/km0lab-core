'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChatInputBar } from '@/components/screens/chat/ChatInputBar';
import { VoiceRecorder } from '@/components/screens/chat/VoiceRecorder';

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

export function ChatInput({
  onSend,
  isLoading = false,
  placeholder = 'Escribe un mensaje o usa el micrófono…',
}: ChatInputProps) {
  const [text, setText] = useState('');
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [voicePreview, setVoicePreview] = useState('');

  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    setVoicePreview('');
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

  /* ---- stop recording → transcribe ---- */
  const stopAndTranscribe = useCallback(async () => {
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
      setVoicePreview(transcribed);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      <AnimatePresence mode="wait" initial={false}>
        {(voiceState === 'idle' || voiceState === 'done') ? (
          <motion.div
            key="chat-input-bar"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <ChatInputBar
              text={text}
              placeholder={placeholder}
              canSend={canSend}
              isLoading={isLoading}
              onTextChange={setText}
              onKeyDown={handleKeyDown}
              onStartRecording={startRecording}
              onSend={handleSend}
            />
          </motion.div>
        ) : (
          <motion.div
            key="voice-recorder"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <VoiceRecorder
              analyser={analyserRef.current}
              recordingTime={recordingTime}
              previewText={voicePreview}
              isProcessing={voiceState === 'processing'}
              onStop={stopAndTranscribe}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
