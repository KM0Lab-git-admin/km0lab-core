export interface EventQueryEvent {
  id_unico_evento: string;
  titulo: string;
  descripcion_corta: string | null;
  descripcion_larga: string | null;
  cp_evento: string | null;
  poblacion_nombre: string | null;
  lugar_nombre: string | null;
  direccion_completa: string | null;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  hora_inicio: string | null;
  hora_fin: string | null;
  es_gratuito: boolean | null;
  precio_euros: number | null;
  categorias: string[];
  tags: string[];
  url_evento: string | null;
  url_imagen: string | null;
  distancia_km: number | null;
  similitud_score: number | null;
  nivel_coincidencia: string | null;
}

export interface EventQueryResponse {
  respuesta_texto?: string;
  eventos?: EventQueryEvent[];
  idioma_respuesta?: string;
  metadata?: Record<string, unknown>;
  message?: string;
  error?: string;
}
