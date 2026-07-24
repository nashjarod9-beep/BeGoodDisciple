"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Users,
  BookOpen,
  BookMarked,
  Heart,
  Award,
  Gift,
  ShieldCheck,
  Headphones,
  Plus,
  Trash2,
  HelpCircle,
  Flame,
  Dumbbell,
  Briefcase,
  DollarSign,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { saveAnnualObjectivesConfig } from "@/lib/objectifs-service";
import {
  FullObjectivesConfig,
  GroupPrayerEvent,
  CharacterAxis,
  CustomGoalItem,
} from "@/types";

interface ObjectivesWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialConfig: FullObjectivesConfig;
  onSaved: (newVersion: number) => void;
}

export const ObjectivesWizardModal: React.FC<ObjectivesWizardModalProps> = ({
  isOpen,
  onClose,
  initialConfig,
  onSaved,
}) => {
  const [showIntroGuide, setShowIntroGuide] = useState(true);
  const [step, setStep] = useState<number>(1);
  const [config, setConfig] = useState<FullObjectivesConfig>(initialConfig);

  // Temporary inputs for list adders
  const [newEventName, setNewEventName] = useState("");
  const [newEventDay, setNewEventDay] = useState("Vendredi");
  const [newEventTime, setNewEventTime] = useState("20h00");

  const [newAxisName, setNewAxisName] = useState("");
  const [newAxisGoal, setNewAxisGoal] = useState("");

  const [customTitle, setCustomTitle] = useState("");
  const [customQuestion, setCustomQuestion] = useState("");
  const [customFreq, setCustomFreq] = useState<"daily" | "weekly">("daily");
  const [customRespType, setCustomRespType] = useState<"boolean" | "number" | "text">("boolean");

  if (!isOpen) return null;

  const totalSteps = 13;

  const handleAddGroupEvent = () => {
    if (!newEventName.trim()) return;
    const newEv: GroupPrayerEvent = {
      id: `ev-${Date.now()}`,
      name: newEventName,
      dayOfWeek: newEventDay,
      time: newEventTime,
    };
    setConfig({
      ...config,
      priereDeGroupe: {
        ...config.priereDeGroupe,
        events: [...config.priereDeGroupe.events, newEv],
      },
    });
    setNewEventName("");
  };

  const handleRemoveGroupEvent = (id: string) => {
    setConfig({
      ...config,
      priereDeGroupe: {
        ...config.priereDeGroupe,
        events: config.priereDeGroupe.events.filter((e) => e.id !== id),
      },
    });
  };

  const handleAddCharacterAxis = () => {
    if (!newAxisName.trim()) return;
    const newAx: CharacterAxis = {
      id: `ax-${Date.now()}`,
      name: newAxisName,
      targetGoal: newAxisGoal || "Objectif défini",
    };
    setConfig({
      ...config,
      caractere: {
        ...config.caractere,
        axes: [...config.caractere.axes, newAx],
      },
    });
    setNewAxisName("");
    setNewAxisGoal("");
  };

  const handleRemoveCharacterAxis = (id: string) => {
    setConfig({
      ...config,
      caractere: {
        ...config.caractere,
        axes: config.caractere.axes.filter((a) => a.id !== id),
      },
    });
  };

  const handleSaveConfig = () => {
    const res = saveAnnualObjectivesConfig(config, 2026);
    if (res.success) {
      onSaved(res.version);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Guide de Configuration des Objectifs 2026"
      subtitle="Parcours d'élaboration spirituelle (ÊTRE & FAIRE)"
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* INTRODUCTORY GUIDE SCREEN */}
        {showIntroGuide ? (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 fill-amber-300" />
                <span>Guide Méthodologique BeGoodDisciple</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-heading">
                Comment établir vos objectifs de l'année de A à Z ?
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Ce parcours vous guide pas à pas à travers les 2 grandes parties du discipolat chrétien : <strong>PARTIE I (L'ÊTRE - Caractère & Esprit)</strong> et <strong>PARTIE II (LE FAIRE - Discipline, Prière, Jeûne, Finances, Projets)</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2">
                <Badge variant="gold" size="sm">PARTIE I — L'ÊTRE</Badge>
                <h4 className="text-sm font-bold font-heading text-slate-900">Ressembler à Christ</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Revêtement du Fruit de l'Esprit, abandon des 3 vices (bavardage, procrastination, sommeil), connaissance de Dieu et louange.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2">
                <Badge variant="info" size="sm">PARTIE II — LE FAIRE</Badge>
                <h4 className="text-sm font-bold font-heading text-slate-900">Discipline & Projets</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Prière (1h30/j), Lecture biblique (7 chap/j), Jeûne, Mémorisation, Finances, Galates 6 et vos Projets 2026.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="gold"
                size="lg"
                onClick={() => setShowIntroGuide(false)}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Démarrer la configuration
              </Button>
            </div>
          </div>
        ) : (
          /* STEP CONFIGURATION CONTENT */
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                <span>Étape {step} sur {totalSteps}</span>
                <span className="text-blue-950 font-bold">{Math.round((step / totalSteps) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-amber-400 transition-all duration-300"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* STEP 1: PARTIE I - ÊTRE & CARACTÈRE */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-900 text-amber-400">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">Étape 1. PARTIE I — L'ÊTRE : Fruit de l'Esprit & Caractère</h4>
                    <p className="text-xs text-slate-500">Formulez vos objectifs de transformation intérieure</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-blue-900 mb-1.5">
                      A. Revêtement du Fruit de l'Esprit (Galates 5:22-23)
                    </label>
                    <input
                      type="text"
                      value={config.etreCaractere?.fruitEsprit || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          etreCaractere: {
                            ...(config.etreCaractere || {}),
                            fruitEsprit: e.target.value,
                            enabled: true,
                            vicesToAbandon: config.etreCaractere?.vicesToAbandon || [],
                            godKnowledgeGoal: config.etreCaractere?.godKnowledgeGoal || "",
                            personalMinistryWorship: config.etreCaractere?.personalMinistryWorship || "",
                            commonMinistryGifts: config.etreCaractere?.commonMinistryGifts || [],
                          },
                        })
                      }
                      placeholder="Ex: Fidélité, discipline, douceur, maîtrise de soi..."
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
                    <label className="block text-xs font-bold uppercase tracking-wider text-rose-900 mb-1.5">
                      B. Abandon des Vices / Caractères à enlever
                    </label>
                    <input
                      type="text"
                      value={config.etreCaractere?.vicesToAbandon?.join(", ") || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          etreCaractere: {
                            ...(config.etreCaractere || {}),
                            vicesToAbandon: e.target.value.split(",").map((s) => s.trim()),
                            enabled: true,
                            fruitEsprit: config.etreCaractere?.fruitEsprit || "",
                            godKnowledgeGoal: config.etreCaractere?.godKnowledgeGoal || "",
                            personalMinistryWorship: config.etreCaractere?.personalMinistryWorship || "",
                            commonMinistryGifts: config.etreCaractere?.commonMinistryGifts || [],
                          },
                        })
                      }
                      placeholder="Ex: Bavardage (Prov 10:19), Procrastination (Eccl 3:1), Amour du sommeil (Prov 20:13)"
                      className="w-full p-3 bg-white border border-rose-200 rounded-xl text-xs outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        C. Connaissance de Dieu
                      </label>
                      <input
                        type="text"
                        value={config.etreCaractere?.godKnowledgeGoal || ""}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            etreCaractere: {
                              ...(config.etreCaractere || {}),
                              godKnowledgeGoal: e.target.value,
                              enabled: true,
                              fruitEsprit: config.etreCaractere?.fruitEsprit || "",
                              vicesToAbandon: config.etreCaractere?.vicesToAbandon || [],
                              personalMinistryWorship: config.etreCaractere?.personalMinistryWorship || "",
                              commonMinistryGifts: config.etreCaractere?.commonMinistryGifts || [],
                            },
                          })
                        }
                        placeholder="Ex: Connaître Dieu comme mon Père qui m'exauce..."
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs outline-none"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        D. Ministère personnel (Louange & Actions de grâce)
                      </label>
                      <input
                        type="text"
                        value={config.etreCaractere?.personalMinistryWorship || ""}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            etreCaractere: {
                              ...(config.etreCaractere || {}),
                              personalMinistryWorship: e.target.value,
                              enabled: true,
                              fruitEsprit: config.etreCaractere?.fruitEsprit || "",
                              vicesToAbandon: config.etreCaractere?.vicesToAbandon || [],
                              godKnowledgeGoal: config.etreCaractere?.godKnowledgeGoal || "",
                              commonMinistryGifts: config.etreCaractere?.commonMinistryGifts || [],
                            },
                          })
                        }
                        placeholder="Ex: Développer l'action de grâce et chanter longtemps..."
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: PRIERE PERSONNELLE */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-700">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">Étape 2. Prière Personnelle</h4>
                    <p className="text-xs text-slate-500">Temps d'intimité spirituelle et nuits de prière</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Objectif quotidien (en minutes)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={config.prierePersonnelle.dailyMinutes}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            prierePersonnelle: {
                              ...config.prierePersonnelle,
                              dailyMinutes: Number(e.target.value),
                            },
                          })
                        }
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-blue-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Formulation d'objectif spécifique (Nuits, créneaux)
                      </label>
                      <input
                        type="text"
                        value={config.prierePersonnelle.customNotes || ""}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            prierePersonnelle: {
                              ...config.prierePersonnelle,
                              customNotes: e.target.value,
                            },
                          })
                        }
                        placeholder="Ex: 1h30 par jour + 2 nuits de prière par mois"
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PRIERE DE GROUPE */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-700">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">Étape 3. Prière de Groupe</h4>
                    <p className="text-xs text-slate-500">Ajoutez et modifiez vos programmes récurrents</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {config.priereDeGroupe.events.map((ev) => (
                    <div key={ev.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{ev.name}</p>
                        <p className="text-xs text-slate-500">{ev.dayOfWeek} {ev.time ? `à ${ev.time}` : ""}</p>
                      </div>
                      <button onClick={() => handleRemoveGroupEvent(ev.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-900">Ajouter un programme</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Nom (ex: Nuit de prière)"
                      value={newEventName}
                      onChange={(e) => setNewEventName(e.target.value)}
                      className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                    />
                    <select
                      value={newEventDay}
                      onChange={(e) => setNewEventDay(e.target.value)}
                      className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                    >
                      <option value="Lundi">Lundi</option>
                      <option value="Mardi">Mardi</option>
                      <option value="Mercredi">Mercredi</option>
                      <option value="Jeudi">Jeudi</option>
                      <option value="Vendredi">Vendredi</option>
                      <option value="Samedi">Samedi</option>
                      <option value="Dimanche">Dimanche</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Heure (ex: 20h00)"
                      value={newEventTime}
                      onChange={(e) => setNewEventTime(e.target.value)}
                      className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                    />
                  </div>
                  <Button variant="secondary" size="sm" onClick={handleAddGroupEvent} icon={<Plus className="w-4 h-4" />}>
                    Ajouter ce rendez-vous
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: LECTURE BIBLIQUE & MÉDITATION */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-700">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">Étape 4. Lecture Biblique & Méditation</h4>
                    <p className="text-xs text-slate-500">Chapitres quotidiens et temps de méditation</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Chapitres par jour (ex: 7 chap/jour = 210/mois)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={config.lectureBiblique.dailyChapters}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          lectureBiblique: {
                            ...config.lectureBiblique,
                            dailyChapters: Number(e.target.value),
                            weeklyChapters: Number(e.target.value) * 7,
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-blue-900 outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Méditation quotidienne (Minutes)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={config.meditation.dailyMinutes}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          meditation: {
                            ...config.meditation,
                            dailyMinutes: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-purple-900 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: JEÛNE & CROISADE */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-700">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">Étape 5. Jeûne & Prière Prolongée</h4>
                    <p className="text-xs text-slate-500">Programmation des temps de jeûne complets et partiels</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Jeûnes complets de 3 jours
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={config.jeune?.full3DayFastsCount || 8}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          jeune: {
                            ...(config.jeune || { enabled: true, full3DayFastsCount: 8, partial100DayFast: true, crusadeDaysCount: 7 }),
                            full3DayFastsCount: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-amber-900 outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Jours de Croisade
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={config.jeune?.crusadeDaysCount || 7}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          jeune: {
                            ...(config.jeune || { enabled: true, full3DayFastsCount: 8, partial100DayFast: true, crusadeDaysCount: 7 }),
                            crusadeDaysCount: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-amber-900 outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Jeûne partiel de 100 jours</span>
                    <input
                      type="checkbox"
                      checked={config.jeune?.partial100DayFast ?? true}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          jeune: {
                            ...(config.jeune || { enabled: true, full3DayFastsCount: 8, partial100DayFast: true, crusadeDaysCount: 7 }),
                            partial100DayFast: e.target.checked,
                          },
                        })
                      }
                      className="w-5 h-5 accent-amber-600 rounded cursor-pointer mt-2"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: MÉMORISATION DE LA PAROLE */}
            {step === 6 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-700">
                    <BookMarked className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">Étape 6. Mémorisation de la Parole</h4>
                    <p className="text-xs text-slate-500">Nombre de versets par semaine & livre cible</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Versets par semaine
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={config.memorisation?.versesPerWeek || 2}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          memorisation: {
                            ...(config.memorisation || { enabled: true, versesPerWeek: 2, targetBook: "Épître aux Philippiens" }),
                            versesPerWeek: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-blue-900 outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Livre cible
                    </label>
                    <input
                      type="text"
                      value={config.memorisation?.targetBook || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          memorisation: {
                            ...(config.memorisation || { enabled: true, versesPerWeek: 2, targetBook: "Épître aux Philippiens" }),
                            targetBook: e.target.value,
                          },
                        })
                      }
                      placeholder="Ex: Épître de Paul aux Philippiens (104 versets)"
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: ÉVANGÉLISATION & ÂMES */}
            {step === 7 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">Étape 7. Évangélisation, Traités & Âmes</h4>
                    <p className="text-xs text-slate-500">Nombre de personnes abordées, traités et disciples gagnés</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Personnes / semaine
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={config.evangelisation.weeklyPeopleCount}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          evangelisation: {
                            ...config.evangelisation,
                            weeklyPeopleCount: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-emerald-900 outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Traités à distribuer
                    </label>
                    <input
                      type="number"
                      min={10}
                      value={config.evangelisation.plannedTractsCount || 500}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          evangelisation: {
                            ...config.evangelisation,
                            plannedTractsCount: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-emerald-900 outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Âmes gagnées & baptisées
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={config.evangelisation.soulsTargetCount || 5}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          evangelisation: {
                            ...config.evangelisation,
                            soulsTargetCount: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-emerald-900 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: LITTÉRATURE CHRÉTIENNE */}
            {step === 8 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-700">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">Étape 8. Littérature Chrétienne</h4>
                    <p className="text-xs text-slate-500">Nombre de livres & pages par semaine</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Pages par semaine
                    </label>
                    <input
                      type="number"
                      min={10}
                      value={config.litteratureChretienne.weeklyPagesCount}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          litteratureChretienne: {
                            ...config.litteratureChretienne,
                            weeklyPagesCount: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-amber-900 outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Objectif nombre de livres par an
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={config.litteratureChretienne.booksCountTarget || 15}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          litteratureChretienne: {
                            ...config.litteratureChretienne,
                            booksCountTarget: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-amber-900 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 9: RETRAITES SPIRITUELLES */}
            {step === 9 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-teal-50 text-teal-700">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">Étape 9. Retraites Spirituelles</h4>
                    <p className="text-xs text-slate-500">Fréquence & durée investie par retraite</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Fréquence des retraites
                    </label>
                    <select
                      value={config.retraitesSpirituelles.frequencyPerYear}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          retraitesSpirituelles: {
                            ...config.retraitesSpirituelles,
                            frequencyPerYear: e.target.value,
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-blue-900 outline-none"
                    >
                      <option value="1 par mois (12/an)">1 retraite de 24h par mois (12/an)</option>
                      <option value="1 par semaine (52/an)">1 retraite par semaine</option>
                      <option value="Trimestrielle (4/an)">Trimestrielle (4 retraites par an)</option>
                      <option value="Semestrielle (2/an)">Semestrielle (2 retraites par an)</option>
                      <option value="Annuelle (1/an)">Annuelle (1 retraite par an)</option>
                    </select>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Durée par retraite (Heures)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={config.retraitesSpirituelles.retreatDurationHours || 24}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          retraitesSpirituelles: {
                            ...config.retraitesSpirituelles,
                            retreatDurationHours: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-teal-900 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 10: SPORT & SANTÉ */}
            {step === 10 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-rose-50 text-rose-700">
                    <Dumbbell className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">Étape 10. Santé & Sport</h4>
                    <p className="text-xs text-slate-500">Sessions de sport et entretien physique</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Sessions par semaine
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={config.objectifsPhy?.sessionsPerWeek || 1}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          objectifsPhy: {
                            ...(config.objectifsPhy || { enabled: true, targetSport: "Course & musculation", sessionsPerWeek: 1 }),
                            sessionsPerWeek: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-rose-900 outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Objectif physique spécifique
                    </label>
                    <input
                      type="text"
                      value={config.objectifsPhy?.targetSport || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          objectifsPhy: {
                            ...(config.objectifsPhy || { enabled: true, targetSport: "Course & musculation", sessionsPerWeek: 1 }),
                            targetSport: e.target.value,
                          },
                        })
                      }
                      placeholder="Ex: Prise de masse, 1 session de 2h par semaine"
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 11: MINISTÈRE PASTORAL */}
            {step === 11 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-purple-50 text-purple-700">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">Étape 11. Ministère Pastoral & Formation</h4>
                    <p className="text-xs text-slate-500">Dirigeants & disciples à former</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Dirigeants à former
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={config.ministerePastoral?.leadersToTrain || 3}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          ministerePastoral: {
                            ...(config.ministerePastoral || { enabled: true, leadersToTrain: 3, disciplesToTrain: 10, visitsTarget: 20 }),
                            leadersToTrain: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-purple-900 outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Disciples à former
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={config.ministerePastoral?.disciplesToTrain || 10}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          ministerePastoral: {
                            ...(config.ministerePastoral || { enabled: true, leadersToTrain: 3, disciplesToTrain: 10, visitsTarget: 20 }),
                            disciplesToTrain: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-purple-900 outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Visites pastorales chez les frères
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={config.ministerePastoral?.visitsTarget || 20}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          ministerePastoral: {
                            ...(config.ministerePastoral || { enabled: true, leadersToTrain: 3, disciplesToTrain: 10, visitsTarget: 20 }),
                            visitsTarget: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-purple-900 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 12: FINANCES, DÎMES & GALATES 6 */}
            {step === 12 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">Étape 12. Finances, Dîmes & Galates 6</h4>
                    <p className="text-xs text-slate-500">Pourcentages de dîmes, offrandes et dons réguliers</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Dîme (Obligatoire 10%)
                    </label>
                    <input
                      type="number"
                      readOnly
                      value={10}
                      className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl text-sm font-bold text-slate-600 cursor-not-allowed"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Offrandes libres (%)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={config.donsOffrandes?.offrandePercentage || 10}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          donsOffrandes: {
                            ...config.donsOffrandes,
                            offrandePercentage: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-emerald-900 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 13: PROJETS 2026 */}
            {step === 13 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-500 text-blue-950">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">Étape 13. Domaine des Projets 2026</h4>
                    <p className="text-xs text-slate-500">Projets financiers, spirituels et professionnels</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Projet Financier
                    </label>
                    <input
                      type="text"
                      value={config.projets?.financialProject || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          projets: {
                            ...(config.projets || { enabled: true }),
                            financialProject: e.target.value,
                          },
                        })
                      }
                      placeholder="Ex: Ouvrir ma boutique de vente de produits digitaux"
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Projet Spirituel
                    </label>
                    <input
                      type="text"
                      value={config.projets?.spiritualProject || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          projets: {
                            ...(config.projets || { enabled: true }),
                            spiritualProject: e.target.value,
                          },
                        })
                      }
                      placeholder="Ex: Lancer ma chaîne YouTube chrétienne"
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Projet Professionnel & Formations
                    </label>
                    <input
                      type="text"
                      value={config.projets?.professionalProject || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          projets: {
                            ...(config.projets || { enabled: true }),
                            professionalProject: e.target.value,
                          },
                        })
                      }
                      placeholder="Ex: Neuromarketing, Permis C, Anglais 100 mots"
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Modal Bottom Stepper Navigation */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              {step > 1 ? (
                <Button variant="outline" size="sm" onClick={() => setStep(step - 1)} icon={<ArrowLeft className="w-4 h-4" />}>
                  Précédent
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setShowIntroGuide(true)}>
                  Guide d'intro
                </Button>
              )}

              {step < totalSteps ? (
                <Button variant="gold" size="sm" onClick={() => setStep(step + 1)} icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                  Étape suivante
                </Button>
              ) : (
                <Button variant="gold" size="md" onClick={handleSaveConfig} icon={<CheckCircle2 className="w-4 h-4" />}>
                  Enregistrer & Activer mes Objectifs 2026
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
