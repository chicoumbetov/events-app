import { Event, EVENT_STATUS } from "@/types/event";

/**
 * Calculates dashboard statistics
 */
export const calculateEventStats = (events: Event[]) => ({
  total: events.length,
  upcoming: events.filter(e => e.status === EVENT_STATUS.UPCOMING).length,
  live: events.filter(e => e.status === EVENT_STATUS.LIVE).length,
  past: events.filter(e => e.status === EVENT_STATUS.PAST).length,
});

/**
 * Pure function to filter and sort events
 */
export function getProcessedEvents(
  events: Event[],
  { status, query, sort }: { status: string; query: string; sort: string }
) {
  let result = [...events];

  if (status !== 'all') {
    result = result.filter(e => e.status === status);
  }

  if (query) {
    const term = query.toLowerCase().trim();
    result = result.filter(e => 
      e.type.toLowerCase().includes(term) || 
      e.zone.city.name.toLowerCase().includes(term) ||
      e.zone.name.toLowerCase().includes(term)
    );
  }

  result.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sort === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return result;
}

/**
 * Move getStatusColor here for global reuse
 */
export const getStatusColor = (status: string) => {
  switch (status) {
    case EVENT_STATUS.LIVE: return "bg-green-500 hover:bg-green-600";
    case EVENT_STATUS.UPCOMING: return "bg-blue-500 hover:bg-blue-600";
    case EVENT_STATUS.PAST: return "bg-gray-500 hover:bg-gray-600";
    default: return "bg-slate-500";
  }
};
