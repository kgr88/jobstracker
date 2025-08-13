import { useMemo } from 'react';

export function usePagination<T>(items: T[], currentPage: number, itemsPerPage: number = 5) {
  return useMemo(() => {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    return {
      totalPages,
      currentItems,
      totalItems,
      hasMultiplePages: totalPages > 1,
    };
  }, [items, currentPage, itemsPerPage]);
}