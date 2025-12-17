import { getEvents } from "@/lib/api";
import EventsClientView from "../../components/events-client-view";

export const metadata = {
  title: 'Events Management | Timeleft Back-office',
  description: 'Manage and monitor all social events.',
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="container mx-auto py-10 space-y-8">
      <EventsClientView initialEvents={events} />
    </div>
  );
}
