'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserProfile } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { ProfileForm } from './sections/profile-form';
import { ExperienceForm } from './sections/experience-form';
import { EducationForm } from './sections/education-form';
import { SkillsForm } from './sections/skills-form';
import { AchievementsForm } from './sections/achievements-form';
import { SummaryForm } from './sections/summary-form';
import { HackathonForm } from './sections/hackathon-form';
import { ResumeGenerationDialog } from './resume-generation-dialog';
import { debounce } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';

const defaultProfile: UserProfile = {
  basicInfo: { name: '', title: '', email: '', phone: '', location: '' },
  socials: { linkedin: '', github: '', portfolio: '' },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  achievements: [],
  hackathons: [],
};

export function DashboardClient() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const debouncedSave = useCallback(
    debounce(async (newProfile: UserProfile) => {
      if (!user) return;
      setIsSaving(true);
      const docRef = doc(db, 'users', user.uid);
      try {
        await setDoc(docRef, newProfile, { merge: true });
        toast({
          title: "Saved!",
          description: "Your profile has been updated.",
        });
      } catch (error) {
        console.error("Error saving profile:", error);
        toast({
          title: "Save Failed",
          description: "Could not save your changes. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSaving(false);
      }
    }, 1500),
    [user, toast]
  );

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      setLoading(true);
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        setProfile({
          ...defaultProfile,
          ...data,
          basicInfo: {
            ...defaultProfile.basicInfo,
            ...data.basicInfo,
            email: user.email ?? data.basicInfo.email,
            name: user.displayName ?? data.basicInfo.name,
          },
          socials: { ...defaultProfile.socials, ...data.socials },
          hackathons: data.hackathons || [],
        });
      } else {
        setProfile({
          ...defaultProfile,
          basicInfo: {
            ...defaultProfile.basicInfo,
            email: user.email ?? '',
            name: user.displayName ?? '',
          },
        });
      }
      setLoading(false);
    }
    fetchProfile();
  }, [user]);

  const handleProfileChange = (changedData: Partial<UserProfile>) => {
    setProfile(prevProfile => {
      if (!prevProfile) return null;
      const newProfile = { ...prevProfile, ...changedData };
      debouncedSave(newProfile);
      return newProfile;
    });
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return <div className="text-center text-muted-foreground">Could not load profile.</div>;
  }

  return (
    <div className="mt-6 space-y-8 max-w-4xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isSaving && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Saving...
            </div>
          )}
        </div>
        <ResumeGenerationDialog profile={profile} />
      </div>

      {/* Basic Info & Socials */}
      <ProfileForm
        basicInfo={profile.basicInfo}
        socials={profile.socials}
        //@ts-ignore
        onUpdate={(data) => handleProfileChange(data)}
      />

      <Separator />

      {/* Professional Summary */}
      <SummaryForm
        summary={profile.summary}
        onUpdate={(summary) => handleProfileChange({ summary })}
      />

      <Separator />

      {/* Experience */}
      <ExperienceForm
        experience={profile.experience}
        onUpdate={(data) => handleProfileChange({ experience: data })}
      />

      <Separator />

      {/* Education */}
      <EducationForm
        education={profile.education}
        onUpdate={(data) => handleProfileChange({ education: data })}
      />

      <Separator />

      {/* Skills */}
      <SkillsForm
        skills={profile.skills}
        onUpdate={(data) => handleProfileChange({ skills: data })}
      />

      <Separator />

      {/* Hackathons & Projects */}
      <HackathonForm
        hackathons={profile.hackathons || []}
        onUpdate={(data) => handleProfileChange({ hackathons: data })}
      />

      <Separator />

      {/* Achievements */}
      <AchievementsForm
        achievements={profile.achievements}
        onUpdate={(data) => handleProfileChange({ achievements: data })}
      />
    </div>
  );
}
