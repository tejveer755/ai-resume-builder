import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { UserButton } from '@/components/user-button';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">AI Career Compass</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Suspense fallback={<div className="h-8 w-8 rounded-full bg-muted" />}>
            <UserButton />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
