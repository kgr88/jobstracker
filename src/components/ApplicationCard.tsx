import { Card, CardHeader, CardBody, CardFooter, Select, SelectItem, Button } from '@heroui/react';
import { formatDate, getHostname } from '@/lib/utils';
import { Application } from '../../types';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useApplicationActions } from '@/hooks/useApplicationActions';
interface ApplicationCardProps {
  application: Application;
  onStatusUpdate?: () => void;
  onDelete?: () => void;
}

export default function ApplicationCard({ application, onStatusUpdate, onDelete }: ApplicationCardProps) {
  const { isUpdating, isDeleting, updateStatus, deleteApplication } = useApplicationActions(application.id);

  const statusOptions = [
    { key: 'Applied', label: 'Applied', color: 'warning' },
    { key: 'Interview', label: 'Interview', color: 'primary' },
    { key: 'Offer', label: 'Offer', color: 'success' },
    { key: 'Rejected', label: 'Rejected', color: 'danger' },
  ];

  const updateApplicationStatus = async (keys: Set<React.Key> | 'all') => {
    const newStatus = keys === 'all' ? null : Array.from(keys)[0];
    if (!newStatus || newStatus === application.status || isUpdating) return;
    await updateStatus(String(newStatus), onStatusUpdate);
  };

  const handleStatusChange = (keys: Set<React.Key> | 'all') => {
    updateApplicationStatus(keys);
  };

  const handleDelete = async () => {
    if (
      !confirm(`Are you sure you want to delete the application for ${application.position} at ${application.company}?`)
    ) {
      return;
    }
    await deleteApplication(onDelete);
  };

  return (
    <Card className="my-2 bg-background border-default-100 border-1">
      <CardHeader className="justify-between items-start">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{application.position}</h4>
            <h5 className="text-small tracking-tight text-default-400">{application.company}</h5>
          </div>
        </div>

        <div className="relative">
          <Select
            size="sm"
            selectedKeys={[application.status]}
            onSelectionChange={handleStatusChange}
            isDisabled={isUpdating}
            className="w-28 text-center"
            variant="bordered"
            radius="full"
            placeholder="Status"
            aria-label="Application status">
            {statusOptions.map(status => (
              <SelectItem key={status.key}>{status.label}</SelectItem>
            ))}
          </Select>
        </div>
      </CardHeader>

      <CardBody className="px-3 py-0 text-small text-default-400 overflow-y-auto max-h-32">
        <p>{application.notes}</p>
      </CardBody>

      <CardFooter className="gap-3 justify-between pb-1">
        <div className="flex gap-3">
          <p className="font-semibold text-default-400 text-small">{formatDate(application.dateApplied).date}</p>
          <a href={application.postingUrl} className="text-default-400 text-small underline">
            {getHostname(application.postingUrl)}
          </a>
        </div>
        <Button
          size="sm"
          variant="light"
          color="danger"
          isIconOnly
          onPress={handleDelete}
          isLoading={isDeleting}
          className="min-w-0">
          <TrashIcon className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
