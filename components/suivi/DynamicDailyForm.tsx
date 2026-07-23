"use client";

import React from "react";
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
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FullObjectivesConfig, DailyTrackingEntriesData } from "@/types";
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

  // Matching group prayer events for today
  const matchingPrayerEvents = config.priereDeGroupe.events.filter(
    (ev) => ev.dayOfWeek.toLowerCase() === currentDayFr.toLowerCase()
  );

  const updateEntries = (updater: (prev: DailyTrackingEntriesData) => DailyTrackingEntriesData) => {
    onEntriesChange(updater(entries));
  };

  return (
    <div className="space-y-6">
      {/* 2. PRIÈRE DE GROUPE (Only shown if matching events today) */}
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
                Validation de présence pour les programmes du jour
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {matchingPrayerEvents.map((ev) => {
              const attended = entries.priereDeGroupe?.[ev.id] || false;
              return (
                <div
                  key={ev.id}
                  className="p-3.5 rounded-xl bg-white border border-amber-200/60 flex items-center justify-between"
                >
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
                            [ev.id]: true,
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
                            [ev.id]: false,
                          },
                        }))
                      }
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        !attended && entries.priereDeGroupe?.[ev.id] === false
                          ? "bg-rose-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      Non ✗
                    </button>
                  </div>
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
              placeholder="ex: 4 chapitres"
            />
          </div>
        </Card>
      )}

      {/* 4. MEDITATION */}
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Combien de temps as-tu médité aujourd'hui ? (en minutes)
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
              placeholder="ex: 15 min"
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

      {/* 7. CARACTERE & DISCIPLINE */}
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

      {/* 8. OBJECTIFS SUR-MESURE */}
      {config.custom.enabled && config.custom.items.length > 0 && (
        <Card variant="gradient" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900">
                Objectifs Personnalisés Sur-Mesure
              </h3>
              <p className="text-xs text-slate-500">
                Questions sur-mesure définies dans vos objectifs
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {config.custom.items.map((item) => {
              const val = entries.custom?.[item.id]?.value;
              return (
                <div key={item.id} className="p-3.5 rounded-xl bg-white border border-slate-200/80 space-y-2">
                  <p className="text-xs font-bold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-600 font-medium">{item.question}</p>

                  {item.responseType === "boolean" && (
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          updateEntries((prev) => ({
                            ...prev,
                            custom: {
                              ...prev.custom,
                              [item.id]: { value: true },
                            },
                          }))
                        }
                        className={`px-4 py-2 rounded-xl text-xs font-bold ${
                          val === true
                            ? "bg-emerald-600 text-white"
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
                            custom: {
                              ...prev.custom,
                              [item.id]: { value: false },
                            },
                          }))
                        }
                        className={`px-4 py-2 rounded-xl text-xs font-bold ${
                          val === false
                            ? "bg-rose-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        Non ✗
                      </button>
                    </div>
                  )}

                  {item.responseType === "number" && (
                    <input
                      type="number"
                      value={(val as number) || 0}
                      onChange={(e) =>
                        updateEntries((prev) => ({
                          ...prev,
                          custom: {
                            ...prev.custom,
                            [item.id]: { value: Number(e.target.value) },
                          },
                        }))
                      }
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                    />
                  )}

                  {item.responseType === "text" && (
                    <input
                      type="text"
                      value={(val as string) || ""}
                      onChange={(e) =>
                        updateEntries((prev) => ({
                          ...prev,
                          custom: {
                            ...prev.custom,
                            [item.id]: { value: e.target.value },
                          },
                        }))
                      }
                      placeholder="Votre réponse..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* OTHER ACTIVE CATEGORY BLOCS */}
      {config.visitesPastorales.enabled && (
        <Card variant="gradient" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900">Visites Pastorales & Fraternelles</h3>
              <p className="text-xs text-slate-500">Objectif mensuel : {config.visitesPastorales.monthlyVisitsCount} visites</p>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Combien de visites pastorales/fraternelles as-tu effectuées aujourd'hui ?
            </label>
            <input
              type="number"
              min={0}
              value={entries.visitesPastorales?.visitsCount || 0}
              onChange={(e) =>
                updateEntries((prev) => ({
                  ...prev,
                  visitesPastorales: { visitsCount: Number(e.target.value) },
                }))
              }
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-rose-900 outline-none"
            />
          </div>
        </Card>
      )}

      {config.enseignements.enabled && (
        <Card variant="gradient" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-700">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900">Enseignements Écoutés</h3>
              <p className="text-xs text-slate-500">Objectif hebdo : {config.enseignements.weeklyTeachingsCount} prédications</p>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Combien d'enseignements/prédications as-tu écoutés aujourd'hui ?
            </label>
            <input
              type="number"
              min={0}
              value={entries.enseignements?.teachingsCount || 0}
              onChange={(e) =>
                updateEntries((prev) => ({
                  ...prev,
                  enseignements: { teachingsCount: Number(e.target.value) },
                }))
              }
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-sky-900 outline-none"
            />
          </div>
        </Card>
      )}
    </div>
  );
};
