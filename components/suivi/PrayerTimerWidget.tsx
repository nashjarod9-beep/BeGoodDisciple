"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Clock, Save, Sparkles, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PrayerBurdenItem } from "@/types";

interface PrayerTimerWidgetProps {
  onPrayerRecorded: (minutes: number, burdensList: PrayerBurdenItem[], mainBurden: string) => void;
  currentMinutes?: number;
  currentBurdensList?: PrayerBurdenItem[];
  currentMainBurden?: string;
}

export const PrayerTimerWidget: React.FC<PrayerTimerWidgetProps> = ({
  onPrayerRecorded,
  currentMinutes = 0,
  currentBurdensList = [],
  currentMainBurden = "",
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [newBurdenSubject, setNewBurdenSubject] = useState("");
  
  // List of burden lines (up to 5+)
  const [burdensList, setBurdensList] = useState<PrayerBurdenItem[]>(
    currentBurdensList.length > 0
      ? currentBurdensList
      : currentMainBurden
      ? [{ id: "burden-1", subject: currentMainBurden, durationMinutes: currentMinutes }]
      : []
  );

  // Time range calculation fields (Start/End time selector)
  const [startTime, setStartTime] = useState("10:15");
  const [endTime, setEndTime] = useState("10:23");
  const [rangeSubject, setRangeSubject] = useState("");

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const formatTime = (secTotal: number) => {
    const hrs = Math.floor(secTotal / 3600);
    const mins = Math.floor((secTotal % 3600) / 60);
    const secs = secTotal % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleStop = () => {
    setIsActive(false);
    if (seconds > 3) {
      setSaveModalOpen(true);
    } else {
      setSeconds(0);
    }
  };

  // Helper to sync changes to parent
  const syncToParent = (newList: PrayerBurdenItem[]) => {
    const totalMins = newList.reduce((sum, item) => sum + (item.durationMinutes || 0), 0);
    const mainBurdenStr = newList.map((b) => b.subject).filter(Boolean).join(" ; ");
    onPrayerRecorded(totalMins, newList, mainBurdenStr);
  };

  // Confirm save from Stopwatch popup modal
  const handleConfirmSaveFromStopwatch = () => {
    const elapsedMinutes = Math.max(1, Math.round(seconds / 60));
    const newItem: PrayerBurdenItem = {
      id: `burden-${Date.now()}`,
      subject: newBurdenSubject.trim() || `Session de prière (${elapsedMinutes} min)`,
      durationMinutes: elapsedMinutes,
    };

    const updatedList = [...burdensList, newItem];
    setBurdensList(updatedList);
    syncToParent(updatedList);

    setSaveModalOpen(false);
    setSeconds(0);
    setNewBurdenSubject("");
  };

  // Add manual Start Time to End Time range (e.g. 10:15 to 10:23)
  const handleAddRangeByTime = () => {
    if (!startTime || !endTime) return;

    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);

    let diffMins = (endH * 60 + endM) - (startH * 60 + startM);
    if (diffMins <= 0) diffMins += 24 * 60; // Cross midnight edge case

    const newItem: PrayerBurdenItem = {
      id: `burden-${Date.now()}`,
      subject: rangeSubject.trim() || `Prière de ${startTime} à ${endTime}`,
      durationMinutes: diffMins,
      timeRange: `${startTime} - ${endTime}`,
    };

    const updatedList = [...burdensList, newItem];
    setBurdensList(updatedList);
    syncToParent(updatedList);
    setRangeSubject("");
  };

  // Add a blank new line of prayer burden (up to 5+)
  const handleAddBlankBurdenLine = () => {
    if (burdensList.length >= 8) return;
    const newItem: PrayerBurdenItem = {
      id: `burden-${Date.now()}`,
      subject: "",
      durationMinutes: 15,
    };
    const updatedList = [...burdensList, newItem];
    setBurdensList(updatedList);
    syncToParent(updatedList);
  };

  const handleUpdateBurdenLine = (id: string, field: "subject" | "durationMinutes", value: any) => {
    const updatedList = burdensList.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setBurdensList(updatedList);
    syncToParent(updatedList);
  };

  const handleRemoveBurdenLine = (id: string) => {
    const updatedList = burdensList.filter((item) => item.id !== id);
    setBurdensList(updatedList);
    syncToParent(updatedList);
  };

  const totalCalculatedMinutes = burdensList.reduce((sum, item) => sum + (Number(item.durationMinutes) || 0), 0);

  return (
    <>
      <Card variant="gradient" className="border-blue-200/80 shadow-lg shadow-blue-950/5 relative overflow-hidden space-y-6">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header & Digital Stopwatch */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-900">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Chronomètre & Lignes de Prière Multiples</span>
            </div>
            <h3 className="text-xl font-extrabold font-heading text-slate-900">
              Prière Personnelle Interactive
            </h3>
            <p className="text-xs text-slate-500">
              Cumulez automatiquement vos sessions avec le chrono ou choisissez vos heures de début et fin.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-amber-300 font-mono text-3xl font-extrabold px-6 py-2.5 rounded-2xl border border-blue-900/60 shadow-inner tracking-widest">
              {formatTime(seconds)}
            </div>

            <div className="flex items-center gap-2">
              {!isActive ? (
                <Button
                  variant="gold"
                  size="sm"
                  onClick={handleStart}
                  icon={<Play className="w-4 h-4 fill-blue-950" />}
                >
                  {seconds > 0 ? "Reprendre" : "Démarrer la prière"}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePause}
                  icon={<Pause className="w-4 h-4" />}
                >
                  Pause
                </Button>
              )}

              {(isActive || seconds > 0) && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleStop}
                  icon={<Square className="w-4 h-4 fill-white" />}
                >
                  Arrêter & Enregistrer
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 1. FLEXIBLE START TIME TO END TIME SELECTOR */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Saisie par plage horaire (Heure de début et Heure de fin)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Début</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Fin</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Sujet / Fardeau (Optionnel)</label>
              <input
                type="text"
                value={rangeSubject}
                onChange={(e) => setRangeSubject(e.target.value)}
                placeholder="Ex: Intercession cellule"
                className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button variant="secondary" size="sm" onClick={handleAddRangeByTime} icon={<Plus className="w-4 h-4" />}>
              Ajouter cette plage
            </Button>
          </div>
        </div>

        {/* 2. MULTIPLE PRAYER BURDEN LINES LIST (UP TO 5+) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Lignes de Fardeaux de Prière ({burdensList.length} enregistrée(s) • Total : {totalCalculatedMinutes} min)
            </h4>
            <Button variant="outline" size="sm" onClick={handleAddBlankBurdenLine} icon={<Plus className="w-3.5 h-3.5" />}>
              + Ajouter une ligne de fardeau
            </Button>
          </div>

          {burdensList.length === 0 ? (
            <div className="p-4 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
              Aucune ligne de prière enregistrée aujourd'hui. Lancez le chrono ci-dessus ou ajoutez une ligne.
            </div>
          ) : (
            <div className="space-y-2">
              {burdensList.map((item, idx) => (
                <div key={item.id} className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>

                  <input
                    type="text"
                    value={item.subject}
                    onChange={(e) => handleUpdateBurdenLine(item.id, "subject", e.target.value)}
                    placeholder="Sujet / fardeau de prière..."
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      value={item.durationMinutes}
                      onChange={(e) => handleUpdateBurdenLine(item.id, "durationMinutes", Number(e.target.value))}
                      className="w-20 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-blue-900 text-center outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-500 font-semibold">min</span>

                    <button
                      onClick={() => handleRemoveBurdenLine(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Supprimer la ligne"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* STOP POPUP MODAL */}
      <Modal
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        title="Enregistrer ce temps de prière ?"
        subtitle={`Durée mesurée : ${Math.max(1, Math.round(seconds / 60))} minute(s)`}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => { setSaveModalOpen(false); setSeconds(0); }}>
              Ignorer
            </Button>
            <Button variant="gold" size="sm" onClick={handleConfirmSaveFromStopwatch} icon={<Save className="w-4 h-4" />}>
              Enregistrer le fardeau
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            Félicitations pour cette session de prière ! Indiquez le sujet de cette session ci-dessous pour l'ajouter automatiquement à vos lignes de prière du jour.
          </p>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
              Quel a été votre fardeau / sujet de prière principal ?
            </label>
            <textarea
              rows={3}
              value={newBurdenSubject}
              onChange={(e) => setNewBurdenSubject(e.target.value)}
              placeholder="Ex: Intercession pour la santé de maman & réveil spirituel..."
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
