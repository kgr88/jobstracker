'use client';
import { useApplications } from '@/hooks/useApplications';
import AddApplication from '@/components/AddApplication';
import AddInterview from '@/components/AddInterview';
import FilterPanel from './components/FilterPanel';
import { Card, useDisclosure } from '@heroui/react';
import { useApplicationFilters } from '@/hooks/useApplicationFilters';
import { usePagination } from '@/hooks/usePagination';
import ApplicationsList from './components/ApplicationsList';
import ApplicationsHeader from './components/ApplicationsHeader';

export default function Applications() {
  const { applications, loading, error, refetch } = useApplications();
  const itemsPerPage = 5;

  const {
    currentPage,
    sortOrder,
    searchTerm,
    selectedStatus,
    filteredApplications,
    setCurrentPage,
    handleSortChange,
    handleSearchChange,
    handleStatusFilter,
    handleClearFilters,
  } = useApplicationFilters(applications);

  //
  const paginationData = usePagination(filteredApplications, currentPage, itemsPerPage);

  const {
    isOpen: isOpenApplication,
    onOpen: onOpenApplication,
    onOpenChange: onOpenChangeApplication,
  } = useDisclosure();
  const { isOpen: isOpenInterview, onOpen: onOpenInterview, onOpenChange: onOpenChangeInterview } = useDisclosure();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="lg:flex lg:gap-6">
      <FilterPanel
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
        onStatusFilter={handleStatusFilter}
        onClearFilters={handleClearFilters}
        sortOrder={sortOrder}
        searchTerm={searchTerm}
        selectedStatus={selectedStatus}
      />

      <div className="flex-1">
        <AddApplication
          isOpen={isOpenApplication}
          onOpenChange={onOpenChangeApplication}
          onApplicationAdded={() => {
            refetch();
          }}
          onClose={onOpenChangeApplication}
        />
        <AddInterview
          applications={applications}
          isOpen={isOpenInterview}
          onOpenChange={onOpenChangeInterview}
          onInterviewAdded={() => {
            refetch();
          }}
          onClose={onOpenChangeInterview}
        />
        <Card className="p-4" radius="sm">
          <ApplicationsHeader
            onOpenApplication={onOpenApplication}
            onOpenInterview={onOpenInterview}
            loading={loading}
          />
          <ApplicationsList
            applications={paginationData.currentItems}
            loading={loading}
            currentPage={currentPage}
            totalPages={paginationData.totalPages}
            hasMultiplePages={paginationData.hasMultiplePages}
            onPageChange={setCurrentPage}
            onClearFilters={handleClearFilters}
            itemsPerPage={itemsPerPage}
            refetch={refetch}
          />
        </Card>
      </div>
    </div>
  );
}
