import { FullObjectivesConfig, ObjectifAnnuelData } from "@/types";

const OBJECTIVES_STORAGE_KEY = "bgd_objectifs_annuels";

export const DEFAULT_OBJECTIVES_CONFIG: FullObjectivesConfig = {
  prierePersonnelle: { enabled: true, dailyMinutes: 45 },
  priereDeGroupe: {
    enabled: true,
    events: [
      { id: "ev-1", name: "Nuit de Prière", dayOfWeek: "Vendredi", time: "22h00" },
      { id: "ev-2", name: "Cellule de Maison", dayOfWeek: "Mercredi", time: "19h00" },
      { id: "ev-3", name: "Prière du Dimanche", dayOfWeek: "Dimanche", time: "08h30" },
    ],
  },
  lectureBiblique: { enabled: true, dailyChapters: 4, weeklyChapters: 28 },
  meditation: { enabled: true, dailyMinutes: 15 },
  evangelisation: { enabled: true, weeklyPeopleCount: 2, trackTracts: true },
  litteratureChretienne: { enabled: true, weeklyPagesCount: 30, trackCompletedBooks: true },
  retraitesSpirituelles: { enabled: true, frequencyPerYear: "Trimestrielle (4/an)", plannedCount: 4 },
  donsOffrandes: { enabled: true, trackTithe: true, trackGalates6: true },
  visitesPastorales: { enabled: true, monthlyVisitsCount: 3 },
  enseignements: { enabled: true, weeklyTeachingsCount: 2 },
  caractere: {
    enabled: true,
    axes: [
      { id: "ax-1", name: "Sommeil & Réveil matinal", targetGoal: "7h par nuit • Réveil 05h30" },
      { id: "ax-2", name: "Discipline & Concentration", targetGoal: "0 réseau social pendant la prière" },
    ],
  },
  custom: {
    enabled: true,
    items: [
      {
        id: "cust-1",
        title: "Études & Lecture académique",
        question: "As-tu étudié au moins 2 heures aujourd'hui ?",
        frequency: "daily",
        responseType: "boolean",
      },
    ],
  },
};

/**
 * Gets annual objectives from LocalStorage fallback or API
 */
export function getAnnualObjectivesHistory(): ObjectifAnnuelData[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(OBJECTIVES_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback
    }
  }
  
  // Initial default record
  const initialData: ObjectifAnnuelData = {
    id: "obj-2026-v1",
    userId: "user-demo-1",
    annee: 2026,
    version: 1,
    isCurrent: true,
    categories: Object.entries(DEFAULT_OBJECTIVES_CONFIG).map(([key, val]) => ({
      type: key.toUpperCase() as any,
      config: val,
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return [initialData];
}

/**
 * Gets the current active annual objectives config
 */
export function getCurrentObjectivesConfig(): FullObjectivesConfig {
  const history = getAnnualObjectivesHistory();
  const current = history.find((h) => h.isCurrent) || history[0];
  if (!current) return DEFAULT_OBJECTIVES_CONFIG;

  const configObj: Partial<FullObjectivesConfig> = {};
  current.categories.forEach((cat) => {
    const keyMap: Record<string, keyof FullObjectivesConfig> = {
      PRIERE_PERSONNELLE: "prierePersonnelle",
      PRIERE_DE_GROUPE: "priereDeGroupe",
      LECTURE_BIBLIQUE: "lectureBiblique",
      MEDITATION: "meditation",
      EVANGELISATION: "evangelisation",
      LITTERATURE_CHRETIENNE: "litteratureChretienne",
      RETRAITES_SPIRITUELLES: "retraitesSpirituelles",
      DONS_OFFRANDES: "donsOffrandes",
      VISITES_PASTORALES: "visitesPastorales",
      ENSEIGNEMENTS: "enseignements",
      CARACTERE: "caractere",
      CUSTOM: "custom",
    };
    const key = keyMap[cat.type] || (cat.type.toLowerCase() as keyof FullObjectivesConfig);
    if (key) {
      (configObj as any)[key] = cat.config;
    }
  });

  return { ...DEFAULT_OBJECTIVES_CONFIG, ...configObj };
}

/**
 * Save / Version Objectives Config
 */
export function saveAnnualObjectivesConfig(
  config: FullObjectivesConfig,
  annee: number = 2026
): { success: boolean; version: number } {
  const history = getAnnualObjectivesHistory();
  const previousCurrent = history.find((h) => h.annee === annee && h.isCurrent);
  const nextVersion = previousCurrent ? previousCurrent.version + 1 : 1;

  // Mark all previous for this year as not current
  const updatedHistory = history.map((h) =>
    h.annee === annee ? { ...h, isCurrent: false } : h
  );

  const newRecord: ObjectifAnnuelData = {
    id: `obj-${annee}-v${nextVersion}`,
    userId: "user-demo-1",
    annee,
    version: nextVersion,
    isCurrent: true,
    categories: [
      { type: "PRIERE_PERSONNELLE", config: config.prierePersonnelle },
      { type: "PRIERE_DE_GROUPE", config: config.priereDeGroupe },
      { type: "LECTURE_BIBLIQUE", config: config.lectureBiblique },
      { type: "MEDITATION", config: config.meditation },
      { type: "EVANGELISATION", config: config.evangelisation },
      { type: "LITTERATURE_CHRETIENNE", config: config.litteratureChretienne },
      { type: "RETRAITES_SPIRITUELLES", config: config.retraitesSpirituelles },
      { type: "DONS_OFFRANDES", config: config.donsOffrandes },
      { type: "VISITES_PASTORALES", config: config.visitesPastorales },
      { type: "ENSEIGNEMENTS", config: config.enseignements },
      { type: "CARACTERE", config: config.caractere },
      { type: "CUSTOM", config: config.custom },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  updatedHistory.unshift(newRecord);
  if (typeof window !== "undefined") {
    localStorage.setItem(OBJECTIVES_STORAGE_KEY, JSON.stringify(updatedHistory));
  }

  return { success: true, version: nextVersion };
}
