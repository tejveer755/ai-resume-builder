'use server';

/**
 * @fileOverview Compares a user profile with a job description to output a Skill Match Score and provide recommendations for improvement.
 *
 * - skillMatchScore - A function that calculates the skill match score and provides recommendations.
 * - SkillMatchScoreInput - The input type for the skillMatchScore function.
 * - SkillMatchScoreOutput - The return type for the skillMatchScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillMatchScoreInputSchema = z.object({
  profileData: z.string().describe('User profile data including skills, experience, and education.'),
  jobDescription: z.string().describe('The job description to compare the profile against.'),
});
export type SkillMatchScoreInput = z.infer<typeof SkillMatchScoreInputSchema>;

const SkillMatchScoreOutputSchema = z.object({
  matchScore: z.number().describe('A score representing how well the user profile matches the job description (0-100).'),
  recommendations: z.array(z.string()).describe('Specific recommendations for improving the profile to better match the job description.'),
});
export type SkillMatchScoreOutput = z.infer<typeof SkillMatchScoreOutputSchema>;

export async function skillMatchScore(input: SkillMatchScoreInput): Promise<SkillMatchScoreOutput> {
  return skillMatchScoreFlow(input);
}

const skillMatchPrompt = ai.definePrompt({
  name: 'skillMatchPrompt',
  input: {schema: SkillMatchScoreInputSchema},
  output: {schema: SkillMatchScoreOutputSchema},
  prompt: `You are an expert career advisor. Your role is to compare a candidate's profile with a job description and provide a skill match score and recommendations for improvement.

Candidate Profile:
{{profileData}}

Job Description:
{{jobDescription}}

Instructions:
1.  Analyze the candidate profile and the job description.
2.  Calculate a match score (0-100) representing how well the candidate's skills and experience align with the job requirements.
3.  Provide specific, actionable recommendations for the candidate to improve their profile and increase their chances of getting the job.
4.  The match score is relative to the job description provided. Treat the job description as a high-priority goal.

Output the matchScore (0-100) and recommendations as JSON in the following schema:
\{
  "matchScore": number,
  "recommendations": string[]
\}
`,
});

const skillMatchScoreFlow = ai.defineFlow(
  {
    name: 'skillMatchScoreFlow',
    inputSchema: SkillMatchScoreInputSchema,
    outputSchema: SkillMatchScoreOutputSchema,
  },
  async input => {
    const {output} = await skillMatchPrompt(input);
    return output!;
  }
);
