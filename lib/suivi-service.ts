import { SuiviQuotidienData, DailyTrackingEntriesData } from "@/types";
import { getCurrentObjectivesConfig } from "./objectifs-service";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { saveReportRecord, aggregateDailyDataForPeriod, createDefaultPeriodQuestions } from "./reports-aggregation-service";
import { getCurrentUserSession } from "./auth-service";

const SUIVI_STORAGE_KEY = "bgd_suivi_quotidien_records";
const CURRENT_BOOK_KEY = "bgd_current_book_title";

/**
 * Gets today's formatted date string YYYY-MM-DD
 */
export function getTodayDateString(): string {
  return format(new Date(), "yyyy-MM-dd");
}

/**
 * Memorizes current Christian literature book title across daily entries
 */
export function getCurrentBookTitle(): string {
  if (typeof window === "undefined") return "L'Art de la Prière";
  return localStorage.getItem(CURRENT_BOOK_KEY) || "L'Art de la Prière";
}

export function saveCurrentBookTitle(title: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CURRENT_BOOK_KEY, title);
}

/**
 * Retrieves all stored daily tracking records
 */
export function getAllSuiviRecords(): Record<string, SuiviQuotidienData> {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem(SUIVI_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }
  return {};
}

/**
 * Calculates total active blocks and completion score for a given date
 */
export function calculateCompletion(
  entries: DailyTrackingEntriesData,
  dateStr: string
): { completionScore: number; totalBlocks: number; completedBlocks: number } {
  const config = getCurrentObjectivesConfig();
  const dayNameFormatted = format(new Date(dateStr), "EEEE"); // e.g. "Friday" or "Vendredi"
  
  const dayNameFrMap: Record<string, string> = {
    Monday: "Lundi",
    Tuesday: "Mardi",
    Wednesday: "Mercredi",
    Thursday: "Jeudi",
    Friday: "Vendredi",
    Saturday: "Samedi",
    Sunday: "Dimanche",
  };
  const dayFr = dayNameFrMap[dayNameFormatted] || dayNameFormatted;

  let totalBlocks = 0;
  let completedBlocks = 0;

  // 1. Prière Personnelle
  if (config.prierePersonnelle.enabled) {
    totalBlocks++;
    if (entries.prierePersonnelle && entries.prierePersonnelle.minutes > 0) {
      completedBlocks++;
    }
  }

  // 2. Prière de Groupe
  if (config.priereDeGroupe.enabled) {
    const matchingEvents = config.priereDeGroupe.events.filter(
      (ev) => ev.dayOfWeek.toLowerCase() === dayFr.toLowerCase()
    );
    matchingEvents.forEach((ev) => {
      totalBlocks++;
      if (entries.priereDeGroupe && entries.priereDeGroupe[ev.id] !== undefined) {
        completedBlocks++;
      }
    });
  }

  // 3. Lecture Biblique
  if (config.lectureBiblique.enabled) {
    totalBlocks++;
    if (entries.lectureBiblique && entries.lectureBiblique.chaptersRead > 0) {
      completedBlocks++;
    }
  }

  // 4. Méditation
  if (config.meditation.enabled) {
    totalBlocks++;
    if (entries.meditation && entries.meditation.minutes > 0) {
      completedBlocks++;
    }
  }

  // 5. Évangélisation
  if (config.evangelisation.enabled) {
    totalBlocks++;
    if (entries.evangelisation && (entries.evangelisation.peopleCount > 0 || entries.evangelisation.tractsDistributed)) {
      completedBlocks++;
    }
  }

  // 6. Littérature Chrétienne
  if (config.litteratureChretienne.enabled) {
    totalBlocks++;
    if (entries.litteratureChretienne && entries.litteratureChretienne.pagesRead > 0) {
      completedBlocks++;
    }
  }

  // 7. Caractère & Discipline
  if (config.caractere.enabled) {
    config.caractere.axes.forEach((ax) => {
      totalBlocks++;
      if (entries.caractere && entries.caractere[ax.id] && entries.caractere[ax.id].value !== undefined) {
        completedBlocks++;
      }
    });
  }

  // 8. Custom Goals
  if (config.custom.enabled) {
    config.custom.items.forEach((cust) => {
      totalBlocks++;
      if (entries.custom && entries.custom[cust.id] && entries.custom[cust.id].value !== undefined) {
        completedBlocks++;
      }
    });
  }

  if (totalBlocks === 0) totalBlocks = 1;
  const completionScore = Math.min(100, Math.round((completedBlocks / totalBlocks) * 100));

  return { completionScore, totalBlocks, completedBlocks };
}

