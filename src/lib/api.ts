import { cache } from 'react';
import { Event } from "../types/event";

export const getEvents = cache(async (): Promise<Event[]> => {
  const url = process.env.API_URL;
  if (!url) return [];

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
});

export const getEventById = cache(async (id: string) => {
  const events = await getEvents();
  return events.find(e => e.id === id);
});
