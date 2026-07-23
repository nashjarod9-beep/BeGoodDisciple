"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Clock, Save, Sparkles, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

interface PrayerTimerWidgetProps {
  onPrayerRecorded: (minutes: number, burden: string) => void;
  currentMinutes?: number;
  currentBurden?: string;
}

export const PrayerTimerWidget: React.FC<PrayerTimerWidgetProps> = ({
  onPrayerRecorded,
  currentMinutes = 0,
  currentBurden = "",
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [burden, setBurden] = useState(currentBurden);
  const [manualMinutes, setManualMinutes] = useState<number | string>(currentMinutes || "");

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
    if (seconds > 5) {
      setSaveModalOpen(true);
    } else {
      setSeconds(0);
    }
  };

  const handleConfirmSave = () => {
    const elapsedMinutes = Math.max(1, Math.round(seconds / 60));
    const totalMins = (currentMinutes || 0) + elapsedMinutes;
    onPrayerRecorded(totalMins, burden);
    setSaveModalOpen(false);
    setSeconds(0);
  };

  const handleManualSave = () => {
    const mins = Number(manualMinutes) || 0;
    onPrayerRecorded(mins, burden);
  };

  return (
    <>
      <Card variant="gradient" className="border-blue-200/80 shadow-lg shadow-blue-950/5 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left info */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-900">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Chronomètre de Prière Personnelle</span>
            </div>
            <h3 className="text-xl font-extrabold font-heading text-slate-900">
              Session de Prière Interactive
            </h3>
            <p className="text-xs text-slate-500">
              Lancez le chrono pour mesurer automatiquement votre temps d'intimité spirituelle.
            </p>
          </div>

          {/* Digital Timer Display & Controls */}
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
                  Arrêter
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Manual Input Fallback & Burden Record */}
        <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Temps total de prière du jour (Minutes)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min={0}
                value={manualMinutes}
                onChange={(e) => setManualMinutes(e.target.value)}
                onBlur={handleManualSave}
                placeholder="ex: 45 min"
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-blue-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Principal fardeau / sujet de prière du jour
            </label>
            <input
              type="text"
              value={burden}
              onChange={(e) => setBurden(e.target.value)}
              onBlur={handleManualSave}
              placeholder="ex: Intersession pour la jeunesse & direction spirituelle"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* STOP POPUP MODAL REQUIRED BY PROMPT */}
      <Modal
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        title="Enregistrer ce temps de prière ?"
        subtitle={`Session mesurée : ${Math.max(1, Math.round(seconds / 60))} minute(s)`}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => { setSaveModalOpen(false); setSeconds(0); }}>
              Non, ignorer
            </Button>
            <Button variant="gold" size="sm" onClick={handleConfirmSave} icon={<Save className="w-4 h-4" />}>
              Oui, enregistrer
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Félicitations pour ce temps passé dans la présence de Dieu ! Souhaitez-vous inscrire cette session dans votre suivi du jour ?
          </p>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
              Quel a été votre principal fardeau / sujet de prière pendant ce temps ?
            </label>
            <textarea
              rows={3}
              value={burden}
              onChange={(e) => setBurden(e.target.value)}
              placeholder="Inscrivez votre sujet de prière..."
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
