import { NextResponse } from "next/server";
import { generateCharacterSuggestions } from "@/lib/ai/deepseek";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const suggestions = await generateCharacterSuggestions(body.existingAxes || []);
    return NextResponse.json({ success: true, suggestions });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      suggestions: [
        { name: "Maîtrise de la parole", targetGoal: "Encourager plutôt que critiquer" },
        { name: "Concentration dans la prière", targetGoal: "30 min sans distraction" },
      ],
    });
  }
}
