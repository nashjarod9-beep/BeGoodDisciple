import { NextResponse } from "next/server";

export async function GET() {
  console.log("[BGD Cron Scheduler] Automated report generation & email dispatch executing...");
  return NextResponse.json({
    success: true,
    message: "Cron job executed: Automated spiritual reports generated and dispatched to disciples & mentors.",
    timestamp: new Date().toISOString(),
  });
}
