'use client';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Select,
  SelectItem,
  DatePicker,
  TimeInput,
  Form,
} from '@heroui/react';
import { Application } from '../../types';
import { I18nProvider } from '@react-aria/i18n';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { createInterview } from '@/lib/interviews';
import { InterviewForm } from '../../types';
import { Timestamp } from 'firebase/firestore';
interface AddInterviewProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onInterviewAdded: () => void;
  onClose: () => void;
  applications: Application[];
}

export default function AddInterview({
  isOpen,
  onOpenChange,
  onInterviewAdded,
  onClose,
  applications,
}: AddInterviewProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const data = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement));

    setLoading(true);
    try {
      const dateString = data.interviewDate as string;
      const timeString = data.interviewTime as string;

      const combinedDateTime = `${dateString}T${timeString}`;
      const jsDate = new Date(combinedDateTime);
      const interviewData: InterviewForm = {
        userId: user.uid,
        applicationId: data.applicationId as string,
        interviewDate: Timestamp.fromDate(jsDate),
      };
      await createInterview(interviewData);
      onInterviewAdded();
      onClose();
    } catch (error) {
      console.error('Error adding application:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} >
        <DrawerContent>
          {onClose => (
            <>
              <DrawerHeader className="flex flex-col gap-1">Add Interview</DrawerHeader>
              <DrawerBody>
                <Form className="" onSubmit={onSubmit}>
                  <Select className="w-full" label="Select position" name="applicationId" isRequired>
                    {applications.map(app => (
                      <SelectItem key={app.id} textValue={app.position}>
                        <div className="flex gap-2 items-center">
                          <div className="flex flex-col">
                            <span className="text-small">{app.position}</span>
                            <span className="text-tiny text-default-400">{app.company}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </Select>
                  <I18nProvider locale="en-GB">
                    <DatePicker className="w-full" label="Select date" name="interviewDate" isRequired/>
                  </I18nProvider>
                  <TimeInput hourCycle={24} className="w-full" label="Select Time" name="interviewTime" isRequired />
                  <div className="ml-auto py-2">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit" isLoading={loading}>
                      Submit
                    </Button>
                  </div>
                </Form>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
  );
}
