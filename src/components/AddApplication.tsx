'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createApplication } from '@/lib/applications';
import { ApplicationForm } from '../../types';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Form,
} from '@heroui/react';
import { Timestamp } from 'firebase/firestore';
const statusOptions = [
  { key: 'Applied', label: 'Applied' },
  { key: 'Interview', label: 'Interview' },
  { key: 'Offer', label: 'Offer' },
  { key: 'Rejected', label: 'Rejected' },
];

interface AddApplicationProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onApplicationAdded: () => void;
  onClose: () => void;
}
export default function AddApplication({ isOpen, onOpenChange, onApplicationAdded, onClose }: AddApplicationProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const data = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement));
    setLoading(true);

    try {
      const applicationData: ApplicationForm = {
        userId: user.uid,
        company: data.company as string,
        position: data.position as string,
        location: data.location as string,
        status: data.status as 'Applied' | 'Interview' | 'Offer' | 'Rejected',
        dateApplied: Timestamp.now(),
        postingUrl: data.postingUrl as string,
        notes: data.notes as string,
      };
      await createApplication(applicationData);
      onApplicationAdded();
      onClose();
    } catch (error) {
      console.error('Error adding application:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="w-full bg-background">
        {onClose => (
          <>
            <DrawerHeader>Add Application</DrawerHeader>
            <DrawerBody className="space-y-4">
              <Form onSubmit={onSubmit} className="w-full">
                <Input isRequired label="Position" name="position" placeholder="Frontend Developer" type="text" />
                <Input isRequired label="Company" name="company" placeholder="Google, Microsoft" type="text" />
                <Input isRequired label="Location" name="location" placeholder="Remote, New York" type="text" />
                <Select label="Status" name="status" defaultSelectedKeys={['Applied']}>
                  {statusOptions.map(status => (
                    <SelectItem key={status.key}>{status.label}</SelectItem>
                  ))}
                </Select>
                <Input label="Job Posting URL" type="url" name="postingUrl" placeholder="https://..." />
                <Textarea label="Notes" name="notes" placeholder="Additional notes..." />
                <div className="flex ml-auto">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
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
