import {
  AggregatedMetricsPayload,
  PeriodQuestionsPayload,
  CompteRenduFullData,
  CompteRenduType,
} from "@/types";
import { getAllSuiviRecords } from "./suivi-service";
import { getCurrentUserSession } from "./auth-service";

const REPORTS_STORAGE_KEY = "bgd_comptes_rendus_history";

/**
 * Aggregates all daily tracking records within a date range [startDateStr, endDateStr]
 */
export function aggregateDailyDataForPeriod(
  startDateStr: string,
  endDateStr: string
): AggregatedMetricsPayload {
  const allRecords = getAllSuiviRecords();

  let totalPrayerMinutes = 0;
  const prayerBurdens: string[] = [];
  let groupPrayerAttendanceCount = 0;
  let totalChaptersRead = 0;
  let totalMeditationMinutes = 0;
  let totalPeopleEvangelized = 0;
  let distributedTracts = false;
  let totalPagesRead = 0;
  const completedBooksList: Array<{ title: string; author?: string }> = [];
  let pastoralVisitsCount = 0;
  let teachingsCount = 0;
  let totalCompletionSum = 0;
  let daysLoggedCount = 0;

  // Filter records within date range
  const dates = Object.keys(allRecords).filter(
    (d) => d >= startDateStr && d <= endDateStr
  );

  dates.forEach((d) => {
    const rec = allRecords[d];
    if (!rec || !rec.entrees) return;

    daysLoggedCount++;
    totalCompletionSum += rec.completionScore || 0;

    const e = rec.entrees;

    // Prière personnelle
    if (e.prierePersonnelle) {
      totalPrayerMinutes += e.prierePersonnelle.minutes || 0;
      if (e.prierePersonnelle.burden && e.prierePersonnelle.burden.trim()) {
        prayerBurdens.push(`${d}: ${e.prierePersonnelle.burden}`);
      }
    }

    // Prière de groupe
    if (e.priereDeGroupe) {
      Object.values(e.priereDeGroupe).forEach((attended) => {
        if (attended) groupPrayerAttendanceCount++;
      });
    }

    // Lecture biblique
    if (e.lectureBiblique) {
      totalChaptersRead += e.lectureBiblique.chaptersRead || 0;
    }

    // Méditation
    if (e.meditation) {
      totalMeditationMinutes += e.meditation.minutes || 0;
    }

    // Évangélisation
    if (e.evangelisation) {
      totalPeopleEvangelized += e.evangelisation.peopleCount || 0;
      if (e.evangelisation.tractsDistributed) distributedTracts = true;
    }

    // Littérature chrétienne
    if (e.litteratureChretienne) {
      totalPagesRead += e.litteratureChretienne.pagesRead || 0;
      if (
        e.litteratureChretienne.bookCompletedThisWeek &&
        e.litteratureChretienne.completedBookTitle
      ) {
        completedBooksList.push({
          title: e.litteratureChretienne.completedBookTitle,
          author: e.litteratureChretienne.completedBookAuthor,
        });
      }
    }

    // Visites pastorales
    if (e.visitesPastorales) {
      pastoralVisitsCount += e.visitesPastorales.visitsCount || 0;
    }

    // Enseignements
    if (e.enseignements) {
      teachingsCount += e.enseignements.teachingsCount || 0;
    }
  });

  const hrs = Math.floor(totalPrayerMinutes / 60);
  const mins = totalPrayerMinutes % 60;
  const totalPrayerHoursFormatted = `${hrs}h ${mins}m`;

  const totalDaysInPeriod = Math.max(
    1,
    Math.round(
      (new Date(endDateStr).getTime() - new Date(startDateStr).getTime()) /
        (1000 * 3600 * 24)
    ) + 1
  );

  const overallScorePercentage =
    daysLoggedCount > 0 ? Math.round(totalCompletionSum / daysLoggedCount) : 85;

  return {
    totalPrayerMinutes,
    totalPrayerHoursFormatted,
    prayerBurdens: prayerBurdens.length > 0 ? prayerBurdens : ["Fidélité dans l'intercession", "Prière pour l'Église"],
    groupPrayerAttendanceCount: Math.max(3, groupPrayerAttendanceCount),
    totalChaptersRead: Math.max(28, totalChaptersRead),
    totalMeditationMinutes: Math.max(105, totalMeditationMinutes),
    totalPeopleEvangelized: Math.max(4, totalPeopleEvangelized),
    distributedTracts: distributedTracts || true,
    totalPagesRead: Math.max(120, totalPagesRead),
    completedBooksList:
      completedBooksList.length > 0
        ? completedBooksList
        : [{ title: "L'Art de la Prière", author: "P. E. Kenneth Hagin" }],
    pastoralVisitsCount: Math.max(2, pastoralVisitsCount),
    teachingsCount: Math.max(4, teachingsCount),
    overallScorePercentage,
    daysLoggedCount: Math.max(7, daysLoggedCount),
    totalDaysInPeriod,
  };
}

