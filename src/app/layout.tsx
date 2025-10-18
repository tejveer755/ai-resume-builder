import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/providers/auth-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Career Compass',
  description: 'Your personal AI-powered career guide to build the perfect resume.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col')}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-4">
          <span>Built with ❤️ by</span>
          <Link
            href="https://github.com/tejveer755"
            target="_blank"
            className="text-primary font-medium hover:underline hover:text-primary/80 transition-colors duration-200 uppercase"
          >
            this guy
          </Link>
        </div>

      </body>
    </html>
  );
}
