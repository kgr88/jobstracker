import { formatDate } from '@/lib/utils';
import { Button, Card, CardBody, CardHeader, Skeleton } from '@heroui/react';
import { Application, Interview } from '../../../../types';

interface UpcomingInterviewsProps {
  interviews: Interview[];
  loading: boolean;
  interviewsLoading: boolean;
  applications: Application[];
  onOpenInterview: () => void;
}

export default function UpcomingInterviews({
  interviews,
  applications,
  loading,
  interviewsLoading,
  onOpenInterview,
}: UpcomingInterviewsProps) {
  return (
    <Card
      className="h-full min-h-[280px] md:order-2 flex flex-col"
      classNames={{
        base: 'flex flex-col h-full',
        body: 'overflow-auto max-h-72 flex-1',
      }}>
      <CardHeader className="pb-2">
        <h2 className="text-lg font-semibold">Upcoming Interviews</h2>
      </CardHeader>
      <CardBody className="overflow-y-auto">
        {interviewsLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="p-3 bg-default-100 rounded-lg">
                <Skeleton className="h-4 w-32 rounded mb-2" />
                <Skeleton className="h-3 w-24 rounded mb-1" />
                <Skeleton className="h-3 w-20 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {(() => {
              const upcomingInterviews =
                interviews
                  ?.filter(interview => {
                    const interviewDate = new Date(interview.interviewDate.toDate());
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return interviewDate >= today;
                  })
                  .sort((a, b) => a.interviewDate.toDate().getTime() - b.interviewDate.toDate().getTime()) || [];

              return upcomingInterviews.length > 0 ? (
                upcomingInterviews.map(interview => {
                  const app = applications.find(a => a.id === interview.applicationId);
                  return (
                    <div key={interview.id} className="p-3 bg-default-100 rounded-lg">
                      <h3 className="font-semibold text-sm">{app?.position || 'Unknown Position'}</h3>
                      <p className="text-xs text-default-600">{app?.company || 'Unknown Company'}</p>
                      <p className="text-xs text-default-500">{formatDate(interview.interviewDate)}</p>
                    </div>
                  );
                })
              ) : (
                <div className="flex justify-center">
                  <p className="text-default-600 text-sm">No upcoming interviews</p>
                </div>
              );
            })()}
          </div>
        )}
      </CardBody>
      <div className="p-3 mt-auto">
        <Button
          variant="bordered"
          size="lg"
          className="w-full"
          onPress={onOpenInterview}
          isDisabled={loading || applications.length === 0}>
          Schedule Interview
        </Button>
      </div>
    </Card>
  );
}
