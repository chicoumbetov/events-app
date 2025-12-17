'use client';

import { EventsPagination } from "@/components/events-pagination";
import { EventsTable } from "@/components/events-table";
import { StatCard } from "@/components/stat-card";
import { Input } from "@/components/ui/input";
import { useEventsUrl } from "@/hooks/use-events-url";
import { calculateEventStats, getProcessedEvents } from "@/lib/event-logic";
import { Event } from '@/types/event';
import { useMemo } from 'react';

const ITEMS_PER_PAGE = 5;

export default function EventsClientView({ initialEvents }: { initialEvents: Event[] }) {
  const {
    currentStatus,
    sortOrder,
    currentPage,
    searchQuery,
    searchTerm,
    setSearchTerm,
    updateURL
  } = useEventsUrl();

  const stats = useMemo(() => calculateEventStats(initialEvents), [initialEvents]);

  const processedEvents = useMemo(() => 
    getProcessedEvents(initialEvents, { 
      status: currentStatus, 
      query: searchQuery, 
      sort: sortOrder 
    }), 
  [initialEvents, currentStatus, searchQuery, sortOrder]);

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedEvents.slice(start, start + ITEMS_PER_PAGE);
  }, [processedEvents, currentPage]);

  const totalPages = Math.ceil(processedEvents.length / ITEMS_PER_PAGE);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Events Management</h1>

      <div className="grid gap-4 md:grid-cols-4" role="region" aria-label="Event statistics">
        <StatCard title="Total Events" value={stats.total} />
        <StatCard title="Upcoming" value={stats.upcoming} />
        <StatCard title="Live" value={stats.live} />
        <StatCard title="Past" value={stats.past} />
      </div>

      <div className="w-full md:w-72">
        <label htmlFor="event-search" className="sr-only">
          Search by event type or city
        </label>
        <Input 
          id="event-search"
          placeholder="Search events..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-controls="events-table"
        />
      </div>

      <div className="space-y-4">
        <EventsTable 
          id="events-table"
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
    </div>
  );
}
