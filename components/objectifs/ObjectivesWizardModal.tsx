"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  BookOpen,
  Users,
  Heart,
  BookMarked,
  Gift,
  ShieldCheck,
  Headphones,
  Award,
  HelpCircle,
  X,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  FullObjectivesConfig,
  GroupPrayerEvent,
  CharacterAxis,
  CustomGoalItem,
} from "@/types";
import { saveAnnualObjectivesConfig } from "@/lib/objectifs-service";

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

  const handleAddCustomGoal = () => {
    if (!customTitle.trim()) return;
    const newCust: CustomGoalItem = {
      id: `cust-${Date.now()}`,
      title: customTitle,
      question: customQuestion || `As-tu validé ${customTitle} ?`,
      frequency: customFreq,
      responseType: customRespType,
    };
    setConfig({
      ...config,
      custom: {
        ...config.custom,
        items: [...config.custom.items, newCust],
      },
    });
    setCustomTitle("");
    setCustomQuestion("");
  };

  const handleRemoveCustomGoal = (id: string) => {
    setConfig({
      ...config,
      custom: {
        ...config.custom,
        items: config.custom.items.filter((i) => i.id !== id),
      },
    });
  };

  const handleSaveAll = () => {
    const res = saveAnnualObjectivesConfig(config, 2026);
    onSaved(res.version);
    onClose();
  };

  const stepTitles = [
    "1. Prière Personnelle",
    "2. Prière de Groupe",
    "3. Lecture Biblique",
    "4. Méditation",
    "5. Évangélisation",
    "6. Littérature Chrétienne",
    "7. Retraites Spirituelles",
    "8. Dons, Dîmes & Offrandes",
    "9. Visites Pastorales",
    "10. Enseignements Écoutés",
    "11. Caractère & Discipline",
    "12. Objectifs Personnalisés",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Body */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl shadow-blue-950/20 border border-slate-100 z-10 overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-blue-950 font-extrabold flex items-center justify-center shadow-md">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading">
                Configuration des Objectifs Annuel 2026
              </h3>
              <p className="text-xs text-blue-200">
                {showIntroGuide ? "Guide d'introduction de A à Z" : `Étape ${step} sur 12 • ${stepTitles[step - 1]}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* INTRO GUIDE VIEW */}
        {showIntroGuide ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-amber-50 border border-blue-100 space-y-3">
              <div className="flex items-center gap-2 text-blue-900 font-bold font-heading text-lg">
                <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
                <span>Comment établir tes objectifs et réussir ton compte rendu de A à Z</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ce wizard est le cœur de votre expérience <strong>BeGoodDisciple</strong>. Les objectifs que vous allez définir ici vont piloter dynamiquement toute la structure de votre journal quotidien et générer automatiquement vos bilans spirituels pour votre mentor.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2">
                <Badge variant="gold" size="sm">Étape A : Définition des cibles</Badge>
                <h4 className="text-sm font-bold font-heading text-slate-900">Vos engagements 2026</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Répondez aux questions à travers les 12 catégories clés (Prière, Bible, Évangélisation, Caractère, etc.) pour fixer des cibles concrètes et atteignables.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2">
                <Badge variant="info" size="sm">Étape Z : Suivi & Compte Rendu</Badge>
                <h4 className="text-sm font-bold font-heading text-slate-900">Pilote votre suivi quotidien</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Chaque soir, votre tableau de bord vous proposera exactement les champs correspondant à vos choix. Vos comptes rendus au FD seront calculés automatiquement.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Button
                variant="gold"
                size="lg"
                onClick={() => setShowIntroGuide(false)}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Démarrer la configuration (12 étapes)
              </Button>
            </div>
          </div>
        ) : (
          /* 12-STEP WIZARD CONTENT */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Progress indicator */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                <span>Progression du Wizard</span>
                <span className="text-blue-950">{Math.round((step / 12) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-amber-400 transition-all duration-300"
                  style={{ width: `${(step / 12) * 100}%` }}
                />
              </div>
            </div>

            {/* CATEGORY 1: PRIERE PERSONNELLE */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-700">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">1. Prière Personnelle</h4>
                    <p className="text-xs text-slate-500">Suivi du temps d'intimité spirituelle quotidien</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Veux-tu suivre ton temps de prière quotidien ?
                    </span>
                    <input
                      type="checkbox"
                      checked={config.prierePersonnelle.enabled}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          prierePersonnelle: {
                            ...config.prierePersonnelle,
                            enabled: e.target.checked,
                          },
                        })
                      }
                      className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  {config.prierePersonnelle.enabled && (
                    <div className="pt-3 border-t border-slate-200">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Objectif de temps quotidien (Minutes par jour)
                      </label>
                      <input
                        type="number"
                        min={5}
                        max={360}
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
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-blue-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CATEGORY 2: PRIERE DE GROUPE */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-700">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">2. Prière de Groupe & Rassemblements</h4>
                    <p className="text-xs text-slate-500">Ajoutez vos rendez-vous récurrents de prière en communauté</p>
                  </div>
                </div>

                {/* Events List */}
                <div className="space-y-3">
                  {config.priereDeGroupe.events.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-900">{ev.name}</p>
                        <p className="text-xs text-slate-500">
                          {ev.dayOfWeek} {ev.time ? `à ${ev.time}` : ""}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveGroupEvent(ev.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Event Form */}
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-900">
                    Ajouter un programme récurrent
                  </p>
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

            {/* CATEGORY 3: LECTURE BIBLIQUE */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-700">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">3. Lecture Biblique</h4>
                    <p className="text-xs text-slate-500">Fixez votre rythme de lecture de la Parole de Dieu</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Chapitres par jour
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
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
                      Chapitres par semaine (calculé)
                    </label>
                    <input
                      type="number"
                      readOnly
                      value={config.lectureBiblique.weeklyChapters}
                      className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl text-sm font-bold text-slate-600 outline-none cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* CATEGORY 4: MEDITATION */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-purple-50 text-purple-700">
                    <BookMarked className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">4. Méditation Spirituelle</h4>
                    <p className="text-xs text-slate-500">Temps quotidien d'étude profonde et de mémorisation</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Objectif de méditation (Minutes par jour)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={120}
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
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-blue-900 outline-none"
                  />
                </div>
              </div>
            )}

            {/* CATEGORY 5: EVANGELISATION */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">5. Évangélisation & Témoignage</h4>
                    <p className="text-xs text-slate-500">Objectifs de partage de l'Évangile et distribution de traités</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Personnes abordées (Objectif par semaine)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
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
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-blue-900 outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Suivi de la distribution de traités d'évangélisation ?
                    </span>
                    <input
                      type="checkbox"
                      checked={config.evangelisation.trackTracts}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          evangelisation: {
                            ...config.evangelisation,
                            trackTracts: e.target.checked,
                          },
                        })
                      }
                      className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* CATEGORY 6: LITTERATURE CHRETIENNE */}
            {step === 6 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-700">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">6. Littérature Chrétienne</h4>
                    <p className="text-xs text-slate-500">Lecture d'ouvrages et livres d'édification spirituelle</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Pages lues par semaine
                    </label>
                    <input
                      type="number"
                      min={5}
                      max={500}
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
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-blue-900 outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Activer le rappel hebdo "Livre terminé" (titre + auteur) ?
                    </span>
                    <input
                      type="checkbox"
                      checked={config.litteratureChretienne.trackCompletedBooks}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          litteratureChretienne: {
                            ...config.litteratureChretienne,
                            trackCompletedBooks: e.target.checked,
                          },
                        })
                      }
                      className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* CATEGORY 7: RETRAITES SPIRITUELLES */}
            {step === 7 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-teal-50 text-teal-700">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">7. Retraites Spirituelles</h4>
                    <p className="text-xs text-slate-500">Planification des temps de mise à l'écart et de jeûne prolongé</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Fréquence souhaitée
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
                      <option value="Trimestrielle (4/an)">Trimestrielle (4 retraites par an)</option>
                      <option value="Semestrielle (2/an)">Semestrielle (2 retraites par an)</option>
                      <option value="Annuelle (1/an)">Annuelle (1 retraite par an)</option>
                    </select>
                  </div>

                  <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs text-teal-900">
                    💡 <strong>Encouragement BGD :</strong> Planifiez dès maintenant vos dates dans votre calendrier personnel pour vous assurer de maintenir ce temps d'intimité d'exception.
                  </div>
                </div>
              </div>
            )}

            {/* CATEGORY 8: DONS & OFFRANDES */}
            {step === 8 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-800">
                    <Gift className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">8. Dons, Dîmes & Offrandes</h4>
                    <p className="text-xs text-slate-500">Fidélité financière et dons aux enseignants (Galates 6)</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Suivi de la Dîme & Offrandes ?
                    </span>
                    <input
                      type="checkbox"
                      checked={config.donsOffrandes.trackTithe}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          donsOffrandes: {
                            ...config.donsOffrandes,
                            trackTithe: e.target.checked,
                          },
                        })
                      }
                      className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                        Don "Galates 6" (Soutien à ceux qui enseignent)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        « Que celui à qui l'on enseigne la parole fasse part de tous ses biens à celui qui l'enseigne. »
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.donsOffrandes.trackGalates6}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          donsOffrandes: {
                            ...config.donsOffrandes,
                            trackGalates6: e.target.checked,
                          },
                        })
                      }
                      className="w-5 h-5 accent-blue-600 rounded cursor-pointer shrink-0 ml-4"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* CATEGORY 9: VISITES PASTORALES */}
            {step === 9 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-rose-50 text-rose-700">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">9. Visites Pastorales & Fraternelles</h4>
                    <p className="text-xs text-slate-500">Suivi des visites d'encouragement rendues aux frères et sœurs</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Objectif de visites par mois
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={30}
                    value={config.visitesPastorales.monthlyVisitsCount}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        visitesPastorales: {
                          ...config.visitesPastorales,
                          monthlyVisitsCount: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-blue-900 outline-none"
                  />
                </div>
              </div>
            )}

            {/* CATEGORY 10: ENSEIGNEMENTS */}
            {step === 10 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-sky-50 text-sky-700">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">10. Enseignements Écoutés</h4>
                    <p className="text-xs text-slate-500">Prédications et cours bibliques écoutés chaque semaine</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Enseignements écoutés par semaine
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={config.enseignements.weeklyTeachingsCount}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        enseignements: {
                          ...config.enseignements,
                          weeklyTeachingsCount: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-blue-900 outline-none"
                  />
                </div>
              </div>
            )}

            {/* CATEGORY 11: CARACTERE */}
            {step === 11 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-700">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">11. Caractère & Discipline Personnelle</h4>
                    <p className="text-xs text-slate-500">Choisissez vos axes de progrès personnels (sommeil, maîtrise de soi, etc.)</p>
                  </div>
                </div>

                {/* Axes list */}
                <div className="space-y-3">
                  {config.caractere.axes.map((ax) => (
                    <div key={ax.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{ax.name}</p>
                        <p className="text-xs text-blue-700 font-semibold">{ax.targetGoal}</p>
                      </div>
                      <button onClick={() => handleRemoveCharacterAxis(ax.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Form to add axis */}
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-900">Ajouter un axe de travail</p>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          const res = await fetch("/api/ai/suggestions", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              existingAxes: config.caractere.axes.map((a) => a.name),
                            }),
                          });
                          const data = await res.json();
                          if (data.suggestions && data.suggestions.length > 0) {
                            const newAxes: CharacterAxis[] = data.suggestions.map((s: any, idx: number) => ({
                              id: `ax-ai-${Date.now()}-${idx}`,
                              name: s.name,
                              targetGoal: s.targetGoal,
                            }));
                            setConfig({
                              ...config,
                              caractere: {
                                ...config.caractere,
                                axes: [...config.caractere.axes, ...newAxes],
                              },
                            });
                          }
                        } catch {
                          // fallback
                        }
                      }}
                      className="text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-amber-600 text-amber-700" />
                      <span>Suggérer des axes par l'IA</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Axe (ex: Sommeil)"
                      value={newAxisName}
                      onChange={(e) => setNewAxisName(e.target.value)}
                      className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Cible (ex: 7h par nuit)"
                      value={newAxisGoal}
                      onChange={(e) => setNewAxisGoal(e.target.value)}
                      className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                    />
                  </div>
                  <Button variant="secondary" size="sm" onClick={handleAddCharacterAxis} icon={<Plus className="w-4 h-4" />}>
                    Ajouter cet axe
                  </Button>
                </div>
              </div>
            )}

            {/* CATEGORY 12: CUSTOM GOALS */}
            {step === 12 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900">12. Objectifs Additionnels Personnalisés</h4>
                    <p className="text-xs text-slate-500">Ajoutez des blocs sur-mesure (études, travail, santé, etc.)</p>
                  </div>
                </div>

                {/* Custom goals list */}
                <div className="space-y-3">
                  {config.custom.items.map((cust) => (
                    <div key={cust.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{cust.title}</p>
                        <p className="text-xs text-slate-600">Question : {cust.question}</p>
                        <Badge variant="info" size="sm" className="mt-1">
                          {cust.frequency} • Réponse : {cust.responseType}
                        </Badge>
                      </div>
                      <button onClick={() => handleRemoveCustomGoal(cust.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Form to add custom goal */}
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-900">Créer un objectif sur-mesure</p>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Nom du bloc (ex: Études universitaires)"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Question de suivi (ex: As-tu révisé 2h aujourd'hui ?)"
                      value={customQuestion}
                      onChange={(e) => setCustomQuestion(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={customFreq}
                        onChange={(e) => setCustomFreq(e.target.value as any)}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none font-medium"
                      >
                        <option value="daily">Suivi Quotidien</option>
                        <option value="weekly">Suivi Hebdomadaire</option>
                      </select>
                      <select
                        value={customRespType}
                        onChange={(e) => setCustomRespType(e.target.value as any)}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none font-medium"
                      >
                        <option value="boolean">Oui / Non</option>
                        <option value="number">Nombre (chiffre)</option>
                        <option value="text">Texte libre</option>
                      </select>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" onClick={handleAddCustomGoal} icon={<Plus className="w-4 h-4" />}>
                    Ajouter ce bloc sur-mesure
                  </Button>
                </div>
              </div>
            )}

            {/* Stepper Footer Controls */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => {
                  if (step > 1) setStep(step - 1);
                  else setShowIntroGuide(true);
                }}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Précédent
              </Button>

              {step < 12 ? (
                <Button
                  type="button"
                  variant="gold"
                  size="md"
                  onClick={() => setStep(step + 1)}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Suivant ({step + 1}/12)
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="gold"
                  size="lg"
                  onClick={handleSaveAll}
                  icon={<CheckCircle2 className="w-5 h-5" />}
                >
                  Enregistrer les objectifs 2026
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