/**
 * Gets or initializes daily tracking data for a specific date
 */
export function getSuiviForDate(dateStr: string): SuiviQuotidienData {
  const records = getAllSuiviRecords();
  if (records[dateStr]) {
    return records[dateStr];
  }

  const defaultEntries: DailyTrackingEntriesData = {
    prierePersonnelle: { minutes: 0, burden: "", burdensList: [] },
    lectureBiblique: { chaptersRead: 0 },
    meditation: { minutes: 0 },
    evangelisation: { peopleCount: 0, tractsDistributed: false, tractsCount: 0 },
    litteratureChretienne: { pagesRead: 0, currentBookTitle: getCurrentBookTitle() },
    caractere: {},
    custom: {},
    enseignements: { teachingsCount: 0, teachingsList: [] },
  };

  const { completionScore, totalBlocks } = calculateCompletion(defaultEntries, dateStr);

  return {
    id: `suivi-${dateStr}`,
    userId: "user-demo-1",
    date: dateStr,
    completionScore,
    totalBlocks,
    isCompleted: false,
    entrees: defaultEntries,
  };
}

/**
 * Saves daily tracking record for a date and automatically updates active period reports
 */
export function saveSuiviForDate(dateStr: string, entries: DailyTrackingEntriesData): SuiviQuotidienData {
  const records = getAllSuiviRecords();
  const { completionScore, totalBlocks } = calculateCompletion(entries, dateStr);

  const updatedRecord: SuiviQuotidienData = {
    id: records[dateStr]?.id || `suivi-${dateStr}`,
    userId: "user-demo-1",
    date: dateStr,
    completionScore,
    totalBlocks,
    isCompleted: completionScore === 100,
    entrees: entries,
    updatedAt: new Date().toISOString(),
  };

  records[dateStr] = updatedRecord;
  if (typeof window !== "undefined") {
    localStorage.setItem(SUIVI_STORAGE_KEY, JSON.stringify(records));
  }

  // AUTOMATICALLY RECALCULATE AND UPDATE CURRENT WEEK'S & MONTH'S REPORT
  try {
    const targetDate = new Date(dateStr);
    const weekStart = format(startOfWeek(targetDate, { weekStartsOn: 1 }), "yyyy-MM-dd");
    const weekEnd = format(endOfWeek(targetDate, { weekStartsOn: 1 }), "yyyy-MM-dd");

    const monthStart = format(startOfMonth(targetDate), "yyyy-MM-dd");
    const monthEnd = format(endOfMonth(targetDate), "yyyy-MM-dd");

    const session = getCurrentUserSession();
    const discipleName = `${session?.firstName || "Jean"} ${session?.lastName || "Disciple"}`;
    const mentorEmail = session?.activeMentorEmail || "pastor.paul@example.com";

    // 1. Update Weekly Report
    const weeklyAggregated = aggregateDailyDataForPeriod(weekStart, weekEnd);
    saveReportRecord({
      id: `rep-auto-hebdo-${weekStart}`,
      discipleId: "user-demo-1",
      discipleName,
      mentorEmail,
      type: "HEBDO",
      titre: `Compte rendu de la semaine du ${weekStart} au ${weekEnd}`,
      dateDebut: weekStart,
      dateFin: weekEnd,
      contenuAgrege: weeklyAggregated,
      reponsesSpecifiques: createDefaultPeriodQuestions("HEBDO"),
      urlPdf: "#",
      dateEnvoi: new Date().toISOString(),
      statutEnvoi: "BROUILLON",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // 2. Update Monthly Report
    const monthlyAggregated = aggregateDailyDataForPeriod(monthStart, monthEnd);
    saveReportRecord({
      id: `rep-auto-mensuel-${monthStart}`,
      discipleId: "user-demo-1",
      discipleName,
      mentorEmail,
      type: "MENSUEL",
      titre: `Compte rendu mensuel du mois (${monthStart})`,
      dateDebut: monthStart,
      dateFin: monthEnd,
      contenuAgrege: monthlyAggregated,
      reponsesSpecifiques: createDefaultPeriodQuestions("MENSUEL"),
      urlPdf: "#",
      dateEnvoi: new Date().toISOString(),
      statutEnvoi: "BROUILLON",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("[Suivi Service] Auto-syncing period reports warning:", err);
  }

  return updatedRecord;
}
