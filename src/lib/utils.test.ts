import { describe, expect, it } from 'vitest';
import { formatDate } from './utils';

describe('utils', () => {
  describe('formatDate', () => {
    it('formats ISO strings to en-GB format', () => {
      const date = '2025-12-25T20:00:00Z';
      expect(formatDate(date)).toBe('25 Dec 2025');
    });

    it('handles empty or null inputs gracefully', () => {
      // @ts-ignore
      expect(formatDate(null)).toBe('N/A');
    });
  });
});
