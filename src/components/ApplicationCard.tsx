import { Card, CardHeader, CardBody, CardFooter, Select, SelectItem } from '@heroui/react';
import { formatDate, getHostname } from '@/lib/utils';
import { Application } from '../../types';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useState } from 'react';

interface ApplicationCardProps {
  application: Application;
  onStatusUpdate?: () => void;
}

export default function ApplicationCard({ application, onStatusUpdate }: ApplicationCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = [
    { key: 'Applied', label: 'Applied', color: 'warning' },
    { key: 'Interview', label: 'Interview', color: 'primary' },
    { key: 'Offer', label: 'Offer', color: 'success' },
    { key: 'Rejected', label: 'Rejected', color: 'danger' },
  ];

  const updateApplicationStatus = async (keys: Set<React.Key> | 'all') => {
    const newStatus = keys === 'all' ? null : Array.from(keys)[0];

    if (!newStatus || newStatus === application.status || isUpdating) return;

    setIsUpdating(true);
    try {
      onStatusUpdate?.();
      const docRef = doc(db, 'applications', application.id);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating status:', error);
      onStatusUpdate?.();
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStatusChange = (keys: Set<React.Key> | 'all') => {
    updateApplicationStatus(keys);
  };

  return (
    <Card className="my-2 ">
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
            placeholder="Status">
            {statusOptions.map(status => (
              <SelectItem key={status.key}>{status.label}</SelectItem>
            ))}
          </Select>
        </div>
      </CardHeader>

      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>{application.notes}</p>
      </CardBody>

      <CardFooter className="gap-3">
        <p className="font-semibold text-default-400 text-small">{formatDate(application.dateApplied)}</p>
        <a href={application.postingUrl} className="text-default-400 text-small underline">
          {getHostname(application.postingUrl)}
        </a>
      </CardFooter>
    </Card>
  );
}
