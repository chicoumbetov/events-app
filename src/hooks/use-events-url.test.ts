// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useEventsUrl } from './use-events-url';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('useEventsUrl', () => {
  const mockPush = vi.fn();
  const mockPathname = '/events';

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    (useRouter as any).mockReturnValue({ push: mockPush });
    (usePathname as any).mockReturnValue(mockPathname);
  });

  it('initializes with default values when search params are empty', () => {
    (useSearchParams as any).mockReturnValue(new URLSearchParams());
    const { result } = renderHook(() => useEventsUrl());

    expect(result.current.currentStatus).toBe('all');
    expect(result.current.currentPage).toBe(1);
    expect(result.current.searchQuery).toBe('');
  });

  it('extracts initial state from search params correctly', () => {
    const params = new URLSearchParams('status=live&sort=asc&page=3&q=london');
    (useSearchParams as any).mockReturnValue(params);
    const { result } = renderHook(() => useEventsUrl());

    expect(result.current.currentStatus).toBe('live');
    expect(result.current.sortOrder).toBe('asc');
    expect(result.current.currentPage).toBe(3);
    expect(result.current.searchQuery).toBe('london');
  });

  it('updates the URL immediately via updateURL', () => {
    (useSearchParams as any).mockReturnValue(new URLSearchParams());
    const { result } = renderHook(() => useEventsUrl());

    act(() => {
      result.current.updateURL({ status: 'past', page: '1' });
    });

    expect(mockPush).toHaveBeenCalledWith('/events?status=past&page=1');
  });

  it('debounces search input changes by 300ms', () => {
    (useSearchParams as any).mockReturnValue(new URLSearchParams());
    const { result } = renderHook(() => useEventsUrl());

    act(() => {
      result.current.setSearchTerm('paris');
    });

    // Should not call router.push immediately
    expect(mockPush).not.toHaveBeenCalled();

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockPush).toHaveBeenCalledWith('/events?q=paris&page=1');
  });
});
