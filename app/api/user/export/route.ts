import { NextResponse } from "next/server";
import { getCurrentUserSession } from "@/lib/auth-service";
import { getCurrentObjectivesConfig } from "@/lib/objectifs-service";
import { getAllSuiviRecords } from "@/lib/suivi-service";
import { getStoredReportsHistory } from "@/lib/reports-aggregation-service";

export async function GET() {
  try {
    const user = getCurrentUserSession();
    const objectives = getCurrentObjectivesConfig();
    const suivis = getAllSuiviRecords();
    const reports = getStoredReportsHistory();

    const exportData = {
      exportDate: new Date().toISOString(),
      platform: "BeGoodDisciple (BGD)",
      userProfile: user,
      annualObjectives2026: objectives,
      dailyTrackingHistory: suivis,
      reportsHistory: reports,
    };

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="bgd-export-data-${Date.now()}.json"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
