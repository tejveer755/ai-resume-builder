
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/auth-provider';
import { FirebaseResumeService } from '@/lib/firebase-resume';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2, TrendingUp, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { skillMatchScore } from '@/ai/flows/resume-skill-match-scoring';
import { Badge } from '@/components/ui/badge';

interface ResumeGenerationDialogProps {
  profile: UserProfile;
}

type Step = 'intent' | 'job-details' | 'analyzing' | 'results';

export function ResumeGenerationDialog({ profile }: ResumeGenerationDialogProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('intent');
  const [intent, setIntent] = useState<'specific' | 'general'>('general');
  const [isLoading, setIsLoading] = useState(false);

  // Job details form state
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobType, setJobType] = useState<'job' | 'internship'>('job');

  // AI Analysis results
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const handleIntentSelection = (value: 'specific' | 'general') => {
    setIntent(value);
    if (value === 'general') {
      // Skip job details and go directly to generation
      handleGenerateResume();
    } else {
      setStep('job-details');
    }
  };

  const handleAnalyzeMatch = async () => {
    if (!jobDescription.trim()) {
      return;
    }

    setIsLoading(true);
    setStep('analyzing');

    try {
      // Prepare profile data as string
      const profileData = `
Name: ${profile.basicInfo.name}
Title: ${profile.basicInfo.title}
Email: ${profile.basicInfo.email}
Location: ${profile.basicInfo.location}

Summary: ${profile.summary}

Skills: ${profile.skills.map(s => `${s.name} (${s.proficiency})`).join(', ')}

Experience:
${profile.experience.map(exp => `
  ${exp.position} at ${exp.company}
  ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
  ${exp.description}
`).join('\n')}

Education:
${profile.education.map(edu => `
  ${edu.degree} in ${edu.field} from ${edu.institution}
  ${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}
  Grade: ${edu.grade}
`).join('\n')}

Achievements:
${profile.achievements.map(ach => `- ${ach.title}: ${ach.description}`).join('\n')}

${profile.hackathons && profile.hackathons.length > 0 ? `
Hackathons & Projects:
${profile.hackathons.map(hack => `
  ${hack.projectName} - ${hack.eventName}
  Technologies: ${hack.technologies.join(', ')}
  ${hack.award ? `Award: ${hack.award}` : ''}
`).join('\n')}
` : ''}
      `.trim();

      const result = await skillMatchScore({
        profileData,
        jobDescription: `${jobTitle} at ${company}\n\n${jobDescription}`,
      });

      setMatchScore(result.matchScore);
      setRecommendations(result.recommendations);
      setStep('results');
    } catch (error) {
      console.error('Error analyzing match:', error);
      alert('Failed to analyze job match. Please try again.');
      setStep('job-details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateResume = async () => {
    if (!user) {
      alert('Please log in to generate a resume.');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare resume data for Firebase
      const resumeData = {
        profile,
        jobDetails: intent === 'specific' ? {
          title: jobTitle,
          company,
          description: jobDescription,
          type: jobType,
        } : null,
        matchScore,
        recommendations,
      };

      // Save to Firebase and get the document ID
      const resumeId = await FirebaseResumeService.saveResumeData(user.uid, resumeData);

      // Redirect to resume preview page with the resume ID
      setOpen(false);
      router.push(`/resume-preview?id=${resumeId}`);
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetDialog = () => {
    setStep('intent');
    setIntent('general');
    setJobTitle('');
    setCompany('');
    setJobDescription('');
    setJobType('job');
    setMatchScore(null);
    setRecommendations([]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-blue-600 dark:text-blue-400';
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Needs Improvement';
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetDialog();
    }}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Sparkles className="h-5 w-5" />
          Generate Resume with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Step 1: Intent Selection */}
        {step === 'intent' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Generate Your AI Resume</DialogTitle>
              <DialogDescription>
                Let's create a personalized resume tailored to your needs
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <Label className="text-base font-semibold">What type of resume do you need?</Label>
                <RadioGroup value={intent} onValueChange={(val) => setIntent(val as 'specific' | 'general')}>
                  <Card className="cursor-pointer hover:border-primary transition-colors"
                        onClick={() => handleIntentSelection('specific')}>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value="specific" id="specific" className="mt-1" />
                        <div className="flex-1">
                          <CardTitle className="text-lg">Specific Job/Internship</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            I'm applying for a specific position and want a tailored resume with AI-powered skill matching
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="cursor-pointer hover:border-primary transition-colors"
                        onClick={() => handleIntentSelection('general')}>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value="general" id="general" className="mt-1" />
                        <div className="flex-1">
                          <CardTitle className="text-lg">General Resume</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            I need a general resume to showcase my skills and experience
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </RadioGroup>
              </div>
            </div>
          </>
        )}

        {/* Step 2: Job Details */}
        {step === 'job-details' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Job Details</DialogTitle>
              <DialogDescription>
                Tell us about the position you're applying for
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="job-type">Position Type</Label>
                <RadioGroup value={jobType} onValueChange={(val) => setJobType(val as 'job' | 'internship')}>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="job" id="job" />
                      <Label htmlFor="job" className="cursor-pointer">Full-time Job</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="internship" id="internship" />
                      <Label htmlFor="internship" className="cursor-pointer">Internship</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title *</Label>
                <Input
                  id="job-title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Frontend Developer, Marketing Intern"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g., Google, Startup XYZ"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-description">Job Description *</Label>
                <Textarea
                  id="job-description"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here, including requirements, responsibilities, and qualifications..."
                  rows={8}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  The more details you provide, the better we can tailor your resume
                </p>
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setStep('intent')}>
                  Back
                </Button>
                <Button
                  onClick={handleAnalyzeMatch}
                  disabled={!jobTitle.trim() || !jobDescription.trim() || isLoading}
                >
                  Analyze Match
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Analyzing */}
        {step === 'analyzing' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Analyzing Your Profile</DialogTitle>
              <DialogDescription>
                Our AI is comparing your profile with the job requirements
              </DialogDescription>
            </DialogHeader>
            <div className="py-8 space-y-6">
              <div className="flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">This will take just a moment...</p>
              </div>
            </div>
          </>
        )}

        {/* Step 4: Results */}
        {step === 'results' && matchScore !== null && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Skill Match Analysis</DialogTitle>
              <DialogDescription>
                Here's how well your profile matches the job requirements
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Match Score */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Match Score</CardTitle>
                    <Badge variant="secondary" className="text-lg px-4 py-1">
                      {getScoreLabel(matchScore)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Progress value={matchScore} className="h-3" />
                    </div>
                    <span className={`text-3xl font-bold ${getScoreColor(matchScore)}`}>
                      {matchScore}%
                    </span>
                  </div>
                  {matchScore < 60 && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Your profile could benefit from some improvements. Check the recommendations below.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {recommendations.map((rec, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                            {idx + 1}
                          </span>
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setStep('job-details')}>
                  Edit Details
                </Button>
                <Button onClick={handleGenerateResume} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Resume
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
