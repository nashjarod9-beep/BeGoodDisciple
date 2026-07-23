export type UserRole = "DISCIPLE" | "FAISEUR_DE_DISCIPLE" | "ADMIN";
export type StatutRelation = "ACTIF" | "INACTIF";
export type FrequenceCompteRendu = "HEBDOMADAIRE" | "MENSUEL";

export type CategorieType =
  | "PRIERE_PERSONNELLE"
  | "PRIERE_DE_GROUPE"
  | "LECTURE_BIBLIQUE"
  | "MEDITATION"
  | "EVANGELISATION"
  | "LITTERATURE_CHRETIENNE"
  | "RETRAITES_SPIRITUELLES"
  | "DONS_OFFRANDES"
  | "VISITES_PASTORALES"
  | "ENSEIGNEMENTS"
  | "CARACTERE"
  | "CUSTOM";

export interface GroupPrayerEvent {
  id: string;
  name: string;
  dayOfWeek: string;
  time?: string;
}

export interface CharacterAxis {
  id: string;
  name: string;
  targetGoal: string;
}

export interface CustomGoalItem {
  id: string;
  title: string;
  question: string;
  frequency: "daily" | "weekly";
  responseType: "boolean" | "number" | "text";
}

export interface FullObjectivesConfig {
  prierePersonnelle: { enabled: boolean; dailyMinutes: number };
  priereDeGroupe: { enabled: boolean; events: GroupPrayerEvent[] };
  lectureBiblique: { enabled: boolean; dailyChapters: number; weeklyChapters: number };
  meditation: { enabled: boolean; dailyMinutes: number };
  evangelisation: { enabled: boolean; weeklyPeopleCount: number; trackTracts: boolean };
  litteratureChretienne: { enabled: boolean; weeklyPagesCount: number; trackCompletedBooks: boolean };
  retraitesSpirituelles: { enabled: boolean; frequencyPerYear: string; plannedCount: number };
  donsOffrandes: { enabled: boolean; trackTithe: boolean; trackGalates6: boolean };
  visitesPastorales: { enabled: boolean; monthlyVisitsCount: number };
  enseignements: { enabled: boolean; weeklyTeachingsCount: number };
  caractere: { enabled: boolean; axes: CharacterAxis[] };
  custom: { enabled: boolean; items: CustomGoalItem[] };
}

// Daily Entry JSON payloads for each category
export interface DailyTrackingEntriesData {
  prierePersonnelle?: { minutes: number; burden?: string };
  priereDeGroupe?: Record<string, boolean>; // eventId -> attended boolean
  lectureBiblique?: { chaptersRead: number };
  meditation?: { minutes: number };
  evangelisation?: { peopleCount: number; tractsDistributed?: boolean; tractsCount?: number };
  litteratureChretienne?: { pagesRead: number; currentBookTitle?: string; bookCompletedThisWeek?: boolean; completedBookTitle?: string; completedBookAuthor?: string };
  caractere?: Record<string, { value: string | number | boolean }>; // axisId -> value
  custom?: Record<string, { value: string | number | boolean }>; // customId -> value
  retraitesSpirituelles?: { attended: boolean; notes?: string };
  donsOffrandes?: { tithePaid?: boolean; galates6Given?: boolean };
  visitesPastorales?: { visitsCount: number };
  enseignements?: { teachingsCount: number };
}

export interface SuiviQuotidienData {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  completionScore: number;
  totalBlocks: number;
  isCompleted: boolean;
  entrees: DailyTrackingEntriesData;
  createdAt?: string;
  updatedAt?: string;
}

export interface ObjectifCategorieData {
  id?: string;
  type: CategorieType;
  config: any;
}

export interface ObjectifAnnuelData {
  id: string;
  userId: string;
  annee: number;
  version: number;
  isCurrent: boolean;
  categories: ObjectifCategorieData[];
  createdAt: string;
  updatedAt: string;
}

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
