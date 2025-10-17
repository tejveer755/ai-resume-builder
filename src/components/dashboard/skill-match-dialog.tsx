'use client';

import { useState, useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Target, Loader2, Lightbulb } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/lib/types';
import { skillMatchScore } from '@/ai/flows/resume-skill-match-scoring';
import { Progress } from '../ui/progress';

interface SkillMatchDialogProps {
  profile: UserProfile;
}

function formatProfileForAI(profile: UserProfile): string {
    return `
      **Professional Summary:**
      ${profile.summary}

      **Skills:**
      ${profile.skills.join(', ')}

      **Experience:**
      ${profile.experience.map(exp => `
        - **${exp.role}** at ${exp.company} (${exp.startDate} - ${exp.endDate})
          ${exp.description}
      `).join('')}

      **Education:**
      ${profile.education.map(edu => `
        - **${edu.degree}** from ${edu.institution} (${edu.startDate} - ${edu.endDate})
      `).join('')}
      
      **Achievements:**
      ${profile.achievements.join(', ')}
    `;
}

export function SkillMatchDialog({ profile }: SkillMatchDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<{ matchScore: number; recommendations: string[] } | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleScore = () => {
    if (!jobDescription) {
        toast({ title: "Job description is empty.", variant: "destructive" });
        return;
    }

    startTransition(async () => {
        try {
            const profileData = formatProfileForAI(profile);
            const scoreResult = await skillMatchScore({ profileData, jobDescription });
            setResult(scoreResult);
        } catch (error) {
            console.error("Skill match scoring failed:", error);
            toast({ title: "AI Analysis Failed", description: "Could not get skill match score. Please try again.", variant: "destructive"});
        }
    });
  }
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if(!open) {
        setResult(null);
        setJobDescription('');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Target className="mr-2 h-4 w-4" />
          Skill Matcher
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">AI Skill Matcher</DialogTitle>
          <DialogDescription>
            Paste a job description below to see how well your profile matches.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Paste the job description here..."
            className="min-h-[200px]"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            disabled={isPending}
          />
        </div>
        {result && (
            <div className="space-y-4">
                <h3 className="font-semibold">Analysis Result</h3>
                <div className="flex items-center gap-4">
                    <Progress value={result.matchScore} className="w-[60%]" />
                    <span className="font-bold text-lg text-primary">{result.matchScore}% Match</span>
                </div>
                <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary"/> Recommendations</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                        {result.recommendations.map((rec, i) => (
                            <li key={i}>{rec}</li>
                        ))}
                    </ul>
                </div>
            </div>
        )}
        <DialogFooter>
          <Button onClick={handleScore} disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Target className="mr-2 h-4 w-4" />}
            Get Score
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
