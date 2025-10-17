'use server';

/**
 * @fileOverview This file defines a Genkit flow for rewriting resume experience descriptions to sound more professional and impactful.
 *
 * - rewriteExperienceDescription - A function that rewrites the job experience description.
 * - RewriteExperienceDescriptionInput - The input type for the rewriteExperienceDescription function.
 * - RewriteExperienceDescriptionOutput - The return type for the rewriteExperienceDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteExperienceDescriptionInputSchema = z.object({
  description: z
    .string()
    .describe('The original job experience description to be rewritten.'),
});
export type RewriteExperienceDescriptionInput = z.infer<
  typeof RewriteExperienceDescriptionInputSchema
>;

const RewriteExperienceDescriptionOutputSchema = z.object({
  rewrittenDescription: z
    .string()
    .describe('The rewritten job experience description.'),
});
export type RewriteExperienceDescriptionOutput = z.infer<
  typeof RewriteExperienceDescriptionOutputSchema
>;

export async function rewriteExperienceDescription(
  input: RewriteExperienceDescriptionInput
): Promise<RewriteExperienceDescriptionOutput> {
  return rewriteExperienceDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rewriteExperienceDescriptionPrompt',
  input: {schema: RewriteExperienceDescriptionInputSchema},
  output: {schema: RewriteExperienceDescriptionOutputSchema},
  prompt: `You are a professional resume writer. Rewrite the following job experience description to be more professional and impactful. Focus on highlighting achievements and quantifiable results.

Original Description: {{{description}}}`,
});

const rewriteExperienceDescriptionFlow = ai.defineFlow(
  {
    name: 'rewriteExperienceDescriptionFlow',
    inputSchema: RewriteExperienceDescriptionInputSchema,
    outputSchema: RewriteExperienceDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
