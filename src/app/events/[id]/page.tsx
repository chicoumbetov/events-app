import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EventDetailView } from "../../../components/event-detail-view";
import { getEventById } from "../../../lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) notFound();

  return (
    <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <Suspense fallback={<div className="h-96 w-full animate-pulse bg-muted rounded-xl" />}>
        <EventDetailView event={event} />
      </Suspense>
    </main>
  );
}
