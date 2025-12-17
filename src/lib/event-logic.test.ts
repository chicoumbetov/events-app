
import { describe, expect, it } from 'vitest';
import { Event, EVENT_STATUS } from '../types/event';
import { calculateEventStats, getProcessedEvents, getStatusColor } from './event-logic';

const mockEvents: Event[] = [
  {
    id: '1',
    type: 'Dinner',
    status: EVENT_STATUS.LIVE,
    date: '2025-01-01T20:00:00Z',
    booked: 10,
    capacity: 20,
    zone: { id: 1, name: 'Zone A', city: { id: 1, name: 'Paris', country: { id: 1, name: 'France' } } }
  },
  {
    id: '2',
    type: 'Coffee',
    status: EVENT_STATUS.UPCOMING,
    date: '2025-02-01T10:00:00Z',
    booked: 5,
    capacity: 10,
    zone: { id: 2, name: 'Zone B', city: { id: 2, name: 'London', country: { id: 2, name: 'UK' } } }
  }
];

describe('event-logic', () => {
  describe('calculateEventStats', () => {
    it('correctly counts statuses', () => {
      const stats = calculateEventStats(mockEvents);
      expect(stats.total).toBe(2);
      expect(stats.live).toBe(1);
      expect(stats.upcoming).toBe(1);
      expect(stats.past).toBe(0);
    });
  });

  describe('getProcessedEvents', () => {
    it('filters by status', () => {
      const result = getProcessedEvents(mockEvents, { status: EVENT_STATUS.LIVE, query: '', sort: 'desc' });
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('Dinner');
    });

    it('filters by search query (city name)', () => {
      const result = getProcessedEvents(mockEvents, { status: 'all', query: 'london', sort: 'desc' });
      expect(result).toHaveLength(1);
      expect(result[0].zone.city.name).toBe('London');
    });

    it('sorts by date descending', () => {
      const result = getProcessedEvents(mockEvents, { status: 'all', query: '', sort: 'desc' });
      // Feb 1st comes before Jan 1st in desc order
      expect(result[0].id).toBe('2');
    });
  });

  describe('getStatusColor', () => {
    it('returns correct classes for LIVE status', () => {
      expect(getStatusColor(EVENT_STATUS.LIVE)).toContain('bg-green-500');
    });
  });
});
