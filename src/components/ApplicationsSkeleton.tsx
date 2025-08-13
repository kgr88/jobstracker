import { Card, CardHeader, CardBody, CardFooter, Skeleton } from '@heroui/react';

interface ApplicationSkeletonsProps {
  count: number;
}

export default function ApplicationSkeletons({ count }: ApplicationSkeletonsProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
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
      ))}
    </>
  );
}