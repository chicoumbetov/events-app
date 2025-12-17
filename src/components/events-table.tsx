import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Event, EVENT_STATUS } from "@/types/event";
import Link from "next/link";

interface EventsTableProps {
  events: Event[];
}

export function EventsTable({ events }: EventsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case EVENT_STATUS.LIVE: return "bg-green-500 hover:bg-green-600";
      case EVENT_STATUS.UPCOMING: return "bg-blue-500 hover:bg-blue-600";
      case EVENT_STATUS.PAST: return "bg-gray-500 hover:bg-gray-600";
      default: return "bg-slate-500";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
