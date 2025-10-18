// lib/types.ts
export interface BasicInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
}

export interface Socials {
  linkedin: string;
  github: string;
  portfolio: string;
  twitter?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  type?: 'fulltime' | 'internship';
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  grade: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language' | 'tool';
  proficiency: 'beginner' | 'intermediate' | 'expert';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'academic' | 'professional' | 'personal';
}

export interface Hackathon {
  id: string;
  projectName: string;
  eventName: string;
  date: string;
  role: string;
  description: string;
  technologies: string[];
  award: string;
  projectLink: string;
}

export interface UserProfile {
  basicInfo: BasicInfo;
  socials: Socials;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  achievements: Achievement[];
  hackathons?: Hackathon[];
}
