'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Trophy,
  FileText,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Logo } from '@/components/icons/logo';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const navItems = [
  { href: '#profile', icon: User, label: 'Profile' },
  { href: '#experience', icon: Briefcase, label: 'Experience' },
  { href: '#education', icon: GraduationCap, label: 'Education' },
  { href: '#skills', icon: Wrench, label: 'Skills' },
  { href: '#achievements', icon: Trophy, label: 'Achievements' },
  { href: '#summary', icon: FileText, label: 'Summary' },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <aside className="hidden w-16 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Logo className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">AI Career Compass</span>
          </Link>
          {navItems.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                    // This is a simple way to highlight based on hash, would need client-side state for real active tracking
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </aside>
    </TooltipProvider>
  );
}
