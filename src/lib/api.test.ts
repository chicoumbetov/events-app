import { describe, expect, it } from 'vitest';
import { getEvents } from './api';

describe('api', () => {
  it('returns an empty array when API_URL is missing', async () => {
    const originalEnv = process.env.API_URL;
    delete process.env.API_URL;

    const result = await getEvents();
    expect(result).toEqual([]);
    
    process.env.API_URL = originalEnv;
  });
});
