import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'UTC',
});

export function formatDate(dateString: string) {
  if (!dateString) return 'N/A';
  try {
    return dateFormatter.format(new Date(dateString));
  } catch {
    return 'Invalid Date';
  }
}

export function formatTime(dateString: string) {
  if (!dateString) return 'N/A';
  try {
    return timeFormatter.format(new Date(dateString));
  } catch {
    return 'Invalid Time';
  }
}

/**
 * Business Logic: Returns human-readable distance to the event.
 * Using Intl.RelativeTimeFormat for A11y and internationalization.
 */
export function getTimeDistance(dateString: string) {
  if (!dateString) return '';
  const eventDate = new Date(dateString).getTime();
  const now = Date.now();
  const diffInMs = eventDate - now;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (diffInMs < 0) return 'Already started';
  if (diffInHours < 1) return 'Starts in less than an hour';
  if (diffInHours < 24) return rtf.format(diffInHours, 'hour');
  return rtf.format(diffInDays, 'day');
}
