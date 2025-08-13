import { useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { addToast } from '@heroui/react';

export function useApplicationActions(applicationId: string) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const updateStatus = async (newStatus: string, onSuccess?: () => void) => {
    setIsUpdating(true);
    try {
      const docRef = doc(db, 'applications', applicationId);
      await updateDoc(docRef, { status: newStatus });
      onSuccess?.();
      return true;
    } catch (error) {
      console.error('Error updating status:', error);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteApplication = async (onSuccess?: () => void) => {
    setIsDeleting(true);
    try {
      const docRef = doc(db, 'applications', applicationId);
      await deleteDoc(docRef);
      onSuccess?.();
      addToast({
        title: 'Operation Successful',
        description: 'Application has been deleted.',
        timeout: 2000
      });
      return true;
    } catch (error) {
      console.error('Error deleting application:', error);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isUpdating,
    isDeleting,
    updateStatus,
    deleteApplication,
  };
}
