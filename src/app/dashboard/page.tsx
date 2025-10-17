import { db, auth } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { DashboardClient } from '@/components/dashboard/dashboard-client';
import { UserProfile } from '@/lib/types';
import { redirect } from 'next/navigation';

async function getProfile(userId: string): Promise<UserProfile> {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  } else {
    // A default profile structure if one doesn't exist.
    return {
      basicInfo: { name: '', title: '', location: '', email: '', phone: '' },
      socials: { linkedin: '', github: '', portfolio: '' },
      summary: '',
      experience: [],
      education: [],
      skills: [],
      achievements: [],
    };
  }
}

export default async function DashboardPage() {
  // This is a server component, but Firebase Auth state is on the client.
  // The layout handles redirection, but we might not have the user object here.
  // A robust solution would use session cookies, but for this project, we assume the layout protects the route.
  // We'll proceed by trying to get user info if possible, but rely on client for full profile.
  
  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Resume Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your professional profile and generate your resume with AI.</p>
        <DashboardClient />
    </div>
  );
}
