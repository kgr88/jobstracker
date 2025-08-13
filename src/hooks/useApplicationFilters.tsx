import { useState, useMemo } from 'react';
import { Application } from '../../types';

export function useApplicationFilters(applications: Application[]) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredAndSortedApplications = useMemo(() => {
    let filtered = [...applications];

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        app =>
          app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(app => app.status === selectedStatus);
    }

    filtered.sort((a, b) => {
      const aDate = new Date(a.dateApplied.toDate()).getTime();
      const bDate = new Date(b.dateApplied.toDate()).getTime();
      return sortOrder === 'asc' ? aDate - bDate : bDate - aDate;
    });

    return filtered;
  }, [applications, searchTerm, selectedStatus, sortOrder]);

  const handleSortChange = (newSortOrder: 'asc' | 'desc') => {
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSortOrder('desc');
    setSearchTerm('');
    setSelectedStatus('all');
    setCurrentPage(1);
  };

  return {
    currentPage,
    sortOrder,
    searchTerm,
    selectedStatus,
    filteredApplications: filteredAndSortedApplications,

    setCurrentPage,
    handleSortChange,
    handleSearchChange,
    handleStatusFilter,
    handleClearFilters,
  };
}
