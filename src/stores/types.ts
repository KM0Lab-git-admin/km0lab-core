/**
 * Tipos compartidos para los stores de la aplicación.
 *
 * ChatType define las tipologías de chat disponibles, cada una con su
 * propio endpoint de IA entrenado para un dominio concreto.
 */

/** Tipologías de chat disponibles (máximo 4-6). */
export type ChatType =
  | 'townHall'    // Trámites del ayuntamiento
  | 'products'    // Buscador de productos km0
  | 'services'    // Buscador de servicios locales
  | 'activities'; // Agenda de actividades del municipio

/** Mensaje individual dentro de una conversación. */
export interface ChatMessage {
  /** Identificador único del mensaje. */
  id: string;
  /** Rol del emisor: usuario o asistente IA. */
  role: 'user' | 'assistant';
  /** Contenido textual del mensaje. */
  content: string;
  /** Timestamp de creación. */
  timestamp: Date;
}

/** Metadatos de configuración por tipología de chat. */
export interface ChatConfig {
  /** Tipo de chat. */
  type: ChatType;
  /** Título visible en la cabecera del chat. */
  title: string;
  /** Subtítulo / descripción breve. */
  subtitle: string;
  /** Mensaje de bienvenida del asistente al abrir el chat. */
  welcomeMessage: string;
  /** Endpoint de la API para este tipo de chat (futuro). */
  endpoint?: string;
}
