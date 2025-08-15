'use client';
import { useApplications } from '@/hooks/useApplications';
import { useInterviews } from '@/hooks/useInterviews';
import AddApplication from '@/components/AddApplication';
import AddInterview from '@/components/AddInterview';
import { useDisclosure } from '@heroui/react';
import RecentApplications from './components/RecentApplications';
import ApplicationsStats from './components/ApplicationsStats';
import UpcomingInterviews from './components/UpcomingInterviews';

export default function Dashboard() {
  const { applications, loading, error, refetch: applicationsRefetch } = useApplications();
  const {
    interviews,
    loading: interviewsLoading,
    error: interviewsError,
    refetch: interviewsRefetch,
  } = useInterviews();

  const {
    isOpen: isOpenApplication,
    onOpen: onOpenApplication,
    onOpenChange: onOpenChangeApplication,
  } = useDisclosure();
  const { isOpen: isOpenInterview, onOpen: onOpenInterview, onOpenChange: onOpenChangeInterview } = useDisclosure();

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (interviewsError) {
    return <div>Error: {interviewsError}</div>;
  }

  const handleUpdate = () => {
    interviewsRefetch();
    applicationsRefetch();
  };

  return (
    <div>
      <AddApplication
        isOpen={isOpenApplication}
        onOpenChange={onOpenChangeApplication}
        onApplicationAdded={applicationsRefetch}
        onClose={onOpenChangeApplication}
      />
      <AddInterview
        applications={applications}
        isOpen={isOpenInterview}
        onOpenChange={onOpenChangeInterview}
        onInterviewAdded={handleUpdate}
        onClose={onOpenChangeInterview}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[600px]">
        <UpcomingInterviews
          loading={loading}
          interviewsLoading={interviewsLoading}
          applications={applications}
          interviews={interviews}
          onOpenInterview={onOpenInterview}
        />
        <ApplicationsStats loading={loading} applications={applications} />
        <RecentApplications
          applications={applications}
          loading={loading}
          onOpenApplication={onOpenApplication}
          onApplicationUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}
