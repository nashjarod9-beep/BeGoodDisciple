"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarCheck,
  Save,
  CheckCircle2,
  Sparkles,
  Flame,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LinearProgressBar } from "@/components/ui/ProgressBar";
import { DateSelector } from "@/components/suivi/DateSelector";
import { PrayerTimerWidget } from "@/components/suivi/PrayerTimerWidget";
import { DynamicDailyForm } from "@/components/suivi/DynamicDailyForm";
import {
  getTodayDateString,
  getSuiviForDate,
  saveSuiviForDate,
  calculateCompletion,
} from "@/lib/suivi-service";
import { getCurrentObjectivesConfig } from "@/lib/objectifs-service";
import { FullObjectivesConfig, DailyTrackingEntriesData, SuiviQuotidienData } from "@/types";

export default function SuiviPage() {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());
  const [config, setConfig] = useState<FullObjectivesConfig | null>(null);
  const [suiviRecord, setSuiviRecord] = useState<SuiviQuotidienData | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const loadSuivi = (dateStr: string) => {
    const conf = getCurrentObjectivesConfig();
    const record = getSuiviForDate(dateStr);
    setConfig(conf);
    setSuiviRecord(record);
  };

  useEffect(() => {
    loadSuivi(selectedDate);
  }, [selectedDate]);

  const handleEntriesChange = (updatedEntries: DailyTrackingEntriesData) => {
    if (!suiviRecord) return;
    const { completionScore, totalBlocks } = calculateCompletion(updatedEntries, selectedDate);
    setSuiviRecord({
      ...suiviRecord,
      completionScore,
      totalBlocks,
      entrees: updatedEntries,
    });
  };

  const handlePrayerRecorded = (minutes: number, burden: string) => {
    if (!suiviRecord) return;
    const updatedEntries: DailyTrackingEntriesData = {
      ...suiviRecord.entrees,
      prierePersonnelle: {
        minutes,
        burden: burden || suiviRecord.entrees.prierePersonnelle?.burden || "",
      },
    };
    handleEntriesChange(updatedEntries);
    const saved = saveSuiviForDate(selectedDate, updatedEntries);
    setSuiviRecord(saved);
    setSaveSuccess(`Temps de prière de ${minutes} minute(s) enregistré !`);
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  const handleSaveSuivi = () => {
    if (!suiviRecord) return;
    const saved = saveSuiviForDate(selectedDate, suiviRecord.entrees);
    setSuiviRecord(saved);
    setSaveSuccess("Suivi quotidien enregistré avec succès !");
    setTimeout(() => setSaveSuccess(null), 4000);
  };

  if (!config || !suiviRecord) return null;

  const { completedBlocks } = calculateCompletion(suiviRecord.entrees, selectedDate);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold font-heading text-slate-900">
            Suivi Spirituel Quotidien
          </h2>
          <p className="text-xs text-slate-500">
            Généré dynamiquement selon vos objectifs annuels 2026.
          </p>
        </div>

        <Button
          variant="gold"
          size="md"
          onClick={handleSaveSuivi}
          icon={<Save className="w-4 h-4" />}
        >
          Enregistrer mon suivi
        </Button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* Date Selector Navigation Bar */}
      <DateSelector
        selectedDate={selectedDate}
        onDateChange={(newDate) => setSelectedDate(newDate)}
      />

      {/* Completion Indicator Card */}
      <Card variant="gradient" className="space-y-3 border-blue-200/80 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-400" />
            <h3 className="text-sm font-extrabold font-heading text-slate-900">
              Complétion du Journal du jour
            </h3>
          </div>
          <Badge variant={suiviRecord.completionScore === 100 ? "success" : "gold"} size="md">
            {completedBlocks} / {suiviRecord.totalBlocks} blocs remplis ({suiviRecord.completionScore}%)
          </Badge>
        </div>

        <LinearProgressBar
          value={suiviRecord.completionScore}
          colorVariant="blue"
          showValue={false}
        />
      </Card>

      {/* 1. Prière Personnelle Stopwatch Widget */}
      {config.prierePersonnelle.enabled && (
        <PrayerTimerWidget
          onPrayerRecorded={handlePrayerRecorded}
          currentMinutes={suiviRecord.entrees.prierePersonnelle?.minutes || 0}
          currentBurden={suiviRecord.entrees.prierePersonnelle?.burden || ""}
        />
      )}

      {/* Dynamic Cards Form Matching Active Objectives */}
      <DynamicDailyForm
        config={config}
        entries={suiviRecord.entrees}
        dateStr={selectedDate}
        onEntriesChange={handleEntriesChange}
      />

      {/* Bottom Save Action Button */}
      <div className="pt-4 flex justify-end">
        <Button
          variant="gold"
          size="lg"
          onClick={handleSaveSuivi}
          icon={<Save className="w-5 h-5" />}
        >
          Valider et enregistrer la journée
        </Button>
      </div>
    </div>
  );
}
