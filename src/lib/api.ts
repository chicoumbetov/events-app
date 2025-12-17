import { Event } from "@/types/event";

export async function getEvents(): Promise<Event[]> {
  const url = process.env.API_URL;

  if (!url) {
    throw new Error('Missing API_URL environment variable');
  }

  const res = await fetch(url, {
    next: { revalidate: 3600 } 
  });

  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}
