import { Env } from '@/libs/Env';
import { NextResponse } from 'next/server';

const DEFAULT_EVENT_QUERY_BASE = 'https://eventquery.km0lab.com';
const MIN_PREGUNTA_LENGTH = 3;
const MAX_PREGUNTA_LENGTH = 500;
const CP_REGEX = /^\d{5}$/;

interface EventQueryBody {
  pregunta?: unknown;
  cp_usuario?: unknown;
  limit?: unknown;
  debug?: unknown;
}

export async function POST(request: Request) {
  const baseUrl = Env.EVENT_QUERY_API_URL ?? DEFAULT_EVENT_QUERY_BASE;
  const url = `${baseUrl.replace(/\/$/, '')}/api/v1/query`;

  let body: EventQueryBody;
  try {
    body = (await request.json()) as EventQueryBody;
  } catch {
    return NextResponse.json(
      { error: 'invalid_body', message: 'Cuerpo JSON inválido' },
      { status: 400 },
    );
  }

  const pregunta = typeof body.pregunta === 'string' ? body.pregunta.trim() : '';
  const cp_usuario = typeof body.cp_usuario === 'string' ? body.cp_usuario.trim() : '';

  if (pregunta.length < MIN_PREGUNTA_LENGTH || pregunta.length > MAX_PREGUNTA_LENGTH) {
    return NextResponse.json(
      {
        error: 'validation_error',
        message: `La pregunta debe tener entre ${MIN_PREGUNTA_LENGTH} y ${MAX_PREGUNTA_LENGTH} caracteres`,
      },
      { status: 400 },
    );
  }

  if (!CP_REGEX.test(cp_usuario)) {
    return NextResponse.json(
      {
        error: 'validation_error',
        message: 'El código postal debe tener exactamente 5 dígitos numéricos',
      },
      { status: 400 },
    );
  }

  const limit =
    typeof body.limit === 'number' && body.limit >= 1 && body.limit <= 100
      ? body.limit
      : 20;
  const debug = typeof body.debug === 'boolean' ? body.debug : false;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pregunta, cp_usuario, limit, debug }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const message =
        typeof data.message === 'string'
          ? data.message
          : typeof data.detail === 'string'
            ? data.detail
            : `Error ${res.status}`;
      return NextResponse.json(
        { error: data.error ?? 'upstream_error', message },
        { status: res.status },
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      {
        error: 'network_error',
        message: 'No se pudo conectar con el servicio de consultas. Inténtalo más tarde.',
      },
      { status: 502 },
    );
  }
}
