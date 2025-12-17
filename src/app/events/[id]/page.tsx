import { EventDetailView } from "@/components/event-detail-view";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Event ${id} | Timeleft`,
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;

  return <EventDetailView id={id} />;
}
