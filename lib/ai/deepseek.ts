/**
 * BeGoodDisciple (BGD) - DeepSeek AI Integration Layer
 * Model: deepseek-chat
 * Tone: Pastoral, benevolent, warm, highly encouraging, never judgmental or guilt-inducing.
 */

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const SUMMARY_CACHE = new Map<string, string>();

const SYSTEM_PROMPT_BASE = `Tu es l'Assistant Spirituel et Pasteur d'Édification de la plateforme BeGoodDisciple (BGD).
Ton ton doit être TOUJOURS extrêmement bienveillant, pastoral, chaleureux, profondément encourageant et jamais moralisateur ni culpabilisant.
Tu valorises chaque progrès, même modeste. Si tu constates un ralentissement ou un oubli, tu l'abordes avec douceur, compassion et grâce, comme un berger qui réconforte.
Tes réponses doivent être concises, inspirantes et ancrées dans l'amour et la foi chrétienne.`;

interface DeepSeekChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Core function calling DeepSeek API with timeout and fallback
 */
export async function callDeepSeekAPI(
  messages: DeepSeekChatMessage[],
  fallbackText: string,
  temperature: number = 0.7
): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY || "";

  if (!apiKey) {
    console.warn("[DeepSeek AI] API key missing, returning pastoral fallback.");
    return fallbackText;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature,
        max_tokens: 600,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[DeepSeek AI] API returned status ${response.status}`);
      return fallbackText;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    return content ? content.trim() : fallbackText;
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.warn(`[DeepSeek AI] Request failed or timed out: ${error.message}`);
    return fallbackText;
  }
}

/**
 * USE CASE 1: Qualitative AI Summary for Spiritual Reports
 */
export async function generateReportAISummary(reportData: {
  discipleName: string;
  reportType: string;
  titre: string;
  totalPrayerHours: string;
  chaptersRead: number;
  evangelizedCount: number;
  completionScore: number;
  burdens: string[];
}): Promise<string> {
  const cacheKey = `summary_${reportData.reportType}_${reportData.completionScore}_${reportData.chaptersRead}`;
  if (SUMMARY_CACHE.has(cacheKey)) {
    return SUMMARY_CACHE.get(cacheKey)!;
  }

  const fallback = `Cher(e) ${reportData.discipleName}, nous rendons grâce pour ton engagement spirituel durant cette période. Tes ${reportData.totalPrayerHours} de prière et tes ${reportData.chaptersRead} chapitres bibliques dus témoignent d'un cœur désireux de grandir dans l'intimité du Seigneur. Continue à marcher avec confiance et régularité, sachant que chaque pas compte dans ta croissance spirituelle.`;

  const messages: DeepSeekChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT_BASE },
    {
      role: "user",
      content: `Génère un court paragraphe de synthèse pastoral et encourageant (3 à 4 phrases maximum) pour le compte rendu spirituel (${reportData.reportType}) du disciple ${reportData.discipleName}.
Statistiques de la période :
- Prière personnelle : ${reportData.totalPrayerHours}
- Lecture biblique : ${reportData.chaptersRead} chapitres
- Évangélisation : ${reportData.evangelizedCount} personnes
- Score global de régularité : ${reportData.completionScore}%
- Sujets de prière : ${reportData.burdens.join(", ")}

Instructions : Souligne les points fort avec enthousiasme. Si la régularité est moyenne, encourage doucement sans culpabiliser. Termine par une courte bénédiction.`,
    },
  ];

  const result = await callDeepSeekAPI(messages, fallback, 0.7);
  SUMMARY_CACHE.set(cacheKey, result);
  return result;
}

/**
 * USE CASE 2 & 3: Contextual Dashboard Encouragement & Soft Trend Alerts
 */
export async function generateDashboardEncouragement(userData: {
  firstName: string;
  streakDays: number;
  weeklyScore: number;
}): Promise<{ encouragement: string; trendAlert?: string }> {
  const fallbackEncouragement = `Que la grâce du Seigneur t'accompagne aujourd'hui, ${userData.firstName} ! Ta fidélité dans la prière et la méditation porte du fruit dans l'invisible. Continue d'avancer pas à pas avec joie.`;

  const messages: DeepSeekChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT_BASE },
    {
      role: "user",
      content: `Génère un message pastoral quotidien ultra-court (2 phrases max) pour le tableau de bord de ${userData.firstName}.
Contexte du disciple :
- Série spirituelle active : ${userData.streakDays} jours d'affilée
- Régularité de la semaine : ${userData.weeklyScore}%

Donne une pensée inspirante, joyeuse et bienveillante pour la journée.`,
    },
  ];

  const encouragement = await callDeepSeekAPI(messages, fallbackEncouragement, 0.8);

  let trendAlert: string | undefined = undefined;
  if (userData.weeklyScore < 70) {
    trendAlert = `💡 **Conseil pastoral bienveillant** : Le rythme de cette semaine est un peu plus doux. Prends 10 minutes aujourd'hui pour vous ressourcer dans la présence de Dieu sans pression.`;
  }

  return { encouragement, trendAlert };
}

/**
 * USE CASE 4: AI Smart Character & Goal Suggestions
 */
export async function generateCharacterSuggestions(existingAxes: string[]): Promise<Array<{ name: string; targetGoal: string }>> {
  const fallback = [
    { name: "Maîtrise de la parole & Bienveillance", targetGoal: "Proposer 1 parole d'encouragement par jour" },
    { name: "Gestion du temps & Concentration", targetGoal: "30 min d'étude biblique sans téléphone" },
    { name: "Patience & Gratitude", targetGoal: "Noter 3 sujets de reconnaissance chaque soir" },
  ];

  const messages: DeepSeekChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT_BASE },
    {
      role: "user",
      content: `Propose 3 idées inspirantes d'axes de travail sur le caractère et la discipline chrétienne pour un disciple.
Axes déjà choisis : ${existingAxes.join(", ") || "Aucun"}
Formate la réponse sous forme de JSON strict d'un tableau d'objets [{ "name": "...", "targetGoal": "..." }].`,
    },
  ];

  try {
    const raw = await callDeepSeekAPI(messages, "", 0.7);
    if (raw) {
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }

  return fallback;
}

/**
 * USE CASE 5: Assistant BGD Conversational Chat (Simple RAG)
 */
export async function askBgdAssistant(
  question: string,
  userContext: {
    discipleName: string;
    mentorEmail: string;
    activeGoalsSummary: string;
    recentStatsSummary: string;
  }
): Promise<string> {
  const fallback = `Je suis ravi de t'accompagner ! En examinant tes données récentes, tu as maintenu une belle régularité dans la prière et tes chapitres bibliques. N'hésite pas à persévérer avec joie et à échanger avec ton mentor ${userContext.mentorEmail}.`;

  const messages: DeepSeekChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT_BASE },
    {
      role: "user",
      content: `Question du disciple ${userContext.discipleName} : "${question}"

Données réelles du disciple :
- Mentor (FD) : ${userContext.mentorEmail}
- Objectifs actuels : ${userContext.activeGoalsSummary}
- Statistiques récentes : ${userContext.recentStatsSummary}

Réponds de manière directe, pastorale, personnalisée et très encourageante en faisant référence à ses propres statistiques réelles si pertinent.`,
    },
  ];

  return await callDeepSeekAPI(messages, fallback, 0.7);
}
