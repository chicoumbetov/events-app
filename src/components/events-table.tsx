import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStatusColor } from "@/lib/event-logic";
import { formatDate } from "@/lib/utils";
import { Event, EVENT_STATUS } from "@/types/event";
import Link from "next/link";

interface EventsTableProps {
  id?: string;
  events: Event[];
  currentStatus: string;
  onStatusChange: (value: string) => void;
  sortOrder: string;
  onSortChange: () => void;
}

export function EventsTable({ id, events, currentStatus, onStatusChange, sortOrder, onSortChange }: EventsTableProps) {
  return (
    <div id={id} className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
          <TableHead scope="col">Type</TableHead>
          <TableHead scope="col">Location</TableHead>
          <TableHead 
            scope="col"
            className="cursor-pointer hover:text-foreground"
              onClick={onSortChange}
              role="button"
              tabIndex={0}
              aria-sort={sortOrder === 'asc' ? 'ascending' : 'descending'}
              aria-label={`Sort by date ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
              onKeyDown={(e) => e.key === 'Enter' && onSortChange()}
            >
              Date {sortOrder === 'asc' ? '↑' : '↓'}
            </TableHead>
            <TableHead className="w-[180px]">
              <label id="status-select-label" className="sr-only">Filter by status</label>
              <Select value={currentStatus} onValueChange={onStatusChange}>
                <SelectTrigger
                  aria-labelledby="status-select-label"
                  className="h-8 border-none bg-transparent p-0 focus:ring-2 focus:ring-brand-primary/50 shadow-none font-bold transition-all"
                >
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value={EVENT_STATUS.UPCOMING}>Upcoming</SelectItem>
                  <SelectItem value={EVENT_STATUS.LIVE}>Live</SelectItem>
                  <SelectItem value={EVENT_STATUS.PAST}>Past</SelectItem>
                </SelectContent>
              </Select>
            </TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {events.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              No events found matching your criteria.
            </TableCell>
          </TableRow>
        ) : (
          events.map((event) => (
            <TableRow key={event.id} className="hover:bg-brand-primary/5 transition-colors group">
              <TableCell scope="row" className="font-medium group-hover:text-brand-primary">
                {event.type}
              </TableCell>
              <TableCell>{`${event.zone.city.name} (${event.zone.name})`}</TableCell>
              <TableCell>{formatDate(event.date)}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(event.status)}>
                  {event.status}
                </Badge>
              </TableCell>
              <TableCell>{`${event.booked} / ${event.capacity}`}</TableCell>
              <TableCell className="text-right">
              <Button 
                variant="default" 
                size="sm" 
                asChild 
                className="bg-brand-primary hover:bg-brand-secondary text-white shadow-sm"
              >
                <Link
                  href={`/events/${event.id}`}
                  aria-label={`View details for ${event.type} in ${event.zone.city.name}`}
                >
                  View
                </Link>
              </Button>
              </TableCell>
            </TableRow>
          ))
        )}
        </TableBody>
      </Table>
    </div>
  );
}
