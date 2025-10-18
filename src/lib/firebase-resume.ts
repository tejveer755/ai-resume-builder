import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { UserProfile } from '@/lib/types';

export interface ResumeData {
  id?: string;
  profile: UserProfile;
  jobDetails: {
    title: string;
    company: string;
    description: string;
    type: 'job' | 'internship';
  } | null;
  matchScore: number | null;
  recommendations: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class FirebaseResumeService {
  // Save resume data to Firebase
  static async saveResumeData(userId: string, resumeData: Omit<ResumeData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const resumesCollection = collection(db, 'users', userId, 'resumes');
      const timestamp = new Date();
      
      // Create a new document with auto-generated ID
      const docRef = doc(resumesCollection);
      
      const dataToSave: ResumeData = {
        ...resumeData,
        id: docRef.id,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      await setDoc(docRef, dataToSave);
      return docRef.id;
    } catch (error) {
      console.error('Error saving resume data:', error);
      throw new Error('Failed to save resume data');
    }
  }

  // Get a specific resume by ID
  static async getResumeData(userId: string, resumeId: string): Promise<ResumeData | null> {
    try {
      const docRef = doc(db, 'users', userId, 'resumes', resumeId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as ResumeData;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting resume data:', error);
      throw new Error('Failed to get resume data');
    }
  }

  // Get the most recent resume for a user
  static async getLatestResumeData(userId: string): Promise<ResumeData | null> {
    try {
      const resumesCollection = collection(db, 'users', userId, 'resumes');
      const q = query(resumesCollection, orderBy('updatedAt', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return {
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as ResumeData;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting latest resume data:', error);
      throw new Error('Failed to get latest resume data');
    }
  }

  // Get all resumes for a user
  static async getUserResumes(userId: string): Promise<ResumeData[]> {
    try {
      const resumesCollection = collection(db, 'users', userId, 'resumes');
      const q = query(resumesCollection, orderBy('updatedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as ResumeData;
      });
    } catch (error) {
      console.error('Error getting user resumes:', error);
      throw new Error('Failed to get user resumes');
    }
  }

  // Update existing resume data
  static async updateResumeData(userId: string, resumeId: string, updates: Partial<Omit<ResumeData, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> {
    try {
      const docRef = doc(db, 'users', userId, 'resumes', resumeId);
      
      const updateData = {
        ...updates,
        updatedAt: new Date(),
      };

      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating resume data:', error);
      throw new Error('Failed to update resume data');
    }
  }

  // Delete a resume
  static async deleteResume(userId: string, resumeId: string): Promise<void> {
    try {
      const docRef = doc(db, 'users', userId, 'resumes', resumeId);
      await setDoc(docRef, { deleted: true, deletedAt: new Date() }, { merge: true });
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw new Error('Failed to delete resume');
    }
  }
}