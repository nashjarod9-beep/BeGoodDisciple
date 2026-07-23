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
    setNotification(`Objectifs 2026 enregistrés sous la version v${newVersion} !`);
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
            Structure dynamique pilotant votre suivi quotidien et vos comptes rendus au FD.
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
            Relancer le Wizard d'objectifs
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
            <span>Guide d'introduction de A à Z</span>
          </div>
          <p className="text-xs text-blue-200">
            Besoin de revoir comment vos objectifs alimentent automatiquement vos bilans spirituels ?
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="bg-white/10 text-white border-white/20 hover:bg-white/20 shrink-0"
          onClick={() => setWizardOpen(true)}
        >
          Consulter le guide
        </Button>
      </div>

      {/* 12 OBJECTIVES CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            {config.prierePersonnelle.dailyMinutes} <span className="text-xs font-normal text-slate-500">min / jour</span>
          </p>
          <p className="text-xs text-slate-500">Temps d'intimité quotidienne suivi chaque soir.</p>
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
              <h3 className="text-sm font-bold font-heading text-slate-900">4. Méditation</h3>
            </div>
            <Badge variant="info" size="sm">Actif</Badge>
          </div>
          <p className="text-2xl font-extrabold font-heading text-purple-900">
            {config.meditation.dailyMinutes} <span className="text-xs font-normal text-slate-500">min / jour</span>
          </p>
          <p className="text-xs text-slate-500">Mémorisation & réflexion profonde.</p>
        </Card>

        {/* 5. Évangélisation */}
        <Card variant="gradient" hoverEffect className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900">5. Évangélisation</h3>
            </div>
            <Badge variant="success" size="sm">Actif</Badge>
          </div>
          <p className="text-2xl font-extrabold font-heading text-emerald-800">
            {config.evangelisation.weeklyPeopleCount} <span className="text-xs font-normal text-slate-500">personnes / sem.</span>
          </p>
          <p className="text-xs text-slate-500">
            Suivi traités : {config.evangelisation.trackTracts ? "Oui" : "Non"}
          </p>
        </Card>

        {/* 6. Littérature Chrétienne */}
        <Card variant="gradient" hoverEffect className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900">6. Littérature Chrétienne</h3>
            </div>
            <Badge variant="gold" size="sm">Actif</Badge>
          </div>
          <p className="text-2xl font-extrabold font-heading text-amber-800">
            {config.litteratureChretienne.weeklyPagesCount} <span className="text-xs font-normal text-slate-500">pages / sem.</span>
          </p>
          <p className="text-xs text-slate-500">Rappel livres terminés actif.</p>
        </Card>

        {/* 7. Retraites Spirituelles */}
        <Card variant="gradient" hoverEffect className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900">7. Retraites Spirituelles</h3>
            </div>
            <Badge variant="info" size="sm">Actif</Badge>
          </div>
          <p className="text-base font-bold text-teal-900">
            {config.retraitesSpirituelles.frequencyPerYear}
          </p>
          <p className="text-xs text-slate-500">Temps de mise à l'écart planifiés.</p>
        </Card>

        {/* 8. Dons / Dîmes */}
        <Card variant="gradient" hoverEffect className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900">8. Dons & Offrandes</h3>
            </div>
            <Badge variant="gold" size="sm">Actif</Badge>
          </div>
          <div className="space-y-1 text-xs text-slate-700">
            <p>✓ Dîmes & offrandes suivies</p>
            {config.donsOffrandes.trackGalates6 && <p>✓ Don "Galates 6" (Enseignants) actif</p>}
          </div>
        </Card>

        {/* 9. Visites Pastorales */}
        <Card variant="gradient" hoverEffect className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900">9. Visites Pastorales</h3>
            </div>
            <Badge variant="info" size="sm">Actif</Badge>
          </div>
          <p className="text-2xl font-extrabold font-heading text-rose-900">
            {config.visitesPastorales.monthlyVisitsCount} <span className="text-xs font-normal text-slate-500">visites / mois</span>
          </p>
          <p className="text-xs text-slate-500">Encouragement des frères et sœurs.</p>
        </Card>

        {/* 10. Enseignements */}
        <Card variant="gradient" hoverEffect className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900">10. Enseignements Écoutés</h3>
            </div>
            <Badge variant="info" size="sm">Actif</Badge>
          </div>
          <p className="text-2xl font-extrabold font-heading text-sky-900">
            {config.enseignements.weeklyTeachingsCount} <span className="text-xs font-normal text-slate-500">prédications / sem.</span>
          </p>
        </Card>

        {/* 11. Caractère */}
        <Card variant="gradient" hoverEffect className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900">11. Caractère & Discipline</h3>
            </div>
            <Badge variant="gold" size="sm">{config.caractere.axes.length} axes</Badge>
          </div>
          <div className="space-y-1">
            {config.caractere.axes.map((ax) => (
              <div key={ax.id} className="text-xs bg-white p-2 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-900">{ax.name}</span> : <span className="text-blue-700 font-medium">{ax.targetGoal}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 12. Objectifs Additionnels */}
        <Card variant="gradient" hoverEffect className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-slate-900">12. Blocs Sur-Mesure</h3>
            </div>
            <Badge variant="success" size="sm">{config.custom.items.length} blocs</Badge>
          </div>
          <div className="space-y-1">
            {config.custom.items.map((cust) => (
              <div key={cust.id} className="text-xs bg-white p-2 rounded-lg border border-slate-100">
                <p className="font-bold text-slate-900">{cust.title}</p>
                <p className="text-[11px] text-slate-500">{cust.question}</p>
              </div>
            ))}
          </div>
        </Card>
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
