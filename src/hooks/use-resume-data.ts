import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { FirebaseResumeService, ResumeData } from '@/lib/firebase-resume';

interface UseResumeDataOptions {
  resumeId?: string | null;
  loadLatest?: boolean;
}

interface UseResumeDataReturn {
  resumeData: ResumeData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  saveResume: (data: Omit<ResumeData, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateResume: (resumeId: string, updates: Partial<Omit<ResumeData, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
}

export function useResumeData({ resumeId, loadLatest = false }: UseResumeDataOptions = {}): UseResumeDataReturn {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadResume = async () => {
    if (!user) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      setError(null);
      setLoading(true);

      let data: ResumeData | null = null;

      if (resumeId) {
        data = await FirebaseResumeService.getResumeData(user.uid, resumeId);
      } else if (loadLatest) {
        data = await FirebaseResumeService.getLatestResumeData(user.uid);
      }

      setResumeData(data);
      
      if (!data) {
        setError('Resume not found');
      }
    } catch (err) {
      console.error('Error loading resume:', err);
      setError('Failed to load resume data');
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await loadResume();
  };

  const saveResume = async (data: Omit<ResumeData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const newResumeId = await FirebaseResumeService.saveResumeData(user.uid, data);
      await refetch(); // Reload the data
      return newResumeId;
    } catch (err) {
      console.error('Error saving resume:', err);
      throw new Error('Failed to save resume');
    }
  };

  const updateResume = async (resumeId: string, updates: Partial<Omit<ResumeData, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      await FirebaseResumeService.updateResumeData(user.uid, resumeId, updates);
      await refetch(); // Reload the data
    } catch (err) {
      console.error('Error updating resume:', err);
      throw new Error('Failed to update resume');
    }
  };

  useEffect(() => {
    if (user && (resumeId || loadLatest)) {
      loadResume();
    } else {
      setLoading(false);
    }
  }, [user, resumeId, loadLatest]);

  return {
    resumeData,
    loading,
    error,
    refetch,
    saveResume,
    updateResume,
  };
}