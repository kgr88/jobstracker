import { Application } from '../../../../types';
import { Card, CardHeader, CardFooter, CardBody, Button, Skeleton } from '@heroui/react';
import { formatDate } from '@/lib/utils';
import { getHostname } from '@/lib/utils';

interface RecentApplicationsProps {
  applications: Application[];
  loading: boolean;
  onOpenApplication: () => void;
}

export default function RecentApplications({ applications, loading, onOpenApplication }: RecentApplicationsProps) {
  return (
    <Card className="md:row-span-2 h-full flex flex-col md:order-0">
      <CardHeader className="pb-2 ">
        <h2 className="text-xl font-bold">Recent Applications</h2>
        <Button onPress={onOpenApplication} isDisabled={loading} className="ml-auto">
          Add Application
        </Button>
      </CardHeader>
      <CardBody className="overflow-y-auto flex-1">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="h-[140px]">
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
            ))}
          </div>
        ) : applications.length > 0 ? (
          <div className="space-y-3">
            {applications.slice(0, 4).map(app => (
              <Card key={app.id} className="h-[140px]">
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
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-[580px]">
            <p className="text-default-600 mb-4">No applications yet</p>
            <Button color="primary" onPress={onOpenApplication}>
              Add Your First Application
            </Button>
          </div>
        )}
      </CardBody>
      <div className="p-3">
        <Button variant="bordered" size="lg" className="w-full" as="a" href="/applications">
          View All Applications
        </Button>
      </div>
    </Card>
  );
}
