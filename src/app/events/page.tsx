'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event, EVENT_STATUS } from '@/types/event';
import { useEffect, useMemo, useState } from 'react';

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

  const stats = useMemo(() => {
    return {
      total: events.length,
      upcoming: events.filter(e => e.status === EVENT_STATUS.UPCOMING).length,
      live: events.filter(e => e.status === EVENT_STATUS.LIVE).length,
      past: events.filter(e => e.status === EVENT_STATUS.PAST).length,
    };
  }, [events]);

  if (loading) return <div className="p-8 text-center">Loading events...</div>;

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">Events Management</h1>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Events" value={stats.total} />
        <StatCard title="Upcoming" value={stats.upcoming} />
        <StatCard title="Live" value={stats.live} />
        <StatCard title="Past" value={stats.past} />
      </div>

      {/* Table */}
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
