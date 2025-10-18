'use client';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface SummaryFormProps {
  summary: string;
  onUpdate: (summary: string) => void;
}

export function SummaryForm({ summary, onUpdate }: SummaryFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">Professional Summary</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">About You</CardTitle>
          <CardDescription>
            Write a brief summary that highlights your professional background, key skills, and career objectives.
            Keep it concise (2-4 sentences) and impactful.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => onUpdate(e.target.value)}
              placeholder="e.g., Results-driven software engineer with 5+ years of experience building scalable web applications. Passionate about clean code, user experience, and continuous learning. Seeking opportunities to leverage my expertise in React and Node.js to drive innovation..."
              rows={6}
              className="resize-none"
            />
            <p className="text-sm text-muted-foreground">
              {summary.length} characters
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
