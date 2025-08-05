'use client';
import { useState } from 'react';
import { useApplications } from '@/hooks/useApplications';
import AddApplication from '@/components/AddApplication';
import { formatDate, getHostname } from '@/lib/utils';
import { Button, Card, CardHeader, CardBody, CardFooter } from '@heroui/react';

export default function Applications() {
  const { applications, loading, error, refetch } = useApplications();
  const [showAddApplication, setShowAddApplication] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center py-2">
        <h1 className="text-2xl font-bold">Your job applications</h1>
        <div className="flex items-center gap-4">
          <Button onPress={() => setShowAddApplication(true)}>+ Add Application</Button>
        </div>
      </div>
      <div>
        {applications.map(app => (
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
              <p>
                {app.notes}
              </p>
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
        isOpen={showAddApplication}
        onClose={() => setShowAddApplication(false)}
        onApplicationAdded={() => {
          refetch(); // Refresh applications list
        }}
      />
    </div>
  );
}
