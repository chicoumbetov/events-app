'use client';

import { Event } from '@/types/event';
import { useEffect, useState } from 'react';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://cdn.timeleft.com/frontend-tech-test/events.json')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">Loading events...</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Events Management</h1>
      {/* Statistics */}
      {/* Table with events */}
    </div>
  );
}