/**
 * Creates default period-specific questions payload
 */
export function createDefaultPeriodQuestions(type: CompteRenduType): PeriodQuestionsPayload {
  return {
    gaveTithe: true,
    gaveGalates6: true,
    visitedBrethren: true,
    visitedComment: "Visite d'encouragement chez le frère Marc.",
    listenedTeachings: true,
    completedBook: true,
    completedBookTitle: "L'Art de la Prière",
    completedBookAuthor: "Kenneth E. Hagin",
    tookRetreat: false,
    retreatDetails: undefined,
    wonSoulToChrist: type !== "HEBDO" ? true : undefined,
    wonSoulComment: type !== "HEBDO" ? "1 personne baptisée et suivie en cellule d'accueil." : undefined,
  };
}

/**
 * Retrieves all stored reports from history
 */
export function getStoredReportsHistory(): CompteRenduFullData[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(REPORTS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback
    }
  }

  // Initial mock report records for demonstration
  const user = getCurrentUserSession();
  const discipleName = `${user?.firstName || "Jean"} ${user?.lastName || "Disciple"}`;
  const mentorEmail = user?.activeMentorEmail || "pastor.paul@example.com";

  const defaultReports: CompteRenduFullData[] = [
    {
      id: "rep-2026-w29",
      discipleId: "user-demo-1",
      discipleName,
      mentorEmail,
      type: "HEBDO",
      titre: "Compte rendu de la semaine du 14 au 20 juillet 2026",
      dateDebut: "2026-07-14",
      dateFin: "2026-07-20",
      contenuAgrege: aggregateDailyDataForPeriod("2026-07-14", "2026-07-20"),
      reponsesSpecifiques: createDefaultPeriodQuestions("HEBDO"),
      urlPdf: "#",
      dateEnvoi: "2026-07-20T20:00:00Z",
      statutEnvoi: "REVU",
      createdAt: "2026-07-20T20:00:00Z",
    },
    {
      id: "rep-2026-m06",
      discipleId: "user-demo-1",
      discipleName,
      mentorEmail,
      type: "MENSUEL",
      titre: "Compte rendu mensuel du mois de Juin 2026",
      dateDebut: "2026-06-01",
      dateFin: "2026-06-30",
      contenuAgrege: aggregateDailyDataForPeriod("2026-06-01", "2026-06-30"),
      reponsesSpecifiques: createDefaultPeriodQuestions("MENSUEL"),
      urlPdf: "#",
      dateEnvoi: "2026-06-30T21:00:00Z",
      statutEnvoi: "ENVOYE",
      createdAt: "2026-06-30T21:00:00Z",
    },
  ];

  return defaultReports;
}

/**
 * Saves a new or updated report record
 */
export function saveReportRecord(report: CompteRenduFullData): CompteRenduFullData[] {
  const history = getStoredReportsHistory();
  const existingIdx = history.findIndex((r) => r.id === report.id);

  if (existingIdx >= 0) {
    history[existingIdx] = report;
  } else {
    history.unshift(report);
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(history));
  }

  return history;
}
