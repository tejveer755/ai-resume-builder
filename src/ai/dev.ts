import { config } from 'dotenv';
config();

import '@/ai/flows/resume-summarization.ts';
import '@/ai/flows/resume-skill-match-scoring.ts';
import '@/ai/flows/resume-rewrite-experience.ts';