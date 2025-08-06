'use client';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
import { createInterview } from '@/lib/applications';
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
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <Form className="w-full max-w-xs" onSubmit={onSubmit}>
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1">Add Interview</ModalHeader>
                <ModalBody>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Select className="max-w-full" label="Select position" name="applicationId">
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
                  </div>
                  <I18nProvider locale="en-GB">
                    <DatePicker className="max-w-full" label="Select date" name="interviewDate" />
                  </I18nProvider>
                  <TimeInput hourCycle={24} className="max-w-full" label="Select Time" name="interviewTime" />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" isLoading={loading}>
                    Submit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Form>
      </Modal>
    </>
  );
}
