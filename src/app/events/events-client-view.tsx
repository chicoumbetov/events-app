'use client';

import { EventsPagination } from "@/components/events-pagination";
import { EventsTable } from "@/components/events-table";
import { StatCard } from "@/components/stat-card";
import { Input } from "@/components/ui/input";
import { Event, EVENT_STATUS } from '@/types/event';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const ITEMS_PER_PAGE = 5;

interface EventsClientViewProps {
  initialEvents: Event[];
}

export default function EventsClientView({ initialEvents }: EventsClientViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [events] = useState<Event[]>(initialEvents);

  const currentStatus = searchParams.get('status') || 'all';
  const sortOrder = searchParams.get('sort') || 'desc';
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL({ q: searchTerm || null, page: '1' });
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const updateURL = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === 'all') params.delete(key);
      else params.set(key, value);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const stats = useMemo(() => ({
    total: events.length,
    upcoming: events.filter(e => e.status === EVENT_STATUS.UPCOMING).length,
    live: events.filter(e => e.status === EVENT_STATUS.LIVE).length,
    past: events.filter(e => e.status === EVENT_STATUS.PAST).length,
  }), [events]);

  const processedEvents = useMemo(() => {
    let result = [...events];
    
    if (currentStatus !== 'all') {
      result = result.filter(e => e.status === currentStatus);
    }

    if (searchQuery) {
      const term = searchQuery.toLowerCase().trim();
      result = result.filter(e => 
        e.type.toLowerCase().includes(term) || 
        e.zone.city.name.toLowerCase().includes(term) ||
        e.zone.name.toLowerCase().includes(term)
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    return result;
  }, [events, currentStatus, sortOrder, searchQuery]);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedEvents, currentPage]);

  const totalPages = Math.ceil(processedEvents.length / ITEMS_PER_PAGE);

  return (
    <>
      <h1 className="text-3xl font-bold">Events Management</h1>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Events" value={stats.total} />
        <StatCard title="Upcoming" value={stats.upcoming} />
        <StatCard title="Live" value={stats.live} />
        <StatCard title="Past" value={stats.past} />
      </div>

      <div className="w-full md:w-72">
        <Input 
          placeholder="Search by event or city..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <EventsTable 
          events={paginatedEvents} 
          currentStatus={currentStatus}
          onStatusChange={(v) => updateURL({ status: v, page: '1' })}
          sortOrder={sortOrder}
          onSortChange={() => updateURL({ sort: sortOrder === 'asc' ? 'desc' : 'asc' })}
        />

        <EventsPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalFiltered={processedEvents.length}
          showingCount={paginatedEvents.length}
          onPageChange={(p) => updateURL({ page: p.toString() })}
        />
      </div>
    </>
  );
}
