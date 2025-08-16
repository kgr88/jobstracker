import { Button } from '@heroui/react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface ApplicationsHeaderProps {
  onOpenApplication: () => void;
  onOpenInterview: () => void;
  loading: boolean;
}

export default function ApplicationsHeader({ onOpenApplication, onOpenInterview, loading }: ApplicationsHeaderProps) {
  return (
    <div className="flex justify-between items-center py-2 mb-4 w-full">
      <div className="flex items-center gap-4 max-w-full">
        <Button onPress={onOpenInterview} isDisabled={loading} variant="bordered">
          <PlusIcon className="text-default-600 min-h-4 min-w-4 size-5" />
          Add Interview
        </Button>
        <Button onPress={onOpenApplication} isDisabled={loading} variant="bordered">
          <PlusIcon className="text-default-600 min-h-4 min-w-4 size-5" />
          Add Application
        </Button>
      </div>
    </div>
  );
}
