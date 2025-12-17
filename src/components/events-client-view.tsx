'use client';

import { EventsPagination } from "@/components/events-pagination";
import { EventsTable } from "@/components/events-table";
import { StatCard } from "@/components/stat-card";
import { Input } from "@/components/ui/input";
import { useEventsUrl } from "@/hooks/use-events-url";
import { calculateEventStats, getProcessedEvents } from "@/lib/event-logic";
import { Event } from '@/types/event';
import { Activity, Calendar, History, Layers, Loader2, Search } from "lucide-react";
import { useMemo, useTransition } from 'react';

const ITEMS_PER_PAGE = 5;

export default function EventsClientView({ initialEvents }: { initialEvents: Event[] }) {
  const [isPending, startTransition] = useTransition();
  const {
    currentStatus,
    sortOrder,
    currentPage,
    searchTerm,
    setSearchTerm,
    searchQuery,
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
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground uppercase">Events</h1>
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground font-medium">
              Showing {paginatedEvents.length} of {processedEvents.length} events
            </p>
            {isPending && <Loader2 className="h-4 w-4 animate-spin text-brand-primary" />}
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-primary" />
          <Input 
            id="event-search"
            className="pl-10 border-none bg-card shadow-sm focus-visible:ring-brand-primary h-11"
            placeholder="Search events or cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Events" value={stats.total} icon={Layers} />
        <StatCard title="Upcoming" value={stats.upcoming} icon={Calendar} iconColor="text-brand-primary" />
        <StatCard title="Live" value={stats.live} icon={Activity} iconColor="text-green-500" />
        <StatCard title="Past" value={stats.past} icon={History} iconColor="text-gray-500" />
      </div>

      <div className="space-y-4">
        <div className={`bg-card rounded-xl shadow-sm border border-border/50 overflow-hidden transition-opacity duration-200 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
          <EventsTable 
            id="events-table"
            events={paginatedEvents} 
            currentStatus={currentStatus}
            onStatusChange={(v) => startTransition(() => updateURL({ status: v, page: '1' }))}
            sortOrder={sortOrder}
            onSortChange={() => startTransition(() => updateURL({ sort: sortOrder === 'asc' ? 'desc' : 'asc' }))}
          />
        </div>

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
