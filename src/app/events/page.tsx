'use client';

import { EventsTable } from "@/components/events-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Event, EVENT_STATUS } from '@/types/event';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function EventsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const currentStatus = searchParams.get('status') || 'all';

  useEffect(() => {
    fetch('https://cdn.timeleft.com/frontend-tech-test/events.json')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete('status');
    } else {
      params.set('status', value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const filteredEvents = useMemo(() => {
    if (currentStatus === 'all') return events;
    return events.filter(e => e.status === currentStatus);
  }, [events, currentStatus]);

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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Events Management</h1>

        <div className="w-[200px]">
          <Select value={currentStatus} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value={EVENT_STATUS.UPCOMING}>Upcoming</SelectItem>
              <SelectItem value={EVENT_STATUS.LIVE}>Live</SelectItem>
              <SelectItem value={EVENT_STATUS.PAST}>Past</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Events" value={stats.total} />
        <StatCard title="Upcoming" value={stats.upcoming} />
        <StatCard title="Live" value={stats.live} />
        <StatCard title="Past" value={stats.past} />
      </div>

      <EventsTable events={filteredEvents} />
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
