import { Card, CardBody, CardHeader, Skeleton } from '@heroui/react';
import { Application } from '../../../../types';
interface ApplicationStatsProps {
  applications: Application[];
  loading: boolean;
}

export default function ApplicationStats({ applications, loading }: ApplicationStatsProps) {
  return (
    <Card className="h-full min-h-[280px] md:order-1 bg-background border-default-100 border-1">
      <CardHeader className="pb-2">
        <h2 className="text-lg font-semibold">Application Stats</h2>
      </CardHeader>
      <CardBody className="flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-primary-100 dark:bg-cyan-900 rounded-lg h-[100px] flex flex-col justify-center">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-8 rounded mx-auto" />
                <Skeleton className="h-4 w-16 rounded mx-auto" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-bold text-primary-900">{applications.length}</p>
                <p className="text-sm text-default-600">Total Applications</p>
              </>
            )}
          </div>
          <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg h-[100px] flex flex-col justify-center">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-8 rounded mx-auto" />
                <Skeleton className="h-4 w-12 rounded mx-auto" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-bold text-success-900">
                  {applications.filter(app => app.status === 'Interview').length}
                </p>
                <p className="text-sm text-default-600">Interviews</p>
              </>
            )}
          </div>
          <div className="p-4 bg-warning-100 dark:bg-red-900 rounded-lg h-[100px] flex flex-col justify-center">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-8 rounded mx-auto" />
                <Skeleton className="h-4 w-10 rounded mx-auto" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-bold text-warning-900">
                  {applications.filter(app => app.status === 'Applied').length}
                </p>
                <p className="text-sm text-default-600">Pending</p>
              </>
            )}
          </div>
          <div className="p-4 bg-secondary-100 rounded-lg h-[100px] flex flex-col justify-center">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-8 rounded mx-auto" />
                <Skeleton className="h-4 w-14 rounded mx-auto" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-bold text-secondary-900">
                  {
                    applications.filter(
                      app => new Date(app.dateApplied.toDate()).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
                    ).length
                  }
                </p>
                <p className="text-sm text-default-600">This Week</p>
              </>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
