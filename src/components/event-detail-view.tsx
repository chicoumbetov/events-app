import { Calendar as CalendarIcon, CheckCircle2, ChevronLeft, MapPin, Ticket, Users } from "lucide-react";
import Link from "next/link";
import { getStatusColor } from "../lib/event-logic";
import { formatDate } from "../lib/utils";
import { Event } from "../types/event";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface EventDetailViewProps {
  event: Event;
}

export function EventDetailView({ event }: EventDetailViewProps) {
  const occupancyRate = Math.round((event.booked / event.capacity) * 100);

  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Navigation & Header */}
      <nav aria-label="Back">
        <Button variant="ghost" asChild className="pl-0 hover:bg-transparent -ml-2">
          <Link href="/events" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Events Dashboard
          </Link>
        </Button>
      </nav>

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight">{event.type}</h1>
            <Badge className={getStatusColor(event.status)} aria-label={`Event status: ${event.status}`}>
              {event.status}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
            <div className="flex items-center gap-1.5" aria-label="Location">
              <MapPin className="h-4 w-4 text-primary" />
              {event.zone.city.name} — {event.zone.name}
            </div>
            <div className="flex items-center gap-1.5" aria-label="Date">
              <CalendarIcon className="h-4 w-4 text-primary" />
              {formatDate(event.date)}
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline">Edit Event</Button>
          <Button>Manage Attendees</Button>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Occupancy Card (PM Focus) */}
        <section className="md:col-span-2 rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Users className="h-5 w-5" /> Occupancy Overview
          </h2>
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold">{event.booked}</p>
                <p className="text-sm text-muted-foreground text-nowrap">Total Bookings</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{event.capacity}</p>
                <p className="text-sm text-muted-foreground text-nowrap">Total Capacity</p>
              </div>
            </div>
            
            <div className="w-full bg-muted rounded-full h-4 overflow-hidden" role="progressbar" aria-valuenow={occupancyRate} aria-valuemin={0} aria-valuemax={100}>
              <div 
                className={`h-full transition-all ${occupancyRate > 90 ? 'bg-orange-500' : 'bg-primary'}`} 
                style={{ width: `${occupancyRate}%` }} 
              />
            </div>
            <p className="text-sm font-medium text-center italic">
              This event is {occupancyRate}% full.
            </p>
          </div>
        </section>

        {/* Quick Actions/Info Card */}
        <aside className="space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-nowrap">
              <Ticket className="h-4 w-4" /> Management Details
            </h3>
            <ul className="space-y-4 text-sm" role="list">
              <li className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Event ID</span>
                <span className="font-mono">{event.id}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground text-nowrap">System Sync</span>
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="h-3 w-3" />Active
                </span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
