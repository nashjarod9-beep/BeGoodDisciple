export type UserRole = "DISCIPLE" | "FAISEUR_DE_DISCIPLE" | "ADMIN";
export type StatutRelation = "ACTIF" | "INACTIF";
export type FrequenceCompteRendu = "HEBDOMADAIRE" | "MENSUEL";

export type CompteRenduType = "HEBDO" | "MENSUEL" | "TRIMESTRIEL" | "SEMESTRIEL" | "ANNUEL";
export type StatutEnvoi = "BROUILLON" | "ENVOYE" | "ERREUR" | "REVU";

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

// Period-Specific Questions Answers
export interface PeriodQuestionsPayload {
  // Weekly Questions
  gaveTithe: boolean; // Dîme / offrande
  gaveGalates6: boolean; // Don Galates 6
  visitedBrethren: boolean; // Visite pastorale
  visitedComment?: string;
  listenedTeachings: boolean;
  completedBook: boolean;
  completedBookTitle?: string;
  completedBookAuthor?: string;
  tookRetreat: boolean;
  retreatDetails?: { day: string; duration: string; mainBurdens: string };
  // Monthly / Period Questions
  wonSoulToChrist?: boolean; // Âme conduite à Christ & baptisée
  wonSoulComment?: string;
  // Missed donation recommendation
  donationRecommendationMessage?: string;
}

// Aggregated Data Metrics for a Period
export interface AggregatedMetricsPayload {
  totalPrayerMinutes: number;
  totalPrayerHoursFormatted: string;
  prayerBurdens: string[];
  groupPrayerAttendanceCount: number;
  totalChaptersRead: number;
  totalMeditationMinutes: number;
  totalPeopleEvangelized: number;
  distributedTracts: boolean;
  totalPagesRead: number;
  completedBooksList: Array<{ title: string; author?: string }>;
  pastoralVisitsCount: number;
  teachingsCount: number;
  overallScorePercentage: number;
  daysLoggedCount: number;
  totalDaysInPeriod: number;
}

export interface CompteRenduFullData {
  id: string;
  discipleId: string;
  discipleName: string;
  mentorEmail: string;
  type: CompteRenduType;
  titre: string;
  dateDebut: string;
  dateFin: string;
  contenuAgrege: AggregatedMetricsPayload;
  reponsesSpecifiques: PeriodQuestionsPayload;
  urlPdf?: string | null;
  dateEnvoi?: string | null;
  statutEnvoi: StatutEnvoi;
  createdAt: string;
  updatedAt?: string;
}

export interface DailyTrackingEntriesData {
  prierePersonnelle?: { minutes: number; burden?: string };
  priereDeGroupe?: Record<string, boolean>;
  lectureBiblique?: { chaptersRead: number };
  meditation?: { minutes: number };
  evangelisation?: { peopleCount: number; tractsDistributed?: boolean; tractsCount?: number };
  litteratureChretienne?: { pagesRead: number; currentBookTitle?: string; bookCompletedThisWeek?: boolean; completedBookTitle?: string; completedBookAuthor?: string };
  caractere?: Record<string, { value: string | number | boolean }>;
  custom?: Record<string, { value: string | number | boolean }>;
  retraitesSpirituelles?: { attended: boolean; notes?: string };
  donsOffrandes?: { tithePaid?: boolean; galates6Given?: boolean };
  visitesPastorales?: { visitsCount: number };
  enseignements?: { teachingsCount: number };
}

export interface SuiviQuotidienData {
  id: string;
  userId: string;
  date: string;
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
