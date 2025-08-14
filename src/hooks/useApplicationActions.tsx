import { useState } from 'react';
import { addToast } from '@heroui/react';
import { useAuth } from '@/contexts/AuthContext';
import { deleteApplication, updateApplicationStatus } from '@/lib/applications';

export function useApplicationActions(applicationId: string) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuth();

  const updateStatus = async (newStatus: string, onSuccess?: () => void) => {
    if (!user) return false;
    setIsUpdating(true);
    try {
      await updateApplicationStatus(applicationId, newStatus);
      onSuccess?.();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteApplication = async (onSuccess?: () => void) => {
    if (!user) return false;
    setIsDeleting(true);
    try {
      await deleteApplication(applicationId, user.uid);
      onSuccess?.();
      addToast({
        title: 'Operation Successful',
        description: 'Application has been deleted.',
        timeout: 2000,
      });
    } catch (error) {
      console.error('Error deleting application:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isUpdating,
    isDeleting,
    updateStatus,
    deleteApplication: handleDeleteApplication,
  };
}
