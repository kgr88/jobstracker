import { Card, CardBody, CardHeader, Skeleton } from '@heroui/react';
import { Application } from '../../../../types';
interface ApplicationStatsProps {
  applications: Application[];
  loading: boolean;
}

export default function ApplicationStats({ applications, loading }: ApplicationStatsProps) {
  return (
    <Card className="h-full min-h-[280px] md:order-1">
      <CardHeader className="pb-2">
        <h2 className="text-lg font-semibold">Application Stats</h2>
      </CardHeader>
      <CardBody className="flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-primary-50 rounded-lg h-[100px] flex flex-col justify-center">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-8 rounded mx-auto" />
                <Skeleton className="h-4 w-16 rounded mx-auto" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-bold text-primary">{applications.length}</p>
                <p className="text-sm text-default-600">Total Applications</p>
              </>
            )}
          </div>
          <div className="p-4 bg-success-50 rounded-lg h-[100px] flex flex-col justify-center">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-8 rounded mx-auto" />
                <Skeleton className="h-4 w-12 rounded mx-auto" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-bold text-success">
                  {applications.filter(app => app.status === 'Interview').length}
                </p>
                <p className="text-sm text-default-600">Interviews</p>
              </>
            )}
          </div>
          <div className="p-4 bg-warning-50 rounded-lg h-[100px] flex flex-col justify-center">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-8 rounded mx-auto" />
                <Skeleton className="h-4 w-10 rounded mx-auto" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-bold text-warning">
                  {applications.filter(app => app.status === 'Applied').length}
                </p>
                <p className="text-sm text-default-600">Pending</p>
              </>
            )}
          </div>
          <div className="p-4 bg-secondary-50 rounded-lg h-[100px] flex flex-col justify-center">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-8 rounded mx-auto" />
                <Skeleton className="h-4 w-14 rounded mx-auto" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-bold text-secondary">
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
