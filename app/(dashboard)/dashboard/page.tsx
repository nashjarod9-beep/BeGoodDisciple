"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  BookOpen,
  Clock,
  Send,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  FileCheck,
  Sparkles,
  HeartHandshake,
  Lightbulb,
} from "lucide-react";
import { Card, StatCard, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CircularProgressBar, LinearProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { BgdAssistantChat } from "@/components/ai/BgdAssistantChat";
import { getCurrentUserSession } from "@/lib/auth-service";

export default function DashboardOverviewPage() {
  const [userSession, setUserSession] = useState<any>(null);
  const [aiEncouragement, setAiEncouragement] = useState<string>("");
  const [aiTrendAlert, setAiTrendAlert] = useState<string | undefined>(undefined);

  useEffect(() => {
    const session = getCurrentUserSession();
    setUserSession(session);

    // Fetch dynamic AI Pastoral Encouragement & Trend Detection
    const fetchAiEncouragement = async () => {
      try {
        const res = await fetch("/api/ai/encouragement", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: session?.firstName || "Jean",
            streakDays: 12,
            weeklyScore: 92,
          }),
        });

        const data = await res.json();
        setAiEncouragement(data.encouragement);
        setAiTrendAlert(data.trendAlert);
      } catch {
        setAiEncouragement(
          `Que la grâce du Seigneur t'accompagne aujourd'hui, ${session?.firstName || "Jean"} ! Ta régularité dans la prière et la méditation porte du fruit jour après jour.`
        );
      }
    };

    fetchAiEncouragement();
  }, []);

  const discipleFirstName = userSession?.firstName || "Jean";

  return (
    <div className="space-y-8 relative">
      {/* WELCOME BANNER WITH SPIRITUAL QUOTE & AI ENCOURAGEMENT */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white p-6 sm:p-8 shadow-xl shadow-blue-950/15">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 border border-blue-700/80 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
              <span>Série spirituelle : 12 jours d'affilée</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
              Bienvenue, {discipleFirstName} !
            </h2>

            {/* USE CASE 2: AI DYNAMIC PASTORAL ENCOURAGEMENT BANNER */}
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm text-amber-100 flex items-start gap-2.5 max-w-2xl">
              <HeartHandshake className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="italic font-medium">
                "{aiEncouragement || "Chargement de la pensée pastorale IA..."}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/suivi">
              <Button
                variant="gold"
                size="md"
                icon={<Plus className="w-4 h-4" />}
              >
                Saisir mon suivi du jour
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* USE CASE 3: AI SOFT TREND ALERT DETECTOR */}
      {aiTrendAlert && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs font-medium flex items-center gap-3 shadow-sm animate-in fade-in">
          <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
          <div>{aiTrendAlert}</div>
        </div>
      )}

      {/* STAT CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Temps de Prière"
          value="5h 15m"
          subtitle="Cette semaine"
          variant="blue"
          icon={<Clock className="w-6 h-6" />}
          trend={{ value: "+1h 20m", isPositive: true }}
        />

        <StatCard
          title="Chapitres Bibliques"
          value="32 Chap."
          subtitle="Livres : Jean & Actes"
          variant="gold"
          icon={<BookOpen className="w-6 h-6" />}
          trend={{ value: "+8", isPositive: true }}
        />

        <StatCard
          title="Régularité Spirituelle"
          value="92%"
          subtitle="Objectif hebdo"
          variant="blue"
          icon={<Flame className="w-6 h-6" />}
          badgeText="Excellente"
        />

        <StatCard
          title="Comptes Rendus FD"
          value="4 Envoyés"
          subtitle={`Mentor : ${userSession?.activeMentorEmail || "Past. Paul"}`}
          variant="slate"
          icon={<Send className="w-6 h-6" />}
        />
      </div>

      {/* OBJECTIVES & CIRCULAR PROGRESS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Active Weekly Objectives */}
        <Card variant="gradient" className="lg:col-span-2 space-y-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <CardTitle>Objectifs de la Semaine</CardTitle>
              <p className="text-xs text-slate-500">Progression globale de vos engagements spirituels</p>
            </div>
            <Link href="/objectifs">
              <Button variant="ghost" size="sm" icon={<ArrowUpRight className="w-4 h-4" />}>
                Voir tout
              </Button>
            </Link>
          </CardHeader>

          <CardContent className="space-y-5 pt-2">
            <LinearProgressBar
              value={85}
              label="Prière quotidienne (Objectif 45 min/jour)"
              colorVariant="blue"
            />
            <LinearProgressBar
              value={100}
              label="Lecture Biblique (4 chapitres/jour)"
              colorVariant="gold"
            />
            <LinearProgressBar
              value={60}
              label="Méditation & Mémorisation de versets"
              colorVariant="emerald"
            />
            <LinearProgressBar
              value={50}
              label="Jeûne & Intercession (1 jour/semaine)"
              colorVariant="blue"
            />
          </CardContent>
        </Card>

        {/* Right Col: Weekly Completion Circular Ring */}
        <Card variant="gradient" className="flex flex-col items-center justify-center p-6 text-center space-y-4">
          <CardTitle>Score Global Hebdo</CardTitle>
          <p className="text-xs text-slate-500 -mt-2">Basé sur vos saisies quotidiennes</p>

          <div className="py-2">
            <CircularProgressBar
              value={82}
              size={160}
              strokeWidth={14}
              colorVariant="gold"
              label="Accompli"
              sublabel="Semaine 29"
            />
          </div>

          <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Rapport auto généré dans :</span>
            <span className="text-blue-900 font-bold bg-blue-50 px-2 py-1 rounded-md">2 jours</span>
          </div>
        </Card>
      </div>

      {/* RECENT REPORTS HISTORY SKELETON LIST */}
      <Card variant="gradient" className="space-y-4">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <CardTitle>Derniers Comptes Rendus au FD</CardTitle>
            <p className="text-xs text-slate-500">Historique des bilans transmis à votre Faiseur de Disciple</p>
          </div>
          <Link href="/comptes-rendus">
            <Button variant="outline" size="sm">
              Tous les comptes rendus
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="space-y-3 pt-2">
          <div className="p-4 rounded-xl bg-white border border-slate-100 hover:border-blue-200 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">
                  Compte Rendu Spirituel - Semaine du 15 au 21 Juillet
                </h4>
                <p className="text-xs text-slate-500">Mentor : {userSession?.activeMentorEmail || "Past. Paul"} • Note globale : 8.8/10</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Badge variant="reviewed" size="md">
                Revu par le FD
              </Badge>
              <Link href="/comptes-rendus">
                <Button variant="ghost" size="sm">
                  Consulter
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* USE CASE 5: ASSISTANT BGD FLOATING CONVERSATIONAL AI CHAT WIDGET */}
      <BgdAssistantChat />
    </div>
  );
}
