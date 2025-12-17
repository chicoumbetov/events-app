import EventsClientView from "../../components/events-client-view";
import { getEvents } from "../../lib/api";

export const metadata = {
  title: 'Events Management',
  description: 'Manage and monitor all social events.',
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="container mx-auto py-10 space-y-8">
      <EventsClientView initialEvents={events} />
    </main>
  );
}
