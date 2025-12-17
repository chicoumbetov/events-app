'use client';

import { EventsTable } from "@/components/events-table";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Event, EVENT_STATUS } from '@/types/event';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const ITEMS_PER_PAGE = 5;

export default function EventsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const currentStatus = searchParams.get('status') || 'all';
  const sortOrder = searchParams.get('sort') || 'desc';
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(searchQuery);

  useEffect(() => {
    fetch('https://cdn.timeleft.com/frontend-tech-test/events.json')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL({ q: searchTerm || null, page: '1' });
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const updateURL = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === 'all') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleStatusChange = (value: string) => updateURL({ status: value, page: '1' });
  const handleSortChange = () => updateURL({ sort: sortOrder === 'asc' ? 'desc' : 'asc' });
  const handlePageChange = (newPage: number) => updateURL({ page: newPage.toString() });

  const stats = useMemo(() => {
    return {
      total: events.length,
      upcoming: events.filter(e => e.status === EVENT_STATUS.UPCOMING).length,
      live: events.filter(e => e.status === EVENT_STATUS.LIVE).length,
      past: events.filter(e => e.status === EVENT_STATUS.PAST).length,
    };
  }, [events]);

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

  if (loading) return <div className="p-8 text-center">Loading events...</div>;

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Events Management</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Events" value={stats.total} />
        <StatCard title="Upcoming" value={stats.upcoming} />
        <StatCard title="Live" value={stats.live} />
        <StatCard title="Past" value={stats.past} />
      </div>

      <div className="w-full md:w-72">
        <Input 
          placeholder="Search by event type (e.g. Dinner)..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <EventsTable 
          events={paginatedEvents} 
          currentStatus={currentStatus}
          onStatusChange={handleStatusChange}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />

        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedEvents.length} of {processedEvents.length} filtered results
          </p>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-muted-foreground mr-4">
              Page {currentPage} of {Math.max(totalPages, 1)}
            </div>
            <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
