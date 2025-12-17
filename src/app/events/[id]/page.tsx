import { notFound } from "next/navigation";
import { EventDetailView } from "../../../components/event-detail-view";
import { getEvents } from "../../../lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const events = await getEvents();
  const event = events.find(e => e.id === id);
  
  if (!event) return { title: 'Event Not Found' };

  return {
    title: `${event.type} | ${event.zone.city.name} - Timeleft`,
    description: `Join our ${event.type} event in ${event.zone.city.name} on ${event.date}. Secure your seat now!`,
    openGraph: {
      title: `${event.type} in ${event.zone.city.name}`,
      description: `Operational details for event ${id}`,
    }
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const events = await getEvents();
  const event = events.find(e => e.id === id);

  if (!event) {
    notFound();
  }

  return <EventDetailView event={event} />;
}
