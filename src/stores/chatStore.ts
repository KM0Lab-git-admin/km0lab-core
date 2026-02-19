import { create } from 'zustand';

import type { ChatConfig, ChatMessage, ChatType } from './types';

/* ------------------------------------------------------------------ */
/*  Configuración por tipología de chat                                */
/* ------------------------------------------------------------------ */

/**
 * Mapa de configuración para cada tipología de chat.
 * Cada entrada tiene título, subtítulo y mensaje de bienvenida.
 * Más adelante se añadirá el endpoint de IA específico.
 */
export const chatConfigs: Record<ChatType, ChatConfig> = {
  townHall: {
    type: 'townHall',
    title: 'Ayuntamiento',
    subtitle: 'Trámites y consultas',
    welcomeMessage: '¡Hola! Puedo ayudarte con trámites y consultas del ayuntamiento. ¿En qué puedo ayudarte?',
  },
  products: {
    type: 'products',
    title: 'Productos',
    subtitle: 'Buscador de productos km0',
    welcomeMessage: '¡Hola! Busco productos de proximidad y km0 para ti. ¿Qué necesitas?',
  },
  services: {
    type: 'services',
    title: 'Servicios',
    subtitle: 'Buscador de servicios locales',
    welcomeMessage: '¡Hola! Puedo ayudarte a encontrar servicios locales. ¿Qué servicio buscas?',
  },
  activities: {
    type: 'activities',
    title: 'Actividades',
    subtitle: 'Agenda del municipio',
    welcomeMessage: '¡Hola! Consulta la agenda de actividades del municipio. ¿Qué te interesa?',
  },
};

/* ------------------------------------------------------------------ */
/*  Interfaz del store                                                 */
/* ------------------------------------------------------------------ */

interface ChatState {
  /** Tipología de chat activa (null = vista pueblo, sin chat abierto). */
  activeChatType: ChatType | null;

  /** Mensajes de la conversación actual. */
  messages: ChatMessage[];

  /** Indica si el asistente está procesando una respuesta. */
  isProcessing: boolean;

  /* ---- Acciones ---- */

  /** Abre un chat de la tipología indicada. Limpia mensajes anteriores. */
  openChat: (type: ChatType) => void;

  /** Cierra el chat activo y limpia mensajes. */
  closeChat: () => void;

  /** Añade un mensaje a la conversación actual. */
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;

  /** Limpia los mensajes de la conversación actual. */
  clearMessages: () => void;

  /** Cambia el estado de procesamiento. */
  setProcessing: (value: boolean) => void;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

let messageCounter = 0;

function createMessage(
  partial: Omit<ChatMessage, 'id' | 'timestamp'>,
): ChatMessage {
  messageCounter += 1;
  return {
    ...partial,
    id: `msg-${Date.now()}-${messageCounter}`,
    timestamp: new Date(),
  };
}

/* ------------------------------------------------------------------ */
/*  Store                                                              */
/* ------------------------------------------------------------------ */

export const useChatStore = create<ChatState>((set) => ({
  activeChatType: null,
  messages: [],
  isProcessing: false,

  openChat: (type) => {
    const config = chatConfigs[type];
    const welcome = createMessage({
      role: 'assistant',
      content: config.welcomeMessage,
    });
    set({ activeChatType: type, messages: [welcome], isProcessing: false });
  },

  closeChat: () =>
    set({ activeChatType: null, messages: [], isProcessing: false }),

  addMessage: (partial) =>
    set((state) => ({
      messages: [...state.messages, createMessage(partial)],
    })),

  clearMessages: () => set({ messages: [] }),

  setProcessing: (value) => set({ isProcessing: value }),
}));
