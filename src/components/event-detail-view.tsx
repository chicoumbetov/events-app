import { Calendar as CalendarIcon, ChevronLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { formatDate } from "../lib/utils";
import { Event } from "../types/event";
import { Button } from "./ui/button";

interface EventDetailViewProps {
  event: Event;
}

export function EventDetailView({ event }: EventDetailViewProps) {
  return (
    <div className="container mx-auto py-10 space-y-6">
      <Button variant="ghost" asChild className="pl-0 hover:bg-transparent">
        <Link href="/events" className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Events
        </Link>
      </Button>

      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">{event.type}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {event.zone.city.name} ({event.zone.name})
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            {formatDate(event.date)}
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="bg-primary/10 text-primary rounded-full p-4 mb-4">
            <CalendarIcon className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-semibold">Event Details Managed</h2>
          <p className="text-muted-foreground max-w-sm mt-2">
            This page is now receiving the full server-side data for 
            <strong> {event.type}</strong> in <strong>{event.zone.city.name}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
