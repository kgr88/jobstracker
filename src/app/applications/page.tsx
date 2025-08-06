'use client';
import { useApplications } from '@/hooks/useApplications';
import AddApplication from '@/components/AddApplication';
import AddInterview from '@/components/AddInterview';
import { formatDate, getHostname } from '@/lib/utils';
import { Button, Card, CardHeader, CardBody, CardFooter, Skeleton } from '@heroui/react';
import { useDisclosure } from '@heroui/react';

export default function Applications() {
  const { applications, loading, error, refetch } = useApplications();
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
    <div>
      <div className="flex justify-between items-center py-2">
        <h1 className="text-2xl font-bold">Your job applications</h1>
        <div className="flex items-center gap-4">
          <Button onPress={onOpenInterview} isDisabled={loading}>
            Add Interview
          </Button>
          <Button onPress={onOpenApplication} isDisabled={loading}>
            Add Application
          </Button>
        </div>
      </div>

      <div>
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Card className="my-2" key={index}>
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <Skeleton className="h-4 w-40 rounded" />
                      <Skeleton className="h-3 w-32 rounded" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </CardHeader>
                <CardBody className="px-3 py-0">
                  <Skeleton className="h-3 w-full rounded" />
                  <Skeleton className="h-3 w-3/4 rounded mt-1" />
                </CardBody>
                <CardFooter className="gap-3">
                  <Skeleton className="h-3 w-24 rounded" />
                  <Skeleton className="h-3 w-32 rounded" />
                </CardFooter>
              </Card>
            ))
          : applications.map(app => (
              <Card className="my-2" key={app.id}>
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">{app.position}</h4>
                      <h5 className="text-small tracking-tight text-default-400">{app.company}</h5>
                    </div>
                  </div>
                  <Button
                    className="bg-transparent text-foreground border-default-200"
                    color="primary"
                    radius="full"
                    size="sm"
                    variant="bordered">
                    {app.status}
                  </Button>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                  <p>{app.notes}</p>
                </CardBody>
                <CardFooter className="gap-3">
                  <p className="font-semibold text-default-400 text-small">{formatDate(app.dateApplied)}</p>
                  <a href={app.postingUrl} className="text-default-400 text-small underline">
                    {getHostname(app.postingUrl)}
                  </a>
                </CardFooter>
              </Card>
            ))}
      </div>

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
    </div>
  );
}
