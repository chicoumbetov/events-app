'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useEventsUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get('status') || 'all';
  const sortOrder = searchParams.get('sort') || 'desc';
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(searchQuery);

  const updateURL = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === 'all') params.delete(key);
      else params.set(key, value);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== searchQuery) {
        updateURL({ q: searchTerm || null, page: '1' });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, searchQuery]);

  return {
    currentStatus,
    sortOrder,
    currentPage,
    searchQuery,
    searchTerm,
    setSearchTerm,
    updateURL,
  };
}
