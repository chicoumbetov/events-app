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
  
  return {
    title: event ? `${event.type} in ${event.zone.city.name}` : 'Event Not Found',
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
