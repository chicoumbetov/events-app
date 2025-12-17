import { Event } from "@/types/event";

export async function getEvents(): Promise<Event[]> {
  const res = await fetch('https://cdn.timeleft.com/frontend-tech-test/events.json', {
    next: { revalidate: 3600 } 
  });

  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}
