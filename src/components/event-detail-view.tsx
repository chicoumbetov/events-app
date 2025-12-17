import { Calendar as CalendarIcon, ChevronLeft, Clock, Globe, MapPin, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { getStatusColor } from "../lib/event-logic";
import { formatDate, formatTime, getTimeDistance } from "../lib/utils";
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
      <nav aria-label="Breadcrumb">
        <Button variant="ghost" asChild className="pl-0 hover:bg-transparent -ml-2 text-muted-foreground">
          <Link href="/events" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Events / {event.zone.city.name} / <span className="text-foreground">{event.id}</span>
          </Link>
        </Button>
      </nav>

      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-5xl font-black uppercase tracking-tighter">{event.type}</h1>
          <Badge className={`${getStatusColor(event.status)} uppercase font-bold`}>
            {event.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs uppercase text-muted-foreground font-semibold">Location</p>
              <p className="font-medium">{event.zone.city.name}, {event.zone.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <CalendarIcon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs uppercase text-muted-foreground font-semibold">Date</p>
              <p className="font-medium">{formatDate(event.date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-transparent hover:border-primary/20 transition-colors">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs uppercase text-muted-foreground font-semibold">Local Time</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{formatTime(event.date)}</p>
                <Badge variant="outline" className="text-[10px] h-4 px-1 font-normal uppercase">
                  {getTimeDistance(event.date)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-12">
        <section className="md:col-span-8 rounded-xl border p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="h-5 w-5" /> Occupancy Metrics
            </h2>
            <span className="text-sm font-medium px-2 py-1 bg-zinc-100 rounded">
              {event.booked} / {event.capacity} seats
            </span>
          </div>

          <div className="space-y-4">
             <div className="w-full bg-zinc-100 rounded-full h-4 overflow-hidden" role="progressbar" aria-valuenow={occupancyRate} aria-valuemin={0} aria-valuemax={100}>
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-out" 
                  style={{ width: `${occupancyRate}%` }} 
                />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Current fill rate: <span className="text-foreground font-bold">{occupancyRate}%</span>
              </p>
          </div>
        </section>

        <aside className="md:col-span-4 space-y-6">
          <div className="rounded-xl border p-6 bg-zinc-50">
            <h3 className="font-bold flex items-center gap-2 mb-4">
              <Globe className="h-4 w-4" /> Regional Data
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Country</span>
                <span className="font-medium">{event.zone.city.country.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">City ID</span>
                <span className="font-medium">{event.zone.city.id}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-muted-foreground">Data Integrity</span>
                <span className="text-green-600 flex items-center gap-1 font-medium">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
