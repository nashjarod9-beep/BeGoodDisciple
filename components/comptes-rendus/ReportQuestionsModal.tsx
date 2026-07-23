"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Gift,
  Users,
  BookOpen,
  Headphones,
  Award,
  Heart,
  Save,
  Info,
  X,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  CompteRenduType,
  PeriodQuestionsPayload,
  CompteRenduFullData,
} from "@/types";
import {
  aggregateDailyDataForPeriod,
  createDefaultPeriodQuestions,
  saveReportRecord,
} from "@/lib/reports-aggregation-service";
import { getCurrentUserSession } from "@/lib/auth-service";

interface ReportQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportType: CompteRenduType;
  startDateStr: string; // YYYY-MM-DD
  endDateStr: string;   // YYYY-MM-DD
  onReportCreated: (newReport: CompteRenduFullData) => void;
}

export const ReportQuestionsModal: React.FC<ReportQuestionsModalProps> = ({
  isOpen,
  onClose,
  reportType,
  startDateStr,
  endDateStr,
  onReportCreated,
}) => {
  const user = getCurrentUserSession();
  const discipleName = `${user?.firstName || "Jean"} ${user?.lastName || "Disciple"}`;
  const mentorEmail = user?.activeMentorEmail || "pastor.paul@example.com";

  // Form State
  const [gaveTithe, setGaveTithe] = useState(true);
  const [gaveGalates6, setGaveGalates6] = useState(true);
  const [visitedBrethren, setVisitedBrethren] = useState(true);
  const [visitedComment, setVisitedComment] = useState("Visite d'encouragement chez le frère Marc.");
  const [listenedTeachings, setListenedTeachings] = useState(true);
  
  const [completedBook, setCompletedBook] = useState(false);
  const [completedBookTitle, setCompletedBookTitle] = useState("");
  const [completedBookAuthor, setCompletedBookAuthor] = useState("");

  const [tookRetreat, setTookRetreat] = useState(false);
  const [retreatDay, setRetreatDay] = useState("Samedi 18 Juillet");
  const [retreatDuration, setRetreatDuration] = useState("1 journée complète (06h - 18h)");
  const [retreatBurdens, setRetreatBurdens] = useState("Direction spirituelle et sanctification");

  const [wonSoul, setWonSoul] = useState(true);
  const [wonSoulComment, setWonSoulComment] = useState("1 personne sauvée et intégrée au cours de baptême.");

  if (!isOpen) return null;

  const handleGenerate = () => {
    const periodQuestions: PeriodQuestionsPayload = {
      gaveTithe,
      gaveGalates6,
      visitedBrethren,
      visitedComment,
      listenedTeachings,
      completedBook,
      completedBookTitle: completedBook ? completedBookTitle : undefined,
      completedBookAuthor: completedBook ? completedBookAuthor : undefined,
      tookRetreat,
      retreatDetails: tookRetreat
        ? { day: retreatDay, duration: retreatDuration, mainBurdens: retreatBurdens }
        : undefined,
      wonSoulToChrist: reportType !== "HEBDO" ? wonSoul : undefined,
      wonSoulComment: reportType !== "HEBDO" ? wonSoulComment : undefined,
      donationRecommendationMessage:
        !gaveTithe || !gaveGalates6
          ? "Recommandation : Vous n'avez pas pu effectuer de don cette période. Nous vous encourageons à planifier 1 à 3 dons le mois suivant."
          : undefined,
    };

    const aggregatedMetrics = aggregateDailyDataForPeriod(startDateStr, endDateStr);

    const typeTitleMap: Record<CompteRenduType, string> = {
      HEBDO: `Compte rendu de la semaine du ${startDateStr} au ${endDateStr}`,
      MENSUEL: `Compte rendu mensuel du ${startDateStr} au ${endDateStr}`,
      TRIMESTRIEL: `Compte rendu trimestriel (${startDateStr} à ${endDateStr})`,
      SEMESTRIEL: `Compte rendu semestriel (${startDateStr} à ${endDateStr})`,
      ANNUEL: `Compte rendu annuel ${new Date(startDateStr).getFullYear()}`,
    };

    const newReport: CompteRenduFullData = {
      id: `rep-${Date.now()}`,
      discipleId: user?.id || "user-demo-1",
      discipleName,
      mentorEmail,
      type: reportType,
      titre: typeTitleMap[reportType],
      dateDebut: startDateStr,
      dateFin: endDateStr,
      contenuAgrege: aggregatedMetrics,
      reponsesSpecifiques: periodQuestions,
      urlPdf: "#",
      dateEnvoi: new Date().toISOString(),
      statutEnvoi: "ENVOYE",
      createdAt: new Date().toISOString(),
    };

    saveReportRecord(newReport);
    onReportCreated(newReport);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl shadow-blue-950/20 border border-slate-100 z-10 overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-blue-950 font-extrabold flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading">
                Questions de Fin de Période ({reportType})
              </h3>
              <p className="text-xs text-blue-200">
                Période du {startDateStr} au {endDateStr}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-300 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* QUESTION 1: DIME / OFFRANDE */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-600" />
                <span>As-tu donné ta dîme / offrande cette période ?</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGaveTithe(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${gaveTithe ? "bg-emerald-600 text-white" : "bg-white text-slate-600 border"}`}
                >
                  Oui ✓
                </button>
                <button
                  type="button"
                  onClick={() => setGaveTithe(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!gaveTithe ? "bg-rose-600 text-white" : "bg-white text-slate-600 border"}`}
                >
                  Non ✗
                </button>
              </div>
            </div>

            {!gaveTithe && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
                ❤️ <em>"La fidélité dans les petites choses apporte de grandes bénédictions. Ne te décourage pas, planifie au moins 1 à 3 dons le mois prochain."</em>
              </div>
            )}
          </div>

          {/* QUESTION 2: DON GALATES 6 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Gift className="w-4 h-4 text-blue-600" />
              <span>As-tu fait un don Galates 6 (à ceux qui enseignent) ?</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGaveGalates6(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${gaveGalates6 ? "bg-emerald-600 text-white" : "bg-white text-slate-600 border"}`}
              >
                Oui ✓
              </button>
              <button
                type="button"
                onClick={() => setGaveGalates6(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!gaveGalates6 ? "bg-rose-600 text-white" : "bg-white text-slate-600 border"}`}
              >
                Non ✗
              </button>
            </div>
          </div>

          {/* QUESTION 3: VISITES PASTORALES */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-600" />
                <span>As-tu rendu visite à des frères/sœurs (visite pastorale) ?</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setVisitedBrethren(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${visitedBrethren ? "bg-emerald-600 text-white" : "bg-white text-slate-600 border"}`}
                >
                  Oui ✓
                </button>
                <button
                  type="button"
                  onClick={() => setVisitedBrethren(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!visitedBrethren ? "bg-rose-600 text-white" : "bg-white text-slate-600 border"}`}
                >
                  Non ✗
                </button>
              </div>
            </div>

            {visitedBrethren && (
              <input
                type="text"
                value={visitedComment}
                onChange={(e) => setVisitedComment(e.target.value)}
                placeholder="Commentaires ou détails de la visite..."
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
              />
            )}
          </div>

          {/* QUESTION 4: ENSEIGNEMENTS */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Headphones className="w-4 h-4 text-sky-600" />
              <span>As-tu écouté des enseignements cette période ?</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setListenedTeachings(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${listenedTeachings ? "bg-emerald-600 text-white" : "bg-white text-slate-600 border"}`}
              >
                Oui ✓
              </button>
              <button
                type="button"
                onClick={() => setListenedTeachings(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!listenedTeachings ? "bg-rose-600 text-white" : "bg-white text-slate-600 border"}`}
              >
                Non ✗
              </button>
            </div>
          </div>

          {/* QUESTION 5: LIVRE TERMINÉ */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>As-tu terminé un livre cette période ?</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCompletedBook(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${completedBook ? "bg-emerald-600 text-white" : "bg-white text-slate-600 border"}`}
                >
                  Oui ✓
                </button>
                <button
                  type="button"
                  onClick={() => setCompletedBook(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!completedBook ? "bg-rose-600 text-white" : "bg-white text-slate-600 border"}`}
                >
                  Non ✗
                </button>
              </div>
            </div>

            {completedBook && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Titre du livre"
                  value={completedBookTitle}
                  onChange={(e) => setCompletedBookTitle(e.target.value)}
                  className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                />
                <input
                  type="text"
                  placeholder="Auteur"
                  value={completedBookAuthor}
                  onChange={(e) => setCompletedBookAuthor(e.target.value)}
                  className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>
            )}
          </div>

          {/* QUESTION 6: RETRAITE SPIRITUELLE */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-600" />
                <span>As-tu pris une retraite spirituelle ?</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTookRetreat(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${tookRetreat ? "bg-emerald-600 text-white" : "bg-white text-slate-600 border"}`}
                >
                  Oui ✓
                </button>
                <button
                  type="button"
                  onClick={() => setTookRetreat(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!tookRetreat ? "bg-rose-600 text-white" : "bg-white text-slate-600 border"}`}
                >
                  Non ✗
                </button>
              </div>
            </div>

            {tookRetreat && (
              <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Jour de la retraite"
                    value={retreatDay}
                    onChange={(e) => setRetreatDay(e.target.value)}
                    className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Durée (ex: 1 journée)"
                    value={retreatDuration}
                    onChange={(e) => setRetreatDuration(e.target.value)}
                    className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Principaux fardeaux de prière"
                  value={retreatBurdens}
                  onChange={(e) => setRetreatBurdens(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>
            )}
          </div>

          {/* QUESTION CONSOLIDEE CONDUITE D'ÂMES POUR PERIODE MENSUELLE ET PLUS */}
          {reportType !== "HEBDO" && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-amber-600 fill-amber-500" />
                  <span>As-tu conduit une âme à Christ qui a été sauvée & baptisée cette période ?</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWonSoul(true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${wonSoul ? "bg-emerald-600 text-white" : "bg-white text-slate-600 border"}`}
                  >
                    Oui ✓
                  </button>
                  <button
                    type="button"
                    onClick={() => setWonSoul(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!wonSoul ? "bg-rose-600 text-white" : "bg-white text-slate-600 border"}`}
                  >
                    Non ✗
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={wonSoulComment}
                onChange={(e) => setWonSoulComment(e.target.value)}
                placeholder="Détails ou état de suivi (ex: 1 personne en cours de baptême)..."
                className="w-full p-2.5 bg-white border border-amber-200 rounded-xl text-xs outline-none"
              />
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="p-4 px-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="gold" size="md" onClick={handleGenerate} icon={<Send className="w-4 h-4" />}>
            Générer & Transmettre au FD
          </Button>
        </div>
      </div>
    </div>
  );
};
