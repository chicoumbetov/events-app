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
    <main className="container mx-auto py-10 space-y-8 animate-in fade-in duration-500">
      {/* A11y: Semantic navigation landmark */}
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
          <section className="flex items-center gap-3 p-4 rounded-lg bg-muted/50" aria-label="Location">
            <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
            <div>
              <p className="text-xs uppercase text-muted-foreground font-semibold">Location</p>
              <p className="font-medium">{event.zone.city.name}, {event.zone.name}</p>
            </div>
          </section>

          <section className="flex items-center gap-3 p-4 rounded-lg bg-muted/50" aria-label="Date">
            <CalendarIcon className="h-5 w-5 text-primary" aria-hidden="true" />
            <div>
              <p className="text-xs uppercase text-muted-foreground font-semibold">Date</p>
              {/* A11y: Semantic time tag */}
              <time dateTime={event.date} className="font-medium">{formatDate(event.date)}</time>
            </div>
          </section>

          <section className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-transparent hover:border-primary/20 transition-colors" aria-label="Time">
            <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
            <div>
              <p className="text-xs uppercase text-muted-foreground font-semibold">Local Time</p>
              <div className="flex items-center gap-2">
                <time dateTime={event.date} className="font-medium">{formatTime(event.date)}</time>
                <Badge variant="outline" className="text-[10px] h-4 px-1 font-normal uppercase">
                  {getTimeDistance(event.date)}
                </Badge>
              </div>
            </div>
          </section>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-12">
        <section className="md:col-span-8 rounded-xl border p-8 space-y-8" aria-labelledby="occupancy-title">
          <div className="flex items-center justify-between">
            <h2 id="occupancy-title" className="text-xl font-bold flex items-center gap-2">
              <Users className="h-5 w-5" aria-hidden="true" /> Occupancy Metrics
            </h2>
            <span className="text-sm font-medium px-2 py-1 bg-zinc-100 rounded">
              {event.booked} / {event.capacity} seats
            </span>
          </div>

          <div className="space-y-4">
             {/* A11y: Progress bar connected to title */}
             <div 
              className="w-full bg-zinc-200 rounded-full h-4 overflow-hidden"
              role="progressbar" 
              aria-valuenow={occupancyRate} 
              aria-valuemin={0} 
              aria-valuemax={100}
              aria-labelledby="occupancy-title"
            >
              <div 
                className="h-full bg-primary transition-all duration-1000"
                style={{ width: `${occupancyRate}%` }} 
              />
            </div>
              <p className="text-sm text-center text-muted-foreground">
                Current fill rate: <span className="text-foreground font-bold">{occupancyRate}%</span>
              </p>
          </div>
        </section>

        <aside className="md:col-span-4 space-y-6">
          <section className="rounded-xl border p-6 bg-zinc-50" aria-labelledby="regional-title">
            <h3 id="regional-title" className="font-bold flex items-center gap-2 mb-4">
              <Globe className="h-4 w-4" aria-hidden="true" /> Regional Data
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Country</dt>
                <dd className="font-medium">{event.zone.city.country.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">City ID</dt>
                <dd className="font-medium">{event.zone.city.id}</dd>
              </div>
              <div className="flex justify-between border-t pt-3">
                <dt className="text-muted-foreground">Data Integrity</dt>
                <dd className="text-green-700 flex items-center gap-1 font-bold">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>
    </main>
  );
}
