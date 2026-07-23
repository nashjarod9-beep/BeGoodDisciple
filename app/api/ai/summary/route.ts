import { NextResponse } from "next/server";
import { generateReportAISummary } from "@/lib/ai/deepseek";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const summary = await generateReportAISummary(body);
    return NextResponse.json({ success: true, summary });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        summary:
          "Nous rendons grâce pour votre régularité et votre fidélité dans la prière et la méditation durant cette période. Que le Seigneur continue de bénir abondamment votre marche spirituelle.",
      },
      { status: 500 }
    );
  }
}
