import { NextResponse } from "next/server";
import { generateDashboardEncouragement } from "@/lib/ai/deepseek";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await generateDashboardEncouragement(body);
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      encouragement:
        "Que la grâce du Seigneur t'accompagne aujourd'hui ! Ta régularité porte du fruit jour après jour.",
    });
  }
}
