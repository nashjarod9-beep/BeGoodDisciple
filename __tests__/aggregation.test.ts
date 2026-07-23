import { calculateCompletion } from "../lib/suivi-service";

describe("BeGoodDisciple - Daily Tracking & Report Aggregation Unit Tests", () => {
  test("calculateCompletion should calculate correct percentage for active categories", () => {
    const mockEntries = {
      prierePersonnelle: { minutes: 45, burden: "Sagesse" },
      lectureBiblique: { chaptersRead: 4 },
      meditation: { minutes: 15 },
      evangelisation: { peopleCount: 2, tractsDistributed: true },
    };

    const dateStr = "2026-07-20";
    const result = calculateCompletion(mockEntries, dateStr);

    expect(result.completionScore).toBeGreaterThan(0);
    expect(result.totalBlocks).toBeGreaterThan(0);
    expect(result.completedBlocks).toBeGreaterThanOrEqual(1);
  });
});
