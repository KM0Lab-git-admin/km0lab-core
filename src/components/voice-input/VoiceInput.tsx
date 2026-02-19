'use client';

import { useCallback, useRef, useState } from 'react';
import { Button } from '@/components/ui/primitives/button';

type Status = 'idle' | 'recording' | 'stopped' | 'uploading' | 'done' | 'error';

function getSupportedMimeType(): string {
  const types = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
  ];
  for (const type of types) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return 'audio/webm';
}

export function VoiceInput() {
  const [status, setStatus] = useState<Status>('idle');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const drawLevel = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = 'rgb(240, 240, 240)';
    ctx.fillRect(0, 0, width, height);

    const barWidth = Math.max(2, (width / dataArray.length) * 2.5);
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = ((dataArray[i] ?? 0) / 255) * height * 0.8;
      ctx.fillStyle = 'rgb(0, 120, 200)';
      ctx.fillRect(x, height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }

    animationRef.current = requestAnimationFrame(drawLevel);
  }, []);

  const startRecording = useCallback(async () => {
    setErrorMessage(null);
    setTranscript('');
    setAudioBlob(null);
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = getSupportedMimeType();
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        if (chunksRef.current.length > 0) {
          setAudioBlob(new Blob(chunksRef.current, { type: mimeType }));
        }
        streamRef.current?.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        if (animationRef.current != null) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        setStatus('stopped');
      };

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      mediaRecorder.start(100);
      setStatus('recording');
      drawLevel();
    }
    catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'No se pudo acceder al micrófono. Comprueba los permisos.',
      );
      setStatus('error');
    }
  }, [drawLevel]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && status === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
  }, [status]);

  const handleOk = useCallback(async () => {
    if (!audioBlob || audioBlob.size === 0) return;

    setErrorMessage(null);
    setStatus('uploading');

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      const res = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(typeof data?.error === 'string' ? data.error : 'Error al transcribir');
        setStatus('error');
        return;
      }

      setTranscript(typeof data?.text === 'string' ? data.text : '');
      setStatus('done');
    }
    catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Error de conexión');
      setStatus('error');
    }
  }, [audioBlob]);

  const reset = useCallback(() => {
    setAudioBlob(null);
    setStatus('idle');
    setTranscript('');
    setErrorMessage(null);
  }, []);

  const hasAudio = audioBlob != null && audioBlob.size > 0;
  const canOk = status === 'stopped' && hasAudio;
  const isRecording = status === 'recording';

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-black/10 bg-white p-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="secondary"
          size="default"
          onClick={startRecording}
          disabled={status === 'recording' || status === 'uploading'}
        >
          Grabar
        </Button>
        <Button
          type="button"
          variant="outline"
          size="default"
          onClick={stopRecording}
          disabled={!isRecording}
        >
          Parar
        </Button>
        <Button
          type="button"
          variant="default"
          size="default"
          onClick={handleOk}
          disabled={!canOk}
        >
          OK
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={reset}
          disabled={status === 'recording' || status === 'uploading'}
        >
          Reset
        </Button>
      </div>

      {isRecording && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-foreground">Grabando…</p>
          <canvas
            ref={canvasRef}
            width={256}
            height={80}
            className="h-20 w-64 rounded border border-input bg-muted"
          />
        </div>
      )}

      {(status === 'uploading' || status === 'stopped') && (
        <p className="text-sm text-muted-foreground">
          {status === 'uploading' ? 'Subiendo / transcribiendo…' : 'Grabación lista. Pulsa OK para transcribir.'}
        </p>
      )}

      {errorMessage && (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      )}

      {(status === 'done' || transcript) && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Transcripción</label>
          <textarea
            readOnly
            className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            value={transcript}
          />
        </div>
      )}

      {status === 'stopped' && !hasAudio && (
        <p className="text-sm text-muted-foreground">No se capturó audio. Graba de nuevo.</p>
      )}
    </div>
  );
}
