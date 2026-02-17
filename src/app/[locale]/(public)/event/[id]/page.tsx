'use client';

import {
  ArrowLeft,
  Building2,
  CalendarDays,
  ExternalLink,
  Link as LinkIcon,
  Map,
  MapPin,
  Tag,
  User,
} from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { ContentCard } from '@/components/ui/content-card';
import { ContentShell } from '@/components/ui/content-shell';
import { Button } from '@/components/ui/primitives/button';
import { useEventQueryStore } from '@/stores/eventQueryStore';

function formatDateTimeShort(fecha: string | null, hora: string | null) {
  if (!fecha) return 'No disponible';
  const date = new Date(fecha);
  if (Number.isNaN(date.getTime())) return fecha;
  const dayPart = new Intl.DateTimeFormat('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date);
  const timePart = hora ? hora.slice(0, 5) : '';
  return timePart ? `${dayPart} · ${timePart}` : dayPart;
}

function formatPrice(esGratuito: boolean | null, precio: number | null) {
  if (esGratuito) return 'Gratis';
  if (typeof precio !== 'number') return 'No disponible';
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(precio);
}

function buildGoogleMapsUrl(direccion: string | null, poblacion: string | null): string | null {
  const parts = [direccion, poblacion].filter(Boolean).map((s) => s!.trim());
  if (parts.length === 0) return null;
  const query = encodeURIComponent(parts.join(', '));
  return `https://www.google.com/maps?q=${query}`;
}

export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams<{ locale?: string; id?: string }>();
  const searchParams = useSearchParams();
  const eventId = params?.id ?? '';
  const locale = params?.locale ?? 'es';
  const cp = (searchParams.get('cp') ?? '').trim();

  const event = useEventQueryStore((s) => s.getEventById(eventId));

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    const cpQuery = cp ? `?cp=${encodeURIComponent(cp)}` : '';
    router.push(`/${locale}/town${cpQuery}`);
  };

  if (!event) {
    return (
      <ContentShell>
        <ContentCard className="gap-4">
          <Button
            type="button"
            variant="ghost"
            className="w-fit px-0 text-km0-blue-700"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 size-4" />
            Volver
          </Button>
          <h1 className="text-xl font-semibold text-km0-blue-700">
            Evento no disponible
          </h1>
          <p className="text-sm text-muted-foreground">
            No encuentro ese evento en memoria. Vuelve al chat y abre de nuevo el evento.
          </p>
        </ContentCard>
      </ContentShell>
    );
  }

  const googleMapsUrl = buildGoogleMapsUrl(event.direccion_completa, event.poblacion_nombre);

  return (
    <ContentShell>
      <ContentCard className="gap-4">
        <Button
          type="button"
          variant="ghost"
          className="w-fit px-0 text-km0-blue-700"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 size-4" />
          Volver
        </Button>

        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-col gap-2">
            {event.categorias?.length > 0 ? (
              <span className="inline-flex w-fit rounded-full bg-km0-success-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                {event.categorias[0]}
              </span>
            ) : null}
            <h1 className="text-2xl font-semibold text-km0-blue-700">{event.titulo}</h1>
          </div>
        </div>

        <section className="rounded-lg border border-border bg-background p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Descripción
          </h2>
          <p className="text-sm text-foreground">
            {event.descripcion_larga || event.descripcion_corta || 'Sin descripción disponible.'}
          </p>
        </section>

        <section className="rounded-lg border border-border bg-background p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Ubicación
          </h2>
          <div className="space-y-2 text-sm text-foreground">
            <p className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-km0-coral-500" aria-hidden />
              {event.poblacion_nombre || 'Población no disponible'}
            </p>
            <p className="flex items-center gap-2">
              <Building2 className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              {event.lugar_nombre || 'Lugar no disponible'}
            </p>
            <p className="flex items-center gap-2">
              <Map className="size-4 shrink-0 text-km0-blue-700" aria-hidden />
              {event.direccion_completa || 'Dirección no disponible'}
            </p>
            {googleMapsUrl ? (
              <p className="flex items-center gap-2 pt-1">
                <ExternalLink className="size-4 shrink-0 text-km0-blue-700" aria-hidden />
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-km0-blue-700 underline"
                >
                  Ver en Google Maps
                </a>
              </p>
            ) : null}
          </div>
        </section>

        <section className="rounded-lg border border-border bg-background p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Organizador
          </h2>
          <div className="space-y-2 text-sm text-foreground">
            <p className="flex items-center gap-2">
              <User className="size-4 shrink-0 text-km0-blue-800" aria-hidden />
              {event.lugar_nombre || '—'}
            </p>
            <p className="flex items-center gap-2">
              <Building2 className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              Privado
            </p>
            {event.url_evento ? (
              <p className="flex items-center gap-2">
                <LinkIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <a
                  href={event.url_evento}
                  target="_blank"
                  rel="noreferrer"
                  className="text-km0-blue-700 underline"
                >
                  {event.url_evento}
                </a>
              </p>
            ) : null}
          </div>
        </section>

        <section className="rounded-lg border border-border bg-background p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Fechas y horario
          </h2>
          <div className="space-y-2 text-sm text-foreground">
            <p className="flex items-center gap-2">
              <CalendarDays className="size-4 shrink-0 text-km0-blue-700" aria-hidden />
              Inicio: {formatDateTimeShort(event.fecha_inicio, event.hora_inicio)}
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays className="size-4 shrink-0 text-km0-blue-700" aria-hidden />
              Fin: {formatDateTimeShort(event.fecha_fin, event.hora_fin)}
            </p>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-background p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Tags
          </h2>
          {event.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground"
                >
                  <Tag className="mr-1 size-3 shrink-0" aria-hidden />
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Sin tags.</p>
          )}
        </section>

        <section className="rounded-lg border border-border bg-background p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Precio
          </h2>
          {event.es_gratuito ? (
            <span className="inline-flex rounded-full bg-km0-success-500 px-3 py-1 text-sm font-bold uppercase tracking-wide text-white">
              Gratis
            </span>
          ) : (
            <p className="text-lg font-semibold text-km0-blue-700">
              {formatPrice(event.es_gratuito, event.precio_euros)}
            </p>
          )}
        </section>
      </ContentCard>
    </ContentShell>
  );
}
