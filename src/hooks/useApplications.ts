'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchApplications } from '@/lib/applications';
import { Application } from '../../types';

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();

  const loadApplications = useCallback(async () => {
    if (authLoading) {
      return;
    }
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
      setError('Failed to load applications');
    } finally {
      setLoading(false);
    }
  }, [user, authLoading]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);
  return { applications, loading, error, refetch: loadApplications };
};
