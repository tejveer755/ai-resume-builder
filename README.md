# AI Career Compass 🧭

An AI-powered resume builder that helps users create professional resumes with personalized AI assistance. Built with Next.js 15, Google Genkit AI, and Firebase.

![AI Career Compass](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-11-orange?style=flat-square&logo=firebase)
![Genkit](https://img.shields.io/badge/Genkit-1.20-yellow?style=flat-square)

## ✨ Features

- **🤖 AI Resume Assistant** - Conversational AI that guides you through building each section of your resume with smart suggestions
- **🎯 Skill Match Scoring** - Compare your profile with job descriptions and get instant match scores (0-100) with actionable recommendations
- **✍️ AI-Powered Rewriting** - Professionally rewrite experience descriptions to be more impactful and achievement-focused
- **📄 PDF Export** - Generate beautifully formatted PDF resumes with a single click
- **💾 Auto-Save** - Inline editing with real-time Firebase Firestore synchronization
- **🔐 Secure Authentication** - Firebase Authentication with Google Sign-In

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Firebase project with Firestore and Authentication enabled
- Google Cloud API key for Gemini 2.5 Flash

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tejveer755/ai-resume-builder.git
   cd ai-resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory with the following variables:

   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Google AI (Genkit)
   GOOGLE_GENAI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:9002`

5. **Start the Genkit development server** (optional, for AI flow testing)
   ```bash
   npm run genkit:dev
   ```

## 📦 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 3** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### AI & Backend
- **Google Genkit** - AI framework for building AI-powered features
- **Gemini 2.5 Flash** - Google's LLM for conversational AI
- **Firebase Authentication** - User authentication
- **Firebase Firestore** - Real-time NoSQL database

### PDF Generation
- **html2canvas** - HTML to canvas rendering
- **jsPDF** - Client-side PDF generation

## 📁 Project Structure

```
ai-resume-builder/
├── src/
│   ├── ai/                          # Genkit AI flows and logic
│   │   ├── flows/
│   │   │   ├── resume-rewrite-experience.ts
│   │   │   ├── resume-skill-match-scoring.ts
│   │   │   └── resume-summarization.ts
│   │   ├── ai-career-assistant.ts   # Main conversational AI
│   │   ├── genkit.ts                # Genkit configuration
│   │   └── dev.ts                   # Genkit dev server
│   │
│   ├── app/                         # Next.js App Router pages
│   │   ├── page.tsx                 # Landing page
│   │   ├── login/                   # Authentication page
│   │   ├── dashboard/               # Main dashboard
│   │   └── layout.tsx               # Root layout
│   │
│   ├── components/                  # React components
│   │   ├── ui/                      # Radix UI primitives
│   │   ├── dashboard/               # Dashboard-specific components
│   │   ├── header.tsx               # Site header
│   │   └── auth-provider.tsx        # Firebase Auth provider
│   │
│   ├── lib/                         # Utilities and configuration
│   │   ├── types.ts                 # TypeScript interfaces
│   │   ├── firebase.ts              # Firebase initialization
│   │   └── utils.ts                 # Helper functions
│   │
│   └── hooks/                       # Custom React hooks
│
├── public/                          # Static assets
├── tailwind.config.ts               # Tailwind configuration
├── next.config.ts                   # Next.js configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json
```

## 🤖 AI Flows

### 1. AI Career Assistant (`ai-career-assistant.ts`)
Conversational AI that provides context-aware guidance throughout the resume building process.

**Features:**
- Maintains conversation context
- Provides targeted suggestions for each resume section
- Helps users articulate their experience effectively

### 2. Experience Rewriter (`resume-rewrite-experience.ts`)
Transforms job experience descriptions to be more professional and impactful.

**Input:** Raw experience description
**Output:** Professionally rewritten description highlighting achievements and quantifiable results

### 3. Skill Match Scoring (`resume-skill-match-scoring.ts`)
Compares user profiles with job descriptions to provide match insights.

**Input:** User profile + Job description
**Output:**
- Match score (0-100)
- Detailed analysis
- Actionable recommendations for improvement

### 4. Resume Summarization (`resume-summarization.ts`)
Generates professional resume summaries based on user profiles.

**Input:** Complete user profile
**Output:** Compelling professional summary


### Components
Built with Radix UI primitives and custom Tailwind utilities following the shadcn/ui pattern.

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server (port 9002) |
| `npm run genkit:dev` | Start Genkit development UI for testing AI flows |
| `npm run genkit:watch` | Start Genkit with file watching enabled |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## 🧪 Testing AI Flows

1. Start the Genkit development server:
   ```bash
   npm run genkit:dev
   ```

2. Open the Genkit UI (usually at `http://localhost:4000`)

3. Test individual flows interactively with sample inputs

4. View flow execution traces and debug issues

## 📱 Key Features Walkthrough

### Resume Builder Dashboard
1. **Basic Information** - Name, title, contact details
2. **Social Links** - LinkedIn, GitHub, Portfolio, Twitter
3. **Professional Summary** - AI-generated or custom
4. **Work Experience** - Add multiple positions with AI rewriting
5. **Education** - Academic background with GPA/grades
6. **Skills** - Categorized by type and proficiency level
7. **Achievements** - Academic, professional, and personal accomplishments
8. **Hackathons** - Project showcases with technologies and awards

### AI Assistant Integration
- Click the AI assistant button in any section
- Get contextual help and suggestions
- Receive guidance on best practices
- Ask questions about resume writing

### Job Match Analysis
- Paste a job description
- Receive instant match score
- Get specific recommendations to improve fit
- Identify missing skills and experiences

### PDF Export
- Preview your resume in real-time
- Export to PDF with professional formatting
- Ready to send to recruiters and hiring managers

## 🔐 Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)

2. Enable **Google Authentication** in Firebase Console:
   - Go to Authentication → Sign-in method
   - Enable Google provider

3. Create a **Firestore Database**:
   - Go to Firestore Database
   - Create database in production mode
   - Set up security rules (see below)

4. Get your Firebase configuration:
   - Project Settings → General
   - Scroll to "Your apps" section
   - Copy the config values to `.env.local`


## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub

2. Import your repository in [Vercel](https://vercel.com)

3. Add environment variables in Vercel project settings

4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Self-hosted with Node.js

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Data Models

### UserProfile Interface
```typescript
interface UserProfile {
  basicInfo: BasicInfo;
  socials: Socials;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  achievements: Achievement[];
  hackathons?: Hackathon[];
}
```

See `src/lib/types.ts` for complete type definitions.

## ⚙️ Configuration

### Path Aliases
The project uses `@/*` alias mapping to `./src/*`:

```typescript
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/lib/types';
```

### Build Configuration
- TypeScript and ESLint errors are ignored during builds (see `next.config.ts`)
- Turbopack enabled for faster development builds
- Remote image patterns configured for placeholder services

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Genkit Documentation](https://firebase.google.com/docs/genkit)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- AI powered by [Google Genkit](https://firebase.google.com/products/genkit) and [Gemini](https://deepmind.google/technologies/gemini/)
- UI components from [Radix UI](https://www.radix-ui.com)
- Icons from [Lucide](https://lucide.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)

---

**Made with ❤️ for job seekers everywhere**
