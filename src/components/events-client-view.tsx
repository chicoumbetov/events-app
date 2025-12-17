'use client';

import { EventsPagination } from "@/components/events-pagination";
import { EventsTable } from "@/components/events-table";
import { StatCard } from "@/components/stat-card";
import { Input } from "@/components/ui/input";
import { useEventsUrl } from "@/hooks/use-events-url";
import { Event, EVENT_STATUS } from '@/types/event';
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

  const stats = useMemo(() => ({
    total: initialEvents.length,
    upcoming: initialEvents.filter(e => e.status === EVENT_STATUS.UPCOMING).length,
    live: initialEvents.filter(e => e.status === EVENT_STATUS.LIVE).length,
    past: initialEvents.filter(e => e.status === EVENT_STATUS.PAST).length,
  }), [initialEvents]);

  const processedEvents = useMemo(() => {
    let result = [...initialEvents];
    
    if (currentStatus !== 'all') result = result.filter(e => e.status === currentStatus);
    
    if (searchQuery) {
      const term = searchQuery.toLowerCase().trim();
      result = result.filter(e => 
        e.type.toLowerCase().includes(term) || 
        e.zone.city.name.toLowerCase().includes(term)
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    return result;
  }, [initialEvents, currentStatus, sortOrder, searchQuery]);

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedEvents.slice(start, start + ITEMS_PER_PAGE);
  }, [processedEvents, currentPage]);

  const totalPages = Math.ceil(processedEvents.length / ITEMS_PER_PAGE);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Events Management</h1>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Events" value={stats.total} />
        <StatCard title="Upcoming" value={stats.upcoming} />
        <StatCard title="Live" value={stats.live} />
        <StatCard title="Past" value={stats.past} />
      </div>

      <Input 
        className="max-w-72"
        placeholder="Search events..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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
    </div>
  );
}
