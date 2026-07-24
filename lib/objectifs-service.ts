import { FullObjectivesConfig, ObjectifAnnuelData } from "@/types";

const OBJECTIVES_STORAGE_KEY = "bgd_objectifs_annuels";

export const DEFAULT_OBJECTIVES_CONFIG: FullObjectivesConfig = {
  etreCaractere: {
    enabled: true,
    fruitEsprit: "Fidélité, discipline, douceur, maîtrise de soi (Galates 5:22)",
    vicesToAbandon: ["Bavardage (Proverbes 10:19)", "Procrastination (Ecclésiaste 3:1)", "Amour du sommeil (Proverbes 20:13)"],
    godKnowledgeGoal: "Connaître Dieu comme mon Père qui m'exauce toujours",
    personalMinistryWorship: "Développer une vie d'action de grâce et chanter longtemps dans la présence de Dieu (Éphésiens 5:20)",
    commonMinistryGifts: ["Aiguiser mon don d'évangéliste", "Manifestation des dons de guérison & miracles", "Parole de connaissance"],
  },
  prierePersonnelle: {
    enabled: true,
    dailyMinutes: 90,
    dailyHours: 1.5,
    customNotes: "1h30 par jour (45h/mois) + 2 nuits de prière par mois (1er et 3ème vendredi du mois)",
  },
  priereDeGroupe: {
    enabled: true,
    events: [
      { id: "ev-1", name: "Nuit de Prière", dayOfWeek: "Vendredi", time: "22h00" },
      { id: "ev-2", name: "Cellule de Maison", dayOfWeek: "Mercredi", time: "19h00" },
      { id: "ev-3", name: "Prière du Dimanche", dayOfWeek: "Dimanche", time: "08h30" },
    ],
  },
  lectureBiblique: { enabled: true, dailyChapters: 7, weeklyChapters: 49 },
  meditation: { enabled: true, dailyMinutes: 60, dailyHours: 1 },
  jeune: {
    enabled: true,
    full3DayFastsCount: 8,
    partial100DayFast: true,
    crusadeDaysCount: 7,
    customNotes: "8 jeûnes complets de 3 jours, 1 jeûne partiel de 100 jours, 7 jours durant la croisade",
  },
  memorisation: {
    enabled: true,
    versesPerWeek: 2,
    targetBook: "Épître de Paul aux Philippiens (104 versets)",
  },
  evangelisation: {
    enabled: true,
    weeklyPeopleCount: 5,
    trackTracts: true,
    plannedTractsCount: 500,
    soulsTargetCount: 5,
  },
  litteratureChretienne: {
    enabled: true,
    weeklyPagesCount: 40,
    trackCompletedBooks: true,
    booksCountTarget: 15,
  },
  retraitesSpirituelles: {
    enabled: true,
    frequencyPerYear: "1 par mois (12/an)",
    plannedCount: 12,
    periodUnit: "mois",
    retreatDurationHours: 24,
  },
  objectifsPhy: {
    enabled: true,
    targetSport: "Séance de sport et entretien physique",
    sessionsPerWeek: 1,
  },
  ministerePastoral: {
    enabled: true,
    leadersToTrain: 3,
    disciplesToTrain: 10,
    visitsTarget: 20,
  },
  donsOffrandes: {
    enabled: true,
    trackTithe: true,
    trackGalates6: true,
    tithePercentage: 10,
    offrandePercentage: 10,
    galates6Notes: "Don mensuel régulier aux pasteurs & enseignants qui m'édifient",
    familyGiftsNotes: "Soutien mensuel à la famille physique & cadeaux spirituels",
  },
  visitesPastorales: { enabled: true, monthlyVisitsCount: 4 },
  enseignements: { enabled: true, weeklyTeachingsCount: 3 },
  projets: {
    enabled: true,
    financialProject: "Ouvrir ma boutique de vente de produits digitaux en ligne",
    spiritualProject: "Lancer ma chaîne YouTube chrétienne sur l'entreprenariat",
    professionalProject: "Maîtriser les ventes sur les réseaux et le neuromarketing, passer le permis C",
    customProjects: ["Écrire l'Ebook 'Comment lancer son business'", "Organiser 3 conférences en ligne"],
  },
  caractere: {
    enabled: true,
    axes: [
      { id: "ax-1", name: "Fidélité & Ponctualité", targetGoal: "Être fidèle dans mes engagements" },
      { id: "ax-2", name: "Discipline de travail", targetGoal: "Éliminer la procrastination" },
    ],
  },
  custom: {
    enabled: true,
    items: [
      {
        id: "cust-1",
        title: "Études & Lecture de livres",
        question: "As-tu lu au moins 30 minutes aujourd'hui ?",
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
      ETRE_CARACTERE: "etreCaractere",
      PRIERE_PERSONNELLE: "prierePersonnelle",
      PRIERE_DE_GROUPE: "priereDeGroupe",
      LECTURE_BIBLIQUE: "lectureBiblique",
      MEDITATION: "meditation",
      JEUNE: "jeune",
      MEMORISATION: "memorisation",
      EVANGELISATION: "evangelisation",
      LITTERATURE_CHRETIENNE: "litteratureChretienne",
      RETRAITES_SPIRITUELLES: "retraitesSpirituelles",
      OBJECTIFS_PHY: "objectifsPhy",
      MINISTERE_PASTORAL: "ministerePastoral",
      DONS_OFFRANDES: "donsOffrandes",
      VISITES_PASTORALES: "visitesPastorales",
      ENSEIGNEMENTS: "enseignements",
      PROJETS: "projets",
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
      { type: "ETRE_CARACTERE" as any, config: config.etreCaractere },
      { type: "PRIERE_PERSONNELLE", config: config.prierePersonnelle },
      { type: "PRIERE_DE_GROUPE", config: config.priereDeGroupe },
      { type: "LECTURE_BIBLIQUE", config: config.lectureBiblique },
      { type: "MEDITATION", config: config.meditation },
      { type: "JEUNE" as any, config: config.jeune },
      { type: "MEMORISATION" as any, config: config.memorisation },
      { type: "EVANGELISATION", config: config.evangelisation },
      { type: "LITTERATURE_CHRETIENNE", config: config.litteratureChretienne },
      { type: "RETRAITES_SPIRITUELLES", config: config.retraitesSpirituelles },
      { type: "OBJECTIFS_PHY" as any, config: config.objectifsPhy },
      { type: "MINISTERE_PASTORAL" as any, config: config.ministerePastoral },
      { type: "DONS_OFFRANDES", config: config.donsOffrandes },
      { type: "VISITES_PASTORALES", config: config.visitesPastorales },
      { type: "ENSEIGNEMENTS", config: config.enseignements },
      { type: "PROJETS" as any, config: config.projets },
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
