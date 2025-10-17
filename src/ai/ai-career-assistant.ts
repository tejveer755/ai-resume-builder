// This file implements the AI assistant that guides the user through the resume building process.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * @fileOverview This file defines the Genkit flow for the AICareerAssistant. The flow guides the user through the resume building process by asking targeted questions and generating personalized suggestions.
 *
 * - aiCareerAssistant - A function that initiates the resume building process and interacts with the user to gather information.
 * - CareerAssistantInput - The input type for the aiCareerAssistant function.
 * - CareerAssistantOutput - The return type for the aiCareerAssistant function.
 */

const CareerAssistantInputSchema = z.object({
  query: z
    .string()
    .describe('The user query or response to the AI assistant.'),
  context: z.string().optional().describe('The context of the conversation'),
});
export type CareerAssistantInput = z.infer<typeof CareerAssistantInputSchema>;

const CareerAssistantOutputSchema = z.object({
  response: z.string().describe('The AI assistant response to the user.'),
  newContext: z.string().optional().describe('The updated context of the conversation'),
});
export type CareerAssistantOutput = z.infer<typeof CareerAssistantOutputSchema>;

export async function aiCareerAssistant(input: CareerAssistantInput): Promise<CareerAssistantOutput> {
  return aiCareerAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCareerAssistantPrompt',
  input: {schema: CareerAssistantInputSchema},
  output: {schema: CareerAssistantOutputSchema},
  prompt: `You are a career coach AI assistant that helps users build their resume.

  The current conversation context is: {{{context}}}

  Generate a response to the user query, taking into account the conversation context.

  User Query: {{{query}}}

  If the user is starting a new resume, start by asking them about their desired job title and industry.
  Then ask them for more information about their work history, education, skills, and achievements.  Suggest improvements to resume sections.
  If the user asks you to do something that does not relate to resume creation, politely decline.
  Remember to always be helpful and provide guidance.
  At the end of your response, summarize what the next steps are for the user in order to make progress towards creating their resume.
`,
});

const aiCareerAssistantFlow = ai.defineFlow(
  {
    name: 'aiCareerAssistantFlow',
    inputSchema: CareerAssistantInputSchema,
    outputSchema: CareerAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      response: output!.response,
      newContext: 'conversation history',
    };
  }
);
