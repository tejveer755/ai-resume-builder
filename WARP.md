# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

AI Career Compass is a Next.js-based AI-powered resume builder that helps users create professional resumes with personalized AI assistance. The application integrates Firebase for authentication and data storage, and uses Google's Genkit AI framework with the Gemini 2.5 Flash model for AI features.

## Development Commands

### Local Development
- `npm run dev` - Start the Next.js development server with Turbopack on port 9002
- `npm run genkit:dev` - Start Genkit development server for AI flows
- `npm run genkit:watch` - Start Genkit with file watching enabled

### Build & Quality Assurance
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality
- `npm run typecheck` - Run TypeScript type checking

## Architecture Overview

### Core Technology Stack
- **Frontend**: Next.js 15 with React 18, TypeScript, and Tailwind CSS
- **AI Framework**: Google Genkit with Gemini 2.5 Flash model
- **Backend**: Firebase (Authentication, Firestore)
- **UI Components**: Radix UI primitives with custom styling
- **PDF Generation**: html2canvas + jsPDF for resume exports

### Key Directories
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable React components and UI primitives
- `src/ai/` - Genkit AI flows and assistant logic
- `src/lib/` - Utility functions, types, and Firebase configuration

### AI Flow Architecture
The application uses Genkit flows for AI functionality:

1. **AI Career Assistant** (`src/ai/ai-career-assistant.ts`)
   - Conversational AI that guides users through resume building
   - Maintains conversation context and provides targeted suggestions

2. **Experience Rewriter** (`src/ai/flows/resume-rewrite-experience.ts`)
   - Rewrites job experience descriptions to be more professional and impactful
   - Focuses on highlighting achievements and quantifiable results

3. **Skill Match Scoring** (`src/ai/flows/resume-skill-match-scoring.ts`)
   - Compares user profiles with job descriptions
   - Returns match scores (0-100) and actionable improvement recommendations

4. **Resume Summarization** (`src/ai/flows/resume-summarization.ts`)
   - Generates professional resume summaries using AI

### Data Models
The application uses strongly-typed interfaces defined in `src/lib/types.ts`:
- `UserProfile` - Complete user profile including all resume sections
- `BasicInfo`, `Experience`, `Education`, `Skill`, `Achievement` - Individual section types
- All models support Firebase Firestore serialization

### Authentication & Data Flow
- Firebase Authentication with Google Sign-In
- User profiles stored in Firestore with real-time updates
- Inline editing with auto-save functionality
- PDF export generation using html2canvas and jsPDF

### Styling System
The app uses a dark theme with professional styling:
- **Colors**: Dark zinc (#333333), Black background, White accents
- **Gradients**: Red-yellow gradients for interactive elements
- **Typography**: Space Grotesk for headlines, Inter for body text
- **Components**: Custom Tailwind utilities with shadcn/ui base components

## Firebase Configuration

Environment variables required for Firebase integration:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## Development Notes

### Build Configuration
- TypeScript and ESLint errors are ignored during builds (configured in `next.config.ts`)
- Turbopack is enabled for faster development builds
- Remote image patterns are configured for placeholder services

### Testing AI Flows
Use the Genkit development server (`npm run genkit:dev`) to test and debug AI flows interactively. The flows are defined as server actions and can be invoked from the Genkit UI.

### Component Architecture
- Dashboard components handle the main user interface
- UI components follow the shadcn/ui pattern with Radix primitives
- Auth provider wraps the entire application for Firebase Auth context

### Path Aliases
The project uses `@/*` path alias mapping to `./src/*` for cleaner imports.