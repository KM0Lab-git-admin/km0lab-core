import { Env } from '@/libs/Env';
import { NextResponse } from 'next/server';

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

export const POST = async (request: Request) => {
  if (!Env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OPENAI_API_KEY no está configurada' },
      { status: 500 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('audio');

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { error: 'Falta el campo "audio" o no es un archivo' },
        { status: 400 },
      );
    }

    const blob = file as Blob;
    if (blob.size === 0) {
      return NextResponse.json(
        { error: 'El archivo de audio está vacío' },
        { status: 400 },
      );
    }

    if (blob.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'El archivo supera el tamaño máximo permitido (20 MB)' },
        { status: 400 },
      );
    }

    const model = Env.OPENAI_TRANSCRIBE_MODEL ?? 'gpt-4o-mini-transcribe';

    const body = new FormData();
    body.append('model', model);
    body.append('response_format', 'json');
    body.append('file', blob, 'audio.webm');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Env.OPENAI_API_KEY}`,
      },
      body,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error de transcripción: ${response.status} ${response.statusText}` },
        { status: response.status >= 500 ? 502 : 400 },
      );
    }

    const data = await response.json() as { text?: string };
    const text = typeof data?.text === 'string' ? data.text : '';

    return NextResponse.json({ text });
  }
  catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al transcribir';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 },
    );
  }
};
