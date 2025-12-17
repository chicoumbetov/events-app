import { describe, expect, it } from 'vitest';
import { getEvents } from '../lib/api';


describe('api', () => {
  it('throws a specific error when API_URL is missing', async () => {
    const originalEnv = process.env.API_URL;
    delete process.env.API_URL;
    
    await expect(getEvents()).rejects.toThrow('Missing API_URL environment variable');
    
    process.env.API_URL = originalEnv;
  });
});
