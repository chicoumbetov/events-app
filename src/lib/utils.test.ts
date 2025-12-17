import { describe, expect, it } from 'vitest';
import { formatTime, getTimeDistance } from './utils';

describe('utils', () => {
  describe('formatTime', () => {
    it('extracts 24h time from ISO string in UTC', () => {
      const date = '2025-12-25T20:30:00Z';
      // This will now pass regardless of local system timezone
      expect(formatTime(date)).toBe('20:30');
    });
  });

  describe('getTimeDistance', () => {
    it('returns "tomorrow" or "in 2 days" for future dates', () => {
      // Use a 3-day offset to avoid "tomorrow" logic in 'auto' mode
      const futureDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
      expect(getTimeDistance(futureDate)).toBe('in 3 days');
    });

    it('returns "Already started" for past dates', () => {
      const pastDate = new Date(Date.now() - 10000).toISOString();
      expect(getTimeDistance(pastDate)).toBe('Already started');
    });
  });
});
