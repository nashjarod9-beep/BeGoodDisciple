"use client";

import React from "react";
import { Send, FileText, CheckCircle2, Clock, Sparkles, Filter } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function ComptesRendusPage() {
  const reports = [
    {
      id: "rep-1",
      period: "Semaine du 15 au 21 Juillet 2026",
      disciple: "Jean Disciple",
      mentor: "Pasteur Paul",
      status: "REVIEWED" as const,
      score: 8.8,
      sentAt: "21/07/2026 à 20:45",
      highlights: ["Prière quotidienne maintenue", "28 chapitres bibliques lus", "Jeûne d'un jour effectué"],
      feedback: "Bravo Jean ! Continue d'approfondir la méditation de l'Évangile de Jean.",
    },
    {
      id: "rep-2",
      period: "Semaine du 8 au 14 Juillet 2026",
      disciple: "Jean Disciple",
      mentor: "Pasteur Paul",
      status: "SENT" as const,
      score: 8.2,
      sentAt: "14/07/2026 à 19:30",
      highlights: ["22 chapitres bibliques lus", "Temps de prière en hausse"],
      feedback: "En attente du retour écrit du mentor.",
    },
    {
      id: "rep-3",
      period: "Semaine du 1er au 7 Juillet 2026",
      disciple: "Jean Disciple",
      mentor: "Pasteur Paul",
      status: "DRAFT" as const,
      score: 7.5,
      sentAt: "Brouillon non transmis",
      highlights: ["3 temps de prière accomplis"],
      feedback: "Brouillon sauvegardé automatiquement.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Generator CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900">
            Comptes Rendus Spirituels (FD)
          </h2>
          <p className="text-xs text-slate-500">
            Synthèses automatiques transmises à votre mentor pour avis et conseils.
          </p>
        </div>

        <Button
          variant="gold"
          size="md"
          icon={<Sparkles className="w-4 h-4" />}
        >
          Générer le bilan hebdomadaire
        </Button>
      </div>

      {/* List of Reports */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} variant="gradient" hoverEffect className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-700">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-slate-900">
                    {report.period}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Mentor destinataire : <strong className="text-slate-800">{report.mentor}</strong> • {report.sentAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    report.status === "REVIEWED"
                      ? "reviewed"
                      : report.status === "SENT"
                      ? "sent"
                      : "draft"
                  }
                  size="md"
                >
                  {report.status === "REVIEWED"
                    ? "Revu & Validé par FD"
                    : report.status === "SENT"
                    ? "Transmis au FD"
                    : "Brouillon"}
                </Badge>
                <span className="text-sm font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  {report.score}/10
                </span>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Points forts résumés :</p>
              <div className="flex flex-wrap gap-2">
                {report.highlights.map((item, idx) => (
                  <span key={idx} className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-700 font-medium">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Mentor feedback note */}
            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900">
              <strong className="font-bold">Commentaire du Mentor :</strong> {report.feedback}
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" size="sm">
                Télécharger le PDF
              </Button>
              <Button variant="ghost" size="sm" icon={<Send className="w-4 h-4" />}>
                Renvoyer notification au FD
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
