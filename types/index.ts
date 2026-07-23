export type UserRole = "DISCIPLE" | "FAISEUR_DE_DISCIPLE" | "ADMIN";
export type StatutRelation = "ACTIF" | "INACTIF";
export type FrequenceCompteRendu = "HEBDOMADAIRE" | "MENSUEL";

export interface UserProfile {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  roles: UserRole[];
  avatarUrl?: string | null;
  timezone: string;
  defaultFrequency: FrequenceCompteRendu;
  onboardingCompleted: boolean;
  activeMentorEmail?: string | null;
  activeMentorName?: string | null;
}

export interface RelationDiscipolatData {
  id: string;
  discipleId: string;
  faiseurDeDiscipleEmail: string;
  faiseurDeDiscipleId?: string | null;
  statut: StatutRelation;
  dateDebut: string;
  dateFin?: string | null;
}

export interface SpiritualGoal {
  id: string;
  title: string;
  category: "Prière" | "Lecture Biblique" | "Méditation" | "Évangélisation" | "Jeûne";
  targetCount: number;
  currentCount: number;
  unit: string;
  completed: boolean;
}

export interface DailyTracking {
  id: string;
  date: string;
  prayerMinutes: number;
  bibleChaptersRead: number;
  journalNotes?: string;
  moodRating: number;
}

export interface SpiritualReport {
  id: string;
  title: string;
  period: string;
  discipleName: string;
  mentorEmail: string;
  status: "DRAFT" | "SENT" | "REVIEWED";
  scoreOverall: number;
  highlights: string[];
  sentAt?: string;
}
