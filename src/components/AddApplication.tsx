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
  DrawerFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from '@heroui/react';

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

  const [formData, setFormData] = useState<ApplicationForm>({
    company: '',
    position: '',
    location: '',
    status: 'Applied',
    postingUrl: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await createApplication(user.uid, formData);

      setFormData({
        company: '',
        position: '',
        location: '',
        status: 'Applied',
        postingUrl: '',
        notes: '',
      });

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
      <DrawerContent>
        {onClose => (
          <form onSubmit={handleSubmit}>
            <DrawerHeader>Add Application</DrawerHeader>
            <DrawerBody className="space-y-4">
              <Input
                isRequired
                label="Position"
                value={formData.position}
                onValueChange={value => setFormData({ ...formData, position: value })}
                placeholder="Frontend Developer"
              />
              <Input
                isRequired
                label="Company"
                value={formData.company}
                onValueChange={value => setFormData({ ...formData, company: value })}
                placeholder="Google, Microsoft"
              />
              <Input
                isRequired
                label="Location"
                value={formData.location}
                onValueChange={value => setFormData({ ...formData, location: value })}
                placeholder="Remote, New York"
              />
              <Select
                label="Status"
                selectedKeys={[formData.status]}
                onSelectionChange={keys => {
                  const status = Array.from(keys)[0] as ApplicationForm['status'];
                  setFormData({ ...formData, status });
                }}>
                {statusOptions.map(status => (
                  <SelectItem key={status.key}>{status.label}</SelectItem>
                ))}
              </Select>
              <Input
                label="Job Posting URL"
                type="url"
                value={formData.postingUrl}
                onValueChange={value => setFormData({ ...formData, postingUrl: value })}
                placeholder="https://..."
              />
              <Textarea
                label="Notes"
                value={formData.notes}
                onValueChange={value => setFormData({ ...formData, notes: value })}
                placeholder="Additional notes..."
              />
            </DrawerBody>
            <DrawerFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit" isLoading={loading}>
                Add Application
              </Button>
            </DrawerFooter>
          </form>
        )}
      </DrawerContent>
    </Drawer>
  );
}
