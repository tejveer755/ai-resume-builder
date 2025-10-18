'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, FileText, Calendar, Eye, Trash2 } from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';
import { FirebaseResumeService, ResumeData } from '@/lib/firebase-resume';
import { format } from 'date-fns';

interface RecentResumesProps {
  limit?: number;
}

export function RecentResumes({ limit = 5 }: RecentResumesProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResumes = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userResumes = await FirebaseResumeService.getUserResumes(user.uid);
        setResumes(userResumes.slice(0, limit));
      } catch (err) {
        console.error('Error loading resumes:', err);
        setError('Failed to load resumes');
      } finally {
        setLoading(false);
      }
    };

    loadResumes();
  }, [user, limit]);

  const handleViewResume = (resumeId: string) => {
    router.push(`/resume-preview?id=${resumeId}`);
  };

  const handleDeleteResume = async (resumeId: string) => {
    if (!user) return;
    
    const confirm = window.confirm('Are you sure you want to delete this resume?');
    if (!confirm) return;

    try {
      await FirebaseResumeService.deleteResume(user.uid, resumeId);
      setResumes(resumes.filter(resume => resume.id !== resumeId));
    } catch (err) {
      console.error('Error deleting resume:', err);
      alert('Failed to delete resume. Please try again.');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Resumes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Resumes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center p-4">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (resumes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Resumes
          </CardTitle>
          <CardDescription>
            Your generated resumes will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center p-4">
            No resumes generated yet. Create your first resume!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Recent Resumes
        </CardTitle>
        <CardDescription>
          View and manage your generated resumes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium truncate">
                    {resume.jobDetails 
                      ? `${resume.jobDetails.title} - ${resume.jobDetails.company}`
                      : `General Resume - ${resume.profile.basicInfo.name}`
                    }
                  </h4>
                  {resume.jobDetails && (
                    <Badge variant="secondary" className="text-xs">
                      {resume.jobDetails.type}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{format(resume.updatedAt, 'MMM dd, yyyy')}</span>
                  {resume.matchScore && (
                    <>
                      <span>•</span>
                      <span>Match: {resume.matchScore}%</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleViewResume(resume.id!)}
                  className="h-8 w-8 p-0"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteResume(resume.id!)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}