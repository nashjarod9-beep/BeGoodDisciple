export type UserRole = "DISCIPLE" | "MENTOR" | "ADMIN";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  mentorName?: string;
  streakDays: number;
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
  moodRating: number; // 1 to 5
}

export interface SpiritualReport {
  id: string;
  title: string;
  period: string; // e.g. "Semaine du 15 au 21 Juillet"
  discipleName: string;
  mentorName: string;
  status: "DRAFT" | "SENT" | "REVIEWED";
  scoreOverall: number;
  highlights: string[];
  sentAt?: string;
}
