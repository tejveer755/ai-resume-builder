import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, Target, FileText } from 'lucide-react';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative py-20 md:py-32">
          <div
            aria-hidden="true"
            className="absolute inset-0 top-0 h-full w-full bg-background bg-grid-white/[0.05]"
          />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 sm:text-6xl md:text-7xl">
              AI Career Compass
            </h1>
            <p className="mt-6 text-lg max-w-2xl mx-auto leading-8 text-muted-foreground">
              Build a winning resume with the power of AI. Get personalized suggestions, skill matching, and professional rewriting to land your dream job.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="btn-gradient hover:shadow-lg hover:shadow-yellow-400/20 transition-shadow">
                <Link href="/login">
                  Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="#features">Learn More <span aria-hidden="true">→</span></Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 sm:py-32 bg-card/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary">Your Career, Supercharged</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Everything you need to build a standout resume
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Our AI-powered tools analyze your profile and job descriptions to give you a competitive edge in your job search.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <Bot className="h-6 w-6 text-primary-foreground" />
                    </div>
                    AI Resume Assistant
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-muted-foreground">
                    Our conversational AI guides you through building each part of your resume, offering smart suggestions along the way.
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <Target className="h-6 w-6 text-primary-foreground" />
                    </div>
                    Skill Match Scoring
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-muted-foreground">
                    Paste a job description and get an instant score on how well your profile matches, plus get recommendations for improvement.
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <FileText className="h-6 w-6 text-primary-foreground" />
                    </div>
                    Instant PDF Exports
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-muted-foreground">
                    Generate a professionally formatted, beautiful PDF of your resume with a single click, ready to be sent to recruiters.
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary-foreground"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                    </div>
                    AI-Powered Rewriting
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-muted-foreground">
                    Struggling with wording? Let our AI rewrite your experience descriptions to be more impactful and professional.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-card/30">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AI Career Compass. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
