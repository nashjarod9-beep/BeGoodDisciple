import { NextResponse } from "next/server";
import { askBgdAssistant } from "@/lib/ai/deepseek";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, context } = body;
    const reply = await askBgdAssistant(question, context);
    return NextResponse.json({ success: true, reply });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      reply:
        "Je suis ravi de t'accompagner ! Ta fidélité dans la prière et la méditation porte du fruit. N'hésite pas à persévérer avec joie et à échanger régulièrement avec ton mentor.",
    });
  }
}
