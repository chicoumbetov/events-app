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
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead 
              className="cursor-pointer hover:text-foreground select-none" 
              onClick={onSortChange}
              aria-label={`Sort by date ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
            >
              Date {sortOrder === 'asc' ? '↑' : '↓'}
            </TableHead>
            <TableHead className="w-[180px]">
              <Select value={currentStatus} onValueChange={onStatusChange}>
                <SelectTrigger className="h-8 border-none bg-transparent p-0 focus:ring-0 shadow-none font-bold">
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
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.type}</TableCell>
              <TableCell>{`${event.zone.city.name} (${event.zone.name})`}</TableCell>
              <TableCell>{formatDate(event.date)}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(event.status)}>
                  {event.status}
                </Badge>
              </TableCell>
              <TableCell>{`${event.booked} / ${event.capacity}`}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/events/${event.id}`}>View</Link>
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
