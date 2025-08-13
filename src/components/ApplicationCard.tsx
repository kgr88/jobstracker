import { Card, CardHeader, CardBody, CardFooter, Button } from '@heroui/react';
import { formatDate, getHostname } from '@/lib/utils';
import { Application } from '../../types';


export default function ApplicationCard(application: Application) {
  return (
    <Card className="my-2">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {application.position}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {application.company}
            </h5>
          </div>
        </div>
        <Button
          className="bg-transparent text-foreground border-default-200"
          color="primary"
          radius="full"
          size="sm"
          variant="bordered">
          {application.status}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>{application.notes}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <p className="font-semibold text-default-400 text-small">
          {formatDate(application.dateApplied)}
        </p>
        <a href={application.postingUrl} className="text-default-400 text-small underline">
          {getHostname(application.postingUrl)}
        </a>
      </CardFooter>
    </Card>
  );
}