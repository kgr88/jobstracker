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
  const { applications, loading, error, refetch } = useApplications();
  const { interviews, loading: interviewsLoading, error: interviewsError } = useInterviews();

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

  return (
    <div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[600px]">
        <UpcomingInterviews
          loading={loading}
          interviewsLoading={interviewsLoading}
          applications={applications}
          interviews={interviews}
          onOpenInterview={onOpenInterview}
        />
        <ApplicationsStats loading={loading} applications={applications} />
        <RecentApplications loading={loading} applications={applications} onOpenApplication={onOpenApplication} />
        
      </div>
    </div>
  );
}
