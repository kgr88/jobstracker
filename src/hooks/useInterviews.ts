'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchInterviews } from '@/lib/interviews'; 
import { Interview } from '../../types';

export function useInterviews() {
  const [interviews, setInterviews] = useState<Interview[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const interviewData = await fetchInterviews(user.uid);
      setInterviews(interviewData);
    } catch (error) {
      console.error('Error fetching interviews:', error);
      setError('Failed to load interviews');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { interviews, loading, error, refetch };
}