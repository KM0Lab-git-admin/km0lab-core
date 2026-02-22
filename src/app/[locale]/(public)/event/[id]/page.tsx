import { Suspense } from 'react';
import EventDetailContent from './EventDetailContent';

export default function EventDetailPage() {
  return (
    <Suspense>
      <EventDetailContent />
    </Suspense>
  );
}
