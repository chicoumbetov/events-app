import { Suspense } from "react";
import EventsClientView from "../../components/events-client-view";
import { EventsTableSkeleton } from "../../components/events-table-skeleton";
import { getEvents } from "../../lib/api";

export const metadata = {
  title: 'Events Management',
  description: 'Manage and monitor all social events.',
};

async function EventsList() {
  const events = await getEvents();
  return <EventsClientView initialEvents={events} />;
}

export default function EventsPage() {
  return (
    <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <h1 className="sr-only">Events Management Dashboard</h1>
      <Suspense fallback={<EventsTableSkeleton />}>
        <EventsList />
      </Suspense>
    </main>
  );
}
