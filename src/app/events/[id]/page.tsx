import { EventDetailView } from "@/components/event-detail-view";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;

  return <EventDetailView id={id} />;
}
