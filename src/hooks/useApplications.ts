'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchApplications } from '@/lib/applications';
import { Application } from '../../types';

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadApplications = async () => {
      if (!user) {
        setApplications([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const apps = await fetchApplications(user.uid);
        setApplications(apps);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [user]);
  return { applications, loading, error };
};
