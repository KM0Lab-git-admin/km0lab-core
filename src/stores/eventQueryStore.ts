import { create } from 'zustand';

import type { EventQueryEvent } from '@/types/event-query';

interface EventQueryState {
  eventsById: Record<string, EventQueryEvent>;
  setEvents: (events: EventQueryEvent[]) => void;
  getEventById: (id: string) => EventQueryEvent | undefined;
  clearEvents: () => void;
}

export const useEventQueryStore = create<EventQueryState>((set, get) => ({
  eventsById: {},

  setEvents: (events) => {
    const nextMap: Record<string, EventQueryEvent> = {};
    for (const event of events) {
      nextMap[event.id_unico_evento] = event;
    }
    set({ eventsById: nextMap });
  },

  getEventById: (id) => get().eventsById[id],

  clearEvents: () => set({ eventsById: {} }),
}));
