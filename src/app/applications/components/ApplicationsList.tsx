import { Button, Pagination } from '@heroui/react';
import ApplicationCard from '@/components/ApplicationCard';
import ApplicationSkeletons from '@/components/ApplicationsSkeleton';
import { Application } from '../../../../types';

interface ApplicationsListProps {
  applications: Application[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  hasMultiplePages: boolean;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
  itemsPerPage: number;
  refetch: () => void;
}

export default function ApplicationsList({
  applications,
  loading,
  currentPage,
  totalPages,
  hasMultiplePages,
  onPageChange,
  onClearFilters,
  itemsPerPage,
  refetch,
}: ApplicationsListProps) {
  const handleStatusUpdate = () => {
    refetch();
  };
  if (loading) {
    return <ApplicationSkeletons count={itemsPerPage} />;
  }
  if (applications.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-default-500">No applications found matching your filters.</p>
        <Button variant="bordered" size="sm" className="mt-4" onPress={onClearFilters}>
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <>
      <div>
        {applications.map(app => (
          <ApplicationCard key={app.id} application={app} onStatusUpdate={handleStatusUpdate} />
        ))}
      </div>

      {!loading && hasMultiplePages && (
        <div className="flex justify-center mt-6">
          <Pagination
            initialPage={1}
            page={currentPage}
            total={totalPages}
            onChange={onPageChange}
            variant="bordered"
            showControls
          />
        </div>
      )}
    </>
  );
}
