import { DashboardClient } from '@/components/dashboard/dashboard-client';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">Resume Dashboard</h1>
      <p className="text-muted-foreground mt-2">Manage your professional profile and generate your resume with AI.</p>
      <DashboardClient />
    </div>
  );
}
