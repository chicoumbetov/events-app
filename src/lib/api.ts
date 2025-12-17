import { Event } from "../types/event";

export async function getEvents(): Promise<Event[]> {
  const url = process.env.API_URL;

  if (!url) {
    console.error('Missing API_URL environment variable');
    return []; // Return empty array to prevent total page crash
  }

  try {
    const res = await fetch(url, {
      next: { 
        revalidate: 3600,
        tags: ['events'] // * Allows for manual revalidation later
      } 
    });

    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}
