export const EVENT_STATUS = {
  UPCOMING: 'upcoming',
  LIVE: 'live',
  PAST: 'past',
} as const;
  
export type EventStatus = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS];

export interface Event {
  id: string;
  type: string;
  date: string;
  zone: Zone
  booked: number;
  capacity: number;
  status: EventStatus;
}

export interface Zone {
  id: number;
  name: string;
  city: City;
}

export interface City {
  id: number;
  name: string;
  country: Country;
}

export interface Country {
  id: number;
  name: string;
}
