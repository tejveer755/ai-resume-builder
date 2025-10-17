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
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface UserProfile {
  basicInfo: BasicInfo;
  socials: Socials;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  achievements: string[];
}
