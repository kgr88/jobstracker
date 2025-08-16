import { Application } from '../../../../types';
import { Card, CardHeader, CardBody, Button } from '@heroui/react';
import ApplicationCard from '@/components/ApplicationCard';
import ApplicationSkeletons from '@/components/ApplicationsSkeleton';
import { PlusIcon } from '@heroicons/react/24/outline';

interface RecentApplicationsProps {
  applications: Application[];
  loading: boolean;
  onOpenApplication: () => void;
  onApplicationUpdate?: () => void;
}

export default function RecentApplications({ 
  applications, 
  loading, 
  onOpenApplication,
  onApplicationUpdate 
}: RecentApplicationsProps) {
  const recentApplications = applications.slice(0, 4);

  const handleStatusUpdate = () => {
    onApplicationUpdate?.();
  };

  const handleDelete = () => {
    onApplicationUpdate?.();
  };

  return (
    <Card className="md:row-span-2 h-full flex flex-col md:order-0 bg-background border-default-100 border-1">
      <CardHeader className="pb-2">
        <h2 className="text-xl font-bold">Recent Applications</h2>
        <Button onPress={onOpenApplication} isDisabled={loading} variant="bordered" className='ml-auto'>
          <PlusIcon className="text-default-600 size-5 min-h-4 min-w-4" />
          Add Application
        </Button>
      </CardHeader>
      
      <CardBody className="overflow-y-auto flex-1 px-0">
        {loading ? (
          <div className="px-4 space-y-0">
            <ApplicationSkeletons count={4} />
          </div>
        ) : applications.length > 0 ? (
          <div className="px-4 space-y-0">
            {recentApplications.map(app => (
              <ApplicationCard 
                key={app.id} 
                application={app}
                onStatusUpdate={handleStatusUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full px-4">
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
