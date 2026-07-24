"use client";

import React, { useState, useEffect } from "react";
import {
  Target,
  Sparkles,
  Plus,
  Clock,
  BookOpen,
  Users,
  Heart,
  BookMarked,
  Gift,
  ShieldCheck,
  Headphones,
  Award,
  History,
  CheckCircle2,
  RefreshCw,
  Flame,
  Dumbbell,
  Briefcase,
  DollarSign,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ObjectivesWizardModal } from "@/components/objectifs/ObjectivesWizardModal";
import {
  getCurrentObjectivesConfig,
  getAnnualObjectivesHistory,
} from "@/lib/objectifs-service";
import { FullObjectivesConfig, ObjectifAnnuelData } from "@/types";

export default function ObjectifsPage() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [config, setConfig] = useState<FullObjectivesConfig | null>(null);
  const [history, setHistory] = useState<ObjectifAnnuelData[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<number>(1);
  const [notification, setNotification] = useState<string | null>(null);

  const loadData = () => {
    const currentConf = getCurrentObjectivesConfig();
    const hist = getAnnualObjectivesHistory();
    setConfig(currentConf);
    setHistory(hist);
    if (hist.length > 0) {
      const active = hist.find((h) => h.isCurrent);
      if (active) setSelectedVersion(active.version);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleWizardSaved = (newVersion: number) => {
    loadData();
    setNotification(`Objectifs 2026 enregistrés et activés sous la version v${newVersion} !`);
    setTimeout(() => setNotification(null), 4000);
  };

  if (!config) return null;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Bar Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold font-heading text-slate-900">
              Objectifs de l'Année 2026
            </h2>
            <Badge variant="gold" size="md">
              Version v{selectedVersion}
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Structure dynamique pilotant votre suivi quotidien, vos comptes rendus et votre transformation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Version History Selector */}
          {history.length > 1 && (
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
              <History className="w-4 h-4 text-blue-600" />
              <span>Historique :</span>
              <select
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(Number(e.target.value))}
                className="bg-transparent font-bold text-blue-900 outline-none cursor-pointer"
              >
                {history.map((h) => (
                  <option key={h.id} value={h.version}>
                    v{h.version} {h.isCurrent ? "(Actuelle)" : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button
            variant="gold"
            size="md"
            onClick={() => setWizardOpen(true)}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Modifier / Planifier mes Objectifs 2026
          </Button>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Intro Banner Shortcut */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
            <Sparkles className="w-4 h-4 fill-amber-300" />
            <span>Guide de Configuration de A à Z</span>
          </div>
          <p className="text-xs text-blue-200">
            Configurez facilement vos objectifs ÊTRE (caractère) et FAIRE (discipline, prière, jeûne, finances, projets).
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="bg-white/10 text-white border-white/20 hover:bg-white/20 shrink-0"
          onClick={() => setWizardOpen(true)}
        >
          Ouvrir le guide
        </Button>
      </div>

      {/* OBJECTIVES CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 0. PARTIE I - ÊTRE & CARACTÈRE */}
        {config.etreCaractere && (
          <Card variant="gradient" hoverEffect className="space-y-3 lg:col-span-3 border-l-4 border-l-blue-900">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-900 text-amber-400 font-bold">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-heading text-slate-900">PARTIE I — L'ÊTRE : Fruit de l'Esprit & Caractère</h3>
                  <p className="text-xs text-slate-500">Transformation à l'image de Christ & ministères</p>
                </div>
              </div>
              <Badge variant="gold" size="sm">Priorité Spirituelle</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong className="text-blue-900 block">Fruit de l'Esprit :</strong>
                <span>{config.etreCaractere.fruitEsprit}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong className="text-rose-900 block">Vices à abandonner :</strong>
                <span>{config.etreCaractere.vicesToAbandon.join(", ")}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong className="text-emerald-900 block">Connaissance de Dieu :</strong>
                <span>{config.etreCaractere.godKnowledgeGoal}</span>
              </div>
            </div>
          </Card>
        )}

        {/* 1. Prière Personnelle */}
        <Card variant="gradient" hoverEffect className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900">1. Prière Personnelle</h3>
            </div>
            <Badge variant={config.prierePersonnelle.enabled ? "success" : "neutral"} size="sm">
              {config.prierePersonnelle.enabled ? "Actif" : "Inactif"}
            </Badge>
          </div>
          <p className="text-2xl font-extrabold font-heading text-blue-900">
            {config.prierePersonnelle.dailyMinutes} <span className="text-xs font-normal text-slate-500">min / jour ({((config.prierePersonnelle.dailyMinutes || 0) / 60).toFixed(1)}h)</span>
          </p>
          <p className="text-xs text-slate-500">{config.prierePersonnelle.customNotes || "Prière seule quotidienne."}</p>
        </Card>

        {/* 2. Prière de Groupe */}
        <Card variant="gradient" hoverEffect className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900">2. Prière de Groupe</h3>
            </div>
            <Badge variant="gold" size="sm">{config.priereDeGroupe.events.length} programmes</Badge>
          </div>
          <div className="space-y-1 pt-1">
            {config.priereDeGroupe.events.map((ev) => (
              <div key={ev.id} className="text-xs bg-white p-2 rounded-lg border border-slate-100 flex justify-between">
                <span className="font-semibold text-slate-800">{ev.name}</span>
                <span className="text-blue-700 font-bold">{ev.dayOfWeek}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 3. Lecture Biblique */}
        <Card variant="gradient" hoverEffect className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900">3. Lecture Biblique</h3>
            </div>
            <Badge variant="success" size="sm">Actif</Badge>
          </div>
          <p className="text-2xl font-extrabold font-heading text-slate-900">
            {config.lectureBiblique.dailyChapters} <span className="text-xs font-normal text-slate-500">chapitres / jour</span>
          </p>
          <p className="text-xs text-blue-700 font-semibold">Objectif hebdo : {config.lectureBiblique.weeklyChapters} chapitres</p>
        </Card>

        {/* 4. Méditation */}
        <Card variant="gradient" hoverEffect className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                <BookMarked className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900">4. Méditation Spirituelle</h3>
            </div>
            <Badge variant="info" size="sm">Actif</Badge>
          </div>
          <p className="text-2xl font-extrabold font-heading text-purple-900">
            {config.meditation.dailyMinutes} <span className="text-xs font-normal text-slate-500">min / jour</span>
          </p>
          <p className="text-xs text-slate-500">Mémorisation & réflexion profonde.</p>
        </Card>

        {/* 5. JEÛNE & CROISADE */}
        {config.jeune && (
          <Card variant="gradient" hoverEffect className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold font-heading text-slate-900">5. Jeûne & Prière Prolonge</h3>
              </div>
              <Badge variant="gold" size="sm">Actif</Badge>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              {config.jeune.full3DayFastsCount} jeûnes de 3 jours • {config.jeune.partial100DayFast ? "Jeûne 100 jours partiel" : ""} • {config.jeune.crusadeDaysCount}j croisade.
            </p>
          </Card>
        )}

        {/* 6. MÉMORISATION DE LA PAROLE */}
        {config.memorisation && (
          <Card variant="gradient" hoverEffect className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
                  <BookMarked className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold font-heading text-slate-900">6. Mémorisation de la Parole</h3>
              </div>
              <Badge variant="info" size="sm">Actif</Badge>
            </div>
            <p className="text-2xl font-extrabold font-heading text-blue-900">
              {config.memorisation.versesPerWeek} <span className="text-xs font-normal text-slate-500">versets / semaine</span>
            </p>
            <p className="text-xs text-slate-500">{config.memorisation.targetBook}</p>
          </Card>
        )}

        {/* 7. Évangélisation */}
        <Card variant="gradient" hoverEffect className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900">7. Évangélisation & Âmes</h3>
            </div>
            <Badge variant="success" size="sm">Actif</Badge>
          </div>
          <p className="text-2xl font-extrabold font-heading text-emerald-800">
            {config.evangelisation.weeklyPeopleCount} <span className="text-xs font-normal text-slate-500">personnes / sem.</span>
          </p>
          <p className="text-xs text-slate-500">
            Traité(s) : {config.evangelisation.plannedTractsCount || 500} distribués • Cible : {config.evangelisation.soulsTargetCount || 5} âmes baptisées.
          </p>
        </Card>

        {/* 8. Littérature Chrétienne */}
        <Card variant="gradient" hoverEffect className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900">8. Littérature Chrétienne</h3>
            </div>
            <Badge variant="gold" size="sm">Actif</Badge>
          </div>
          <p className="text-2xl font-extrabold font-heading text-amber-800">
            {config.litteratureChretienne.weeklyPagesCount} <span className="text-xs font-normal text-slate-500">pages / sem.</span>
          </p>
          <p className="text-xs text-slate-500">Objectif : {config.litteratureChretienne.booksCountTarget || 15} livres à lire.</p>
        </Card>

        {/* 9. Retraites Spirituelles */}
        <Card variant="gradient" hoverEffect className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900">9. Retraites Spirituelles</h3>
            </div>
            <Badge variant="info" size="sm">Actif</Badge>
          </div>
          <p className="text-base font-bold text-teal-900">
            {config.retraitesSpirituelles.frequencyPerYear}
          </p>
          <p className="text-xs text-slate-500">Durée : {config.retraitesSpirituelles.retreatDurationHours || 24}h par retraite.</p>
        </Card>

        {/* 10. OBJECTIFS PHYSIQUES (SPORT) */}
        {config.objectifsPhy && (
          <Card variant="gradient" hoverEffect className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold font-heading text-slate-900">10. Santé & Sport</h3>
              </div>
              <Badge variant="info" size="sm">Actif</Badge>
            </div>
            <p className="text-2xl font-extrabold font-heading text-rose-900">
              {config.objectifsPhy.sessionsPerWeek} <span className="text-xs font-normal text-slate-500">session(s) / semaine</span>
            </p>
            <p className="text-xs text-slate-500">{config.objectifsPhy.targetSport}</p>
          </Card>
        )}

        {/* 11. MINISTÈRE PASTORAL & DISCIPOLAT */}
        {config.ministerePastoral && (
          <Card variant="gradient" hoverEffect className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold font-heading text-slate-900">11. Ministère Pastoral & Formation</h3>
              </div>
              <Badge variant="gold" size="sm">Actif</Badge>
            </div>
            <div className="space-y-1 text-xs text-slate-700">
              <p>• {config.ministerePastoral.leadersToTrain} dirigeants à former</p>
              <p>• {config.ministerePastoral.disciplesToTrain} disciples à former</p>
              <p>• {config.ministerePastoral.visitsTarget} visites fraternelles chez les frères</p>
            </div>
          </Card>
        )}

        {/* 12. Dons & Offrandes & Galates 6 */}
        <Card variant="gradient" hoverEffect className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900">12. Finances, Dîmes & Galates 6</h3>
            </div>
            <Badge variant="gold" size="sm">Actif</Badge>
          </div>
          <div className="space-y-1 text-xs text-slate-700">
            <p>✓ Dîmes : {config.donsOffrandes.tithePercentage || 10}% (Obligatoire)</p>
            <p>✓ Offrandes : {config.donsOffrandes.offrandePercentage || 10}%</p>
            {config.donsOffrandes.trackGalates6 && <p>✓ Galates 6:6 (Dons mensuels aux enseignants)</p>}
          </div>
        </Card>

        {/* 13. PROJETS 2026 */}
        {config.projets && (
          <Card variant="gradient" hoverEffect className="space-y-3 lg:col-span-3 border-l-4 border-l-amber-500">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500 text-blue-950 font-bold">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-heading text-slate-900">13. Domaine des Projets 2026 (Spirituels & Pro)</h3>
                  <p className="text-xs text-slate-500">Objectifs financiers, chaîne YouTube, compétences et livres</p>
                </div>
              </div>
              <Badge variant="gold" size="sm">Vision 2026</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong className="text-blue-900 block">Projet Financier :</strong>
                <span>{config.projets.financialProject || "Boutique en ligne"}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong className="text-amber-900 block">Projet Spirituel :</strong>
                <span>{config.projets.spiritualProject || "Chaîne YouTube Chrétienne"}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong className="text-indigo-900 block">Projet Professionnel :</strong>
                <span>{config.projets.professionalProject || "Neuromarketing & Permis C"}</span>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Objectives Wizard Modal Component */}
      <ObjectivesWizardModal
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        initialConfig={config}
        onSaved={handleWizardSaved}
      />
    </div>
  );
}
