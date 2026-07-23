import { SuiviQuotidienData, DailyTrackingEntriesData } from "@/types";
import { getCurrentObjectivesConfig } from "./objectifs-service";
import { format } from "date-fns";

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
  
  // Translate English day name to French if needed for matching
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

  // 2. Prière de Groupe (matching events for today)
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

  // Fallback if 0 blocks active
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

  // Default record
  const defaultEntries: DailyTrackingEntriesData = {
    prierePersonnelle: { minutes: 0, burden: "" },
    lectureBiblique: { chaptersRead: 0 },
    meditation: { minutes: 0 },
    evangelisation: { peopleCount: 0, tractsDistributed: false, tractsCount: 0 },
    litteratureChretienne: { pagesRead: 0, currentBookTitle: getCurrentBookTitle() },
    caractere: {},
    custom: {},
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
 * Saves daily tracking record for a date
 */
export function saveSuiviForDate(dateStr: string, entries: DailyTrackingEntriesData): SuiviQuotidienData {
  const records = getAllSuiviRecords();
  const { completionScore, totalBlocks, completedBlocks } = calculateCompletion(entries, dateStr);

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

  return updatedRecord;
}
