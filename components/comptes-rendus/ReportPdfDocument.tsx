"use client";

import React, { useState, useEffect } from "react";
import { BgdLogo } from "../shared/BgdLogo";
import { CompteRenduFullData } from "@/types";
import { Button } from "../ui/Button";
import { Printer, ArrowLeft, Sparkles } from "lucide-react";

interface ReportPdfDocumentProps {
  report: CompteRenduFullData;
  onBack?: () => void;
}

export const ReportPdfDocument: React.FC<ReportPdfDocumentProps> = ({
  report,
  onBack,
}) => {
  const [aiSummary, setAiSummary] = useState<string>("");

  useEffect(() => {
    // Generate or retrieve cached AI qualitative summary
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/ai/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            discipleName: report.discipleName,
            reportType: report.type,
            titre: report.titre,
            totalPrayerHours: report.contenuAgrege.totalPrayerHoursFormatted,
            chaptersRead: report.contenuAgrege.totalChaptersRead,
            evangelizedCount: report.contenuAgrege.totalPeopleEvangelized,
            completionScore: report.contenuAgrege.overallScorePercentage,
            burdens: report.contenuAgrege.prayerBurdens,
          }),
        });

        const data = await res.json();
        setAiSummary(
          data.summary ||
            `Cher(e) ${report.discipleName}, nous rendons grâce pour ton engagement spirituel durant cette période. Tes ${report.contenuAgrege.totalPrayerHoursFormatted} de prière et tes ${report.contenuAgrege.totalChaptersRead} chapitres bibliques lus témoignent d'un cœur désireux de grandir dans l'intimité du Seigneur.`
        );
      } catch {
        setAiSummary(
          `Cher(e) ${report.discipleName}, nous rendons grâce pour ton engagement spirituel durant cette période. Tes ${report.contenuAgrege.totalPrayerHoursFormatted} de prière témoignent de ta fidélité. Continue d'avancer avec joie.`
        );
      }
    };

    fetchSummary();
  }, [report]);

  const handlePrint = () => {
    window.print();
  };

  const { contenuAgrege, reponsesSpecifiques } = report;

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between print:hidden">
        {onBack && (
          <Button variant="outline" size="sm" onClick={onBack} icon={<ArrowLeft className="w-4 h-4" />}>
            Retour aux comptes rendus
          </Button>
        )}
        <div className="flex items-center gap-2">
          <Button variant="gold" size="sm" onClick={handlePrint} icon={<Printer className="w-4 h-4" />}>
            Imprimer / Enregistrer en PDF
          </Button>
        </div>
      </div>

      {/* Printable Document Body */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl max-w-4xl mx-auto space-y-8 text-slate-900 print:shadow-none print:border-none print:p-0">
        {/* Header Header Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white flex items-center justify-between border-b-4 border-amber-400">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold font-heading tracking-tight">
              COMPTE RENDU SPIRITUEL
            </h1>
            <p className="text-xs text-amber-300 font-bold uppercase tracking-widest">
              BeGoodDisciple (BGD) • Suivi & Compte Rendu Spirituel
            </p>
            <p className="text-xs text-blue-200">{report.titre}</p>
          </div>
          <BgdLogo size="lg" showText={false} />
        </div>

        {/* Identity Details */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
              Disciple :
            </span>
            <strong className="text-sm font-bold text-slate-900 font-heading">
              {report.discipleName}
            </strong>
          </div>

          <div>
            <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
              Faiseur de Disciple (FD) :
            </span>
            <strong className="text-sm font-bold text-blue-900 font-heading">
              {report.mentorEmail}
            </strong>
          </div>
        </div>

        {/* USE CASE 1: QUALITATIVE AI SUMMARY BOX (Top of PDF) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/90 via-blue-50/70 to-white border border-amber-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold font-heading text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>Synthèse & Encouragement Pastoral (IA DeepSeek)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
            "{aiSummary || "Analyse et encouragements spirituels en cours de génération..."}"
          </p>
        </div>

        {/* Aggregate Metrics Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
            1. Synthèse des Statistiques Spirituelles Agrégées
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-100">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Prière Personnelle</span>
              <span className="text-xl font-extrabold font-heading text-blue-900">
                {contenuAgrege.totalPrayerHoursFormatted}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-100">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Lecture Biblique</span>
              <span className="text-xl font-extrabold font-heading text-amber-800">
                {contenuAgrege.totalChaptersRead} Chap.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-100">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Méditation</span>
              <span className="text-xl font-extrabold font-heading text-purple-900">
                {contenuAgrege.totalMeditationMinutes} min
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-100">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Évangélisation</span>
              <span className="text-xl font-extrabold font-heading text-emerald-800">
                {contenuAgrege.totalPeopleEvangelized} pers.
              </span>
            </div>
          </div>
        </div>

        {/* Fardeaux de Prière */}
        {contenuAgrege.prayerBurdens.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
              2. Fardeaux & Sujets de Prière Clés
            </h3>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              {contenuAgrege.prayerBurdens.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        {/* End-of-period specific questions responses */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
            3. Questions Spécifiques & Engagements de Fin de Période
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
              <span>Dîme & Offrandes :</span>
              <strong className={reponsesSpecifiques.gaveTithe ? "text-emerald-700" : "text-rose-600"}>
                {reponsesSpecifiques.gaveTithe ? "Effectué ✓" : "Non effectué ✗"}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
              <span>Don Galates 6 (Enseignants) :</span>
              <strong className={reponsesSpecifiques.gaveGalates6 ? "text-emerald-700" : "text-rose-600"}>
                {reponsesSpecifiques.gaveGalates6 ? "Effectué ✓" : "Non effectué ✗"}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
              <span>Visites Pastorales :</span>
              <strong className={reponsesSpecifiques.visitedBrethren ? "text-emerald-700" : "text-slate-600"}>
                {reponsesSpecifiques.visitedBrethren ? "Effectué ✓" : "Aucune"}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
              <span>Enseignements écoutés :</span>
              <strong className={reponsesSpecifiques.listenedTeachings ? "text-emerald-700" : "text-slate-600"}>
                {reponsesSpecifiques.listenedTeachings ? "Oui ✓" : "Non"}
              </strong>
            </div>
          </div>
        </div>

        {/* Mentor (FD) Feedback Section */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-amber-50 border border-blue-200 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 font-heading">
            4. Espace de Retour & Bénédiction du Mentor (FD)
          </h4>
          <div className="h-24 bg-white rounded-xl border border-blue-200 p-3 text-xs text-slate-500 italic">
            [ Espace réservé aux conseils spirituels et prières du mentor {report.mentorEmail} ]
          </div>
        </div>

        {/* Document Footer */}
        <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400">
          <span>Généré par BeGoodDisciple (BGD) • Intelligence Artificielle DeepSeek</span>
          <span>Imprimé le {new Date().toLocaleDateString("fr-FR")}</span>
        </div>
      </div>
    </div>
  );
};
