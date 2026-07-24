"use client";

import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import {
  Users,
  BookOpen,
  BookMarked,
  Heart,
  ShieldCheck,
  Gift,
  Headphones,
  Sparkles,
  CheckCircle2,
  Award,
  HelpCircle,
  Clock,
  Plus,
  Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FullObjectivesConfig, DailyTrackingEntriesData, TeachingItem } from "@/types";
import { saveCurrentBookTitle, getCurrentBookTitle } from "@/lib/suivi-service";

interface DynamicDailyFormProps {
  config: FullObjectivesConfig;
  entries: DailyTrackingEntriesData;
  dateStr: string;
  onEntriesChange: (updatedEntries: DailyTrackingEntriesData) => void;
}

export const DynamicDailyForm: React.FC<DynamicDailyFormProps> = ({
  config,
  entries,
  dateStr,
  onEntriesChange,
}) => {
  const currentDateObj = parseISO(dateStr);
  const dayNameFormatted = format(currentDateObj, "EEEE");
  const dayFrMap: Record<string, string> = {
    Monday: "Lundi",
    Tuesday: "Mardi",
    Wednesday: "Mercredi",
    Thursday: "Jeudi",
    Friday: "Vendredi",
    Saturday: "Samedi",
    Sunday: "Dimanche",
  };
  const currentDayFr = dayFrMap[dayNameFormatted] || dayNameFormatted;

  // Meditation time range states
  const [meditationStart, setMeditationStart] = useState("06:00");
  const [meditationEnd, setMeditationEnd] = useState("06:37");

  // Teaching input state
  const [newTeachingTitle, setNewTeachingTitle] = useState("");
  const [newTeachingSpeaker, setNewTeachingSpeaker] = useState("");

  const matchingPrayerEvents = config.priereDeGroupe.events.filter(
    (ev) => ev.dayOfWeek.toLowerCase() === currentDayFr.toLowerCase()
  );

  const updateEntries = (updater: (prev: DailyTrackingEntriesData) => DailyTrackingEntriesData) => {
    onEntriesChange(updater(entries));
  };

  const handleApplyMeditationTimeRange = () => {
    if (!meditationStart || !meditationEnd) return;
    const [sH, sM] = meditationStart.split(":").map(Number);
    const [eH, eM] = meditationEnd.split(":").map(Number);

    let diff = (eH * 60 + eM) - (sH * 60 + sM);
    if (diff <= 0) diff += 24 * 60;

    updateEntries((prev) => ({
      ...prev,
      meditation: { minutes: diff },
    }));
  };

  const handleAddTeaching = () => {
    if (!newTeachingTitle.trim()) return;

    const currentList = entries.enseignements?.teachingsList || [];
    const newItem: TeachingItem = {
      id: `teach-${Date.now()}`,
      title: newTeachingTitle.trim(),
      speaker: newTeachingSpeaker.trim() || "Pasteur / Enseignant",
    };

    const updatedList = [...currentList, newItem];
    updateEntries((prev) => ({
      ...prev,
      enseignements: {
        teachingsCount: updatedList.length,
        teachingsList: updatedList,
      },
    }));

    setNewTeachingTitle("");
    setNewTeachingSpeaker("");
  };

  const handleRemoveTeaching = (id: string) => {
    const currentList = entries.enseignements?.teachingsList || [];
    const updatedList = currentList.filter((item) => item.id !== id);
    updateEntries((prev) => ({
      ...prev,
      enseignements: {
        teachingsCount: updatedList.length,
        teachingsList: updatedList,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* 2. PRIÈRE DE GROUPE (Matching events today) */}
      {config.priereDeGroupe.enabled && matchingPrayerEvents.length > 0 && (
        <Card variant="gradient" className="space-y-4 border-amber-200/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900">
                Prière de Groupe & Rassemblements ({currentDayFr})
              </h3>
              <p className="text-xs text-slate-500">
                Validation de présence & horaires de participation aux événements du jour
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {matchingPrayerEvents.map((ev) => {
              const rawEntry = entries.priereDeGroupe?.[ev.id];
              const attended = typeof rawEntry === "object" ? rawEntry.participated : Boolean(rawEntry);
              const startTime = typeof rawEntry === "object" ? rawEntry.startTime || "22:00" : "22:00";
              const endTime = typeof rawEntry === "object" ? rawEntry.endTime || "04:30" : "04:30";

              return (
                <div key={ev.id} className="p-4 rounded-2xl bg-white border border-amber-200/80 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        As-tu participé à : {ev.name} ?
                      </p>
                      <p className="text-xs text-slate-500">
                        {ev.dayOfWeek} {ev.time ? `à ${ev.time}` : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateEntries((prev) => ({
                            ...prev,
                            priereDeGroupe: {
                              ...prev.priereDeGroupe,
                              [ev.id]: { participated: true, startTime, endTime },
                            },
                          }))
                        }
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          attended
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        Oui ✓
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateEntries((prev) => ({
                            ...prev,
                            priereDeGroupe: {
                              ...prev.priereDeGroupe,
                              [ev.id]: { participated: false, startTime: "", endTime: "" },
                            },
                          }))
                        }
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          !attended && rawEntry !== undefined
                            ? "bg-rose-600 text-white shadow-md"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        Non ✗
                      </button>
                    </div>
                  </div>

                  {/* If Oui: prompt for Start Time and End Time */}
                  {attended && (
                    <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-amber-50/50 p-3 rounded-xl">
                      <div>
                        <label className="block text-[11px] font-bold text-amber-900 mb-1">De quelle heure (Heure de début)</label>
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) =>
                            updateEntries((prev) => ({
                              ...prev,
                              priereDeGroupe: {
                                ...prev.priereDeGroupe,
                                [ev.id]: { participated: true, startTime: e.target.value, endTime },
                              },
                            }))
                          }
                          className="w-full p-2 bg-white border border-amber-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-amber-900 mb-1">À quelle heure (Heure de fin)</label>
                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) =>
                            updateEntries((prev) => ({
                              ...prev,
                              priereDeGroupe: {
                                ...prev.priereDeGroupe,
                                [ev.id]: { participated: true, startTime, endTime: e.target.value },
                              },
                            }))
                          }
                          className="w-full p-2 bg-white border border-amber-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* 3. LECTURE BIBLIQUE */}
      {config.lectureBiblique.enabled && (
        <Card variant="gradient" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900">
                  Lecture Biblique
                </h3>
                <p className="text-xs text-slate-500">
                  Objectif cible : {config.lectureBiblique.dailyChapters} chapitres par jour
                </p>
              </div>
            </div>

            {entries.lectureBiblique && entries.lectureBiblique.chaptersRead >= config.lectureBiblique.dailyChapters && (
              <Badge variant="success" size="sm">Objectif atteint !</Badge>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Combien de chapitres as-tu lus aujourd'hui ?
            </label>
            <input
              type="number"
              min={0}
              value={entries.lectureBiblique?.chaptersRead || 0}
              onChange={(e) =>
                updateEntries((prev) => ({
                  ...prev,
                  lectureBiblique: { chaptersRead: Number(e.target.value) },
                }))
              }
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-blue-900 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ex: 7 chapitres"
            />
          </div>
        </Card>
      )}

      {/* 4. MEDITATION WITH FLEXIBLE START/END TIME SELECTOR */}
      {config.meditation.enabled && (
        <Card variant="gradient" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700">
                <BookMarked className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900">
                  Méditation Spirituelle
                </h3>
                <p className="text-xs text-slate-500">
                  Objectif cible : {config.meditation.dailyMinutes} minutes par jour
                </p>
              </div>
            </div>
          </div>

          {/* Time range selector for Meditation */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-900">
              <Clock className="w-4 h-4 text-purple-600" />
              <span>Choisir l'heure de début et l'heure de fin (ex: 06:00 à 06:37)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Heure de début</label>
                <input
                  type="time"
                  value={meditationStart}
                  onChange={(e) => setMeditationStart(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Heure de fin</label>
                <input
                  type="time"
                  value={meditationEnd}
                  onChange={(e) => setMeditationEnd(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
                />
              </div>

              <Button variant="outline" size="sm" onClick={handleApplyMeditationTimeRange}>
                Calculer la durée
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Durée totale méditée aujourd'hui (Minutes)
            </label>
            <input
              type="number"
              min={0}
              value={entries.meditation?.minutes || 0}
              onChange={(e) =>
                updateEntries((prev) => ({
                  ...prev,
                  meditation: { minutes: Number(e.target.value) },
                }))
              }
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-purple-900 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </Card>
      )}

      {/* 5. EVANGELISATION */}
      {config.evangelisation.enabled && (
        <Card variant="gradient" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900">
                Évangélisation & Témoignage
              </h3>
              <p className="text-xs text-slate-500">
                Partage de la foi et de l'Évangile
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Combien de personnes as-tu évangélisées aujourd'hui ?
              </label>
              <input
                type="number"
                min={0}
                value={entries.evangelisation?.peopleCount || 0}
                onChange={(e) =>
                  updateEntries((prev) => ({
                    ...prev,
                    evangelisation: {
                      ...prev.evangelisation,
                      peopleCount: Number(e.target.value),
                    },
                  }))
                }
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {config.evangelisation.trackTracts && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  As-tu distribué des traités ?
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateEntries((prev) => ({
                        ...prev,
                        evangelisation: {
                          ...prev.evangelisation,
                          tractsDistributed: true,
                          peopleCount: prev.evangelisation?.peopleCount || 0,
                        },
                      }))
                    }
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold ${
                      entries.evangelisation?.tractsDistributed
                        ? "bg-emerald-600 text-white"
                        : "bg-white border border-slate-200 text-slate-700"
                    }`}
                  >
                    Oui ✓
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateEntries((prev) => ({
                        ...prev,
                        evangelisation: {
                          ...prev.evangelisation,
                          tractsDistributed: false,
                          peopleCount: prev.evangelisation?.peopleCount || 0,
                        },
                      }))
                    }
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold ${
                      entries.evangelisation?.tractsDistributed === false
                        ? "bg-rose-600 text-white"
                        : "bg-white border border-slate-200 text-slate-700"
                    }`}
                  >
                    Non ✗
                  </button>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* 6. LITTERATURE CHRETIENNE */}
      {config.litteratureChretienne.enabled && (
        <Card variant="gradient" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900">
                Littérature Chrétienne
              </h3>
              <p className="text-xs text-slate-500">
                Lectures d'ouvrages et livres d'édification
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Combien de pages as-tu lues aujourd'hui ?
              </label>
              <input
                type="number"
                min={0}
                value={entries.litteratureChretienne?.pagesRead || 0}
                onChange={(e) =>
                  updateEntries((prev) => ({
                    ...prev,
                    litteratureChretienne: {
                      ...prev.litteratureChretienne,
                      pagesRead: Number(e.target.value),
                    },
                  }))
                }
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-amber-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Titre du livre en cours (mémorisé)
              </label>
              <input
                type="text"
                value={entries.litteratureChretienne?.currentBookTitle || getCurrentBookTitle()}
                onChange={(e) => {
                  const title = e.target.value;
                  saveCurrentBookTitle(title);
                  updateEntries((prev) => ({
                    ...prev,
                    litteratureChretienne: {
                      ...prev.litteratureChretienne,
                      currentBookTitle: title,
                      pagesRead: prev.litteratureChretienne?.pagesRead || 0,
                    },
                  }));
                }}
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none"
              />
            </div>
          </div>
        </Card>
      )}

      {/* 7. ENSEIGNEMENTS WITH TITLE AND SPEAKER INPUTS */}
      {config.enseignements.enabled && (
        <Card variant="gradient" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-700">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900">Enseignements Écoutés</h3>
                <p className="text-xs text-slate-500">Enregistrez les prédications, le nom de l'enseignant et le titre</p>
              </div>
            </div>

            <Badge variant="info" size="sm">
              {entries.enseignements?.teachingsList?.length || entries.enseignements?.teachingsCount || 0} écouté(s)
            </Badge>
          </div>

          {/* Add Teaching Form */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-sky-900 mb-1">Titre de l'enseignement</label>
                <input
                  type="text"
                  value={newTeachingTitle}
                  onChange={(e) => setNewTeachingTitle(e.target.value)}
                  placeholder="Ex: La pratique de l'intercession"
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-sky-900 mb-1">Nom de l'enseignant / Prédicateur</label>
                <input
                  type="text"
                  value={newTeachingSpeaker}
                  onChange={(e) => setNewTeachingSpeaker(e.target.value)}
                  placeholder="Ex: Pasteur ZTF / Watchman Nee"
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <Button variant="gold" size="sm" onClick={handleAddTeaching} icon={<Plus className="w-4 h-4" />}>
              Ajouter cet enseignement
            </Button>
          </div>

          {/* Enseignements List */}
          {entries.enseignements?.teachingsList && entries.enseignements.teachingsList.length > 0 && (
            <div className="space-y-2 pt-1">
              {entries.enseignements.teachingsList.map((t, idx) => (
                <div key={t.id} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900">{idx + 1}. {t.title}</p>
                    <p className="text-[11px] text-sky-800 font-medium">Enseignant : {t.speaker}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveTeaching(t.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* 8. CARACTERE & DISCIPLINE */}
      {config.caractere.enabled && config.caractere.axes.length > 0 && (
        <Card variant="gradient" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900">
                Caractère & Discipline Personnelle
              </h3>
              <p className="text-xs text-slate-500">
                Suivi de vos axes de progrès choisis
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {config.caractere.axes.map((ax) => {
              const currentValue = entries.caractere?.[ax.id]?.value ?? "";
              return (
                <div key={ax.id} className="p-3.5 rounded-xl bg-white border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-900">{ax.name}</span>
                    <span className="text-[11px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                      Cible : {ax.targetGoal}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={currentValue as string}
                    onChange={(e) =>
                      updateEntries((prev) => ({
                        ...prev,
                        caractere: {
                          ...prev.caractere,
                          [ax.id]: { value: e.target.value },
                        },
                      }))
                    }
                    placeholder={`Saisissez vos accomplissements pour ${ax.name}...`}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white"
                  />
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};
