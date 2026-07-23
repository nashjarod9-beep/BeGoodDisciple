"use client";

import React, { useState } from "react";
import { Calendar, Save, CheckCircle, Clock, BookOpen, Smile, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function SuiviPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-heading text-slate-900">
          Suivi Spirituel Quotidien
        </h2>
        <p className="text-xs text-slate-500">
          Enregistrez vos disciplines du jour. Elles alimenteront votre compte rendu hebdomadaire pour votre FD.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Suivi spirituel enregistré avec succès ! Vos statistiques ont été mises à jour.</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        <Card variant="gradient" className="space-y-6">
          {/* Section 1: Date & Mood */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Date de la saisie
              </label>
              <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Aujourd'hui, 23 Juillet 2026</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Disposition spirituelle (1 à 5)
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-sm hover:border-amber-400 hover:bg-amber-50 text-slate-800 focus:ring-2 focus:ring-amber-400"
                  >
                    {level} ⭐
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Priere & Bible */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Temps de Prière (Minutes)</span>
              </label>
              <input
                type="number"
                defaultValue={45}
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="ex: 45 min"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Chapitres Bibliques Lus</span>
              </label>
              <input
                type="number"
                defaultValue={4}
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="ex: 4 chapitres"
              />
            </div>
          </div>

          {/* Section 3: Notes & Meditations */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Notes de Méditation & Versets Marquants (Journal intime)</span>
            </label>
            <textarea
              rows={4}
              defaultValue="Aujourd'hui médité sur le Psaume 23. Confiance renouvelée dans la bonté du Berger."
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Inscrivez ce que le Seigneur vous a révélé..."
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              icon={<Save className="w-5 h-5" />}
            >
              Enregistrer mon suivi
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
