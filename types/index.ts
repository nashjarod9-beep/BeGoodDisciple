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
  name: string; // e.g. "Nuit de prière", "Cellule de maison", "Prière du dimanche"
  dayOfWeek: string; // e.g. "Vendredi", "Dimanche"
  time?: string; // e.g. "21h00"
}

export interface CharacterAxis {
  id: string;
  name: string; // e.g. "Sommeil", "Discipline & Concentration", "Maitrise de soi"
  targetGoal: string; // e.g. "7 heures par nuit", "0 distraction pendant les études"
}

export interface CustomGoalItem {
  id: string;
  title: string; // e.g. "Études", "Travail", "Sport"
  question: string; // e.g. "As-tu étudié 2h aujourd'hui ?"
  frequency: "daily" | "weekly";
  responseType: "boolean" | "number" | "text";
}

// JSON Payload Config for Each Category
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
