"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Sparkles,
  Send,
  Download,
  Eye,
  Filter,
  CheckCircle2,
  Plus,
  Clock,
  Mail,
  AlertCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ReportQuestionsModal } from "@/components/comptes-rendus/ReportQuestionsModal";
import { ReportPdfDocument } from "@/components/comptes-rendus/ReportPdfDocument";
import {
  getStoredReportsHistory,
  saveReportRecord,
} from "@/lib/reports-aggregation-service";
import { sendSpiritualReportEmail } from "@/lib/email-service";
import { getCurrentUserSession } from "@/lib/auth-service";
import { CompteRenduFullData, CompteRenduType } from "@/types";

export default function ComptesRendusPage() {
  const [reports, setReports] = useState<CompteRenduFullData[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState<CompteRenduType>("HEBDO");
  const [viewingPdfReport, setViewingPdfReport] = useState<CompteRenduFullData | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [testingEmail, setTestingEmail] = useState(false);

  const loadReports = () => {
    const list = getStoredReportsHistory();
    setReports(list);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleOpenQuestionsModal = (type: CompteRenduType) => {
    setSelectedReportType(type);
    setModalOpen(true);
  };

  const handleReportCreated = (newReport: CompteRenduFullData) => {
    loadReports();
    setNotification(`Compte rendu « ${newReport.titre} » généré et transmis au mentor !`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleTestEmailSend = async (report: CompteRenduFullData) => {
    setTestingEmail(true);
    const user = getCurrentUserSession();
    const discipleEmail = user?.email || "jean.disciple@example.com";
    const mentorEmail = report.mentorEmail || "pastor.paul@example.com";

    const res = await sendSpiritualReportEmail({
      discipleEmail,
      mentorEmail,
      report,
    });

    setTestingEmail(false);
    setNotification(res.message);
    setTimeout(() => setNotification(null), 4500);
  };

  const filteredReports = reports.filter((r) => {
    if (activeFilter === "ALL") return true;
    return r.type === activeFilter;
  });

  if (viewingPdfReport) {
    return (
      <div className="py-6">
        <ReportPdfDocument
          report={viewingPdfReport}
          onBack={() => setViewingPdfReport(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold font-heading text-slate-900">
            Comptes Rendus Spirituels (FD)
          </h2>
          <p className="text-xs text-slate-500">
            Agrégation automatique des données quotidiennes et génération des synthèses périodiques.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="gold"
            size="md"
            onClick={() => handleOpenQuestionsModal("HEBDO")}
            icon={<Sparkles className="w-4 h-4" />}
          >
            Générer Bilan Hebdo
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => handleOpenQuestionsModal("MENSUEL")}
            icon={<Plus className="w-4 h-4" />}
          >
            Nouveau Bilan Mensuel
          </Button>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Mandatory Frequencies Explanation Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-md flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
            <Clock className="w-4 h-4" />
            <span>Génération Automatique des Fréquences</span>
          </div>
          <p className="text-xs text-blue-200">
            En plus de votre fréquence par défaut (Hebdomadaire ou Mensuel), les synthèses <strong>Mensuelle, Trimestrielle, Semestrielle et Annuelle</strong> sont générées automatiquement.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveFilter("ALL")}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            activeFilter === "ALL"
              ? "bg-white text-blue-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Tous les comptes rendus ({reports.length})
        </button>
        <button
          onClick={() => setActiveFilter("HEBDO")}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            activeFilter === "HEBDO"
              ? "bg-white text-blue-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Hebdomadaires
        </button>
        <button
          onClick={() => setActiveFilter("MENSUEL")}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            activeFilter === "MENSUEL"
              ? "bg-white text-blue-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Mensuels
        </button>
        <button
          onClick={() => setActiveFilter("TRIMESTRIEL")}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            activeFilter === "TRIMESTRIEL"
              ? "bg-white text-blue-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Trimestriels
        </button>
        <button
          onClick={() => setActiveFilter("SEMESTRIEL")}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            activeFilter === "SEMESTRIEL"
              ? "bg-white text-blue-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Semestriels
        </button>
        <button
          onClick={() => setActiveFilter("ANNUEL")}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            activeFilter === "ANNUEL"
              ? "bg-white text-blue-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Annuels
        </button>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <Card variant="gradient" className="text-center p-8 space-y-3">
            <FileText className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold font-heading text-slate-900">
              Aucun compte rendu dans cette catégorie
            </h3>
            <p className="text-xs text-slate-500">
              Cliquez sur "Générer Bilan Hebdo" pour créer votre premier compte rendu.
            </p>
          </Card>
        ) : (
          filteredReports.map((rep) => (
            <Card key={rep.id} variant="gradient" hoverEffect className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-700">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-heading text-slate-900">
                      {rep.titre}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Mentor destinataire : <strong className="text-slate-800">{rep.mentorEmail}</strong> • Transmis le {new Date(rep.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={rep.type === "HEBDO" ? "info" : "gold"} size="sm">
                    {rep.type}
                  </Badge>
                  <Badge
                    variant={
                      rep.statutEnvoi === "REVU"
                        ? "reviewed"
                        : rep.statutEnvoi === "ENVOYE"
                        ? "sent"
                        : "draft"
                    }
                    size="md"
                  >
                    {rep.statutEnvoi === "REVU"
                      ? "Revu par FD"
                      : rep.statutEnvoi === "ENVOYE"
                      ? "Transmis par Email"
                      : "Brouillon"}
                  </Badge>
                </div>
              </div>

              {/* Aggregated Stats Summary Pill */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Prière</span>
                  <span className="font-extrabold text-blue-900">{rep.contenuAgrege.totalPrayerHoursFormatted}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Lecture Biblique</span>
                  <span className="font-extrabold text-amber-800">{rep.contenuAgrege.totalChaptersRead} Chap.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Évangélisation</span>
                  <span className="font-extrabold text-emerald-800">{rep.contenuAgrege.totalPeopleEvangelized} pers.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Régularité</span>
                  <span className="font-extrabold text-purple-900">{rep.contenuAgrege.overallScorePercentage}%</span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingPdfReport(rep)}
                  icon={<Eye className="w-4 h-4" />}
                >
                  Consulter & Imprimer le PDF
                </Button>

                <Button
                  variant="gold"
                  size="sm"
                  disabled={testingEmail}
                  onClick={() => handleTestEmailSend(rep)}
                  icon={<Mail className="w-4 h-4" />}
                >
                  {testingEmail ? "Envoi..." : "Déclencher un test d'envoi par Email"}
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* End-of-Period Questions Modal */}
      <ReportQuestionsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        reportType={selectedReportType}
        startDateStr="2026-07-14"
        endDateStr="2026-07-20"
        onReportCreated={handleReportCreated}
      />
    </div>
  );
}
