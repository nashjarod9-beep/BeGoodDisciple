"use client";

import React from "react";
import { User, Mail, ShieldCheck, UserCheck, Key, Bell, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function ProfilPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-heading text-slate-900">
          Profil & Paramètres de Redevabilité
        </h2>
        <p className="text-xs text-slate-500">
          Gérez vos informations personnelles et le lien avec votre Faiseur de Disciple (FD).
        </p>
      </div>

      {/* Disciple Info */}
      <Card variant="gradient" className="space-y-6">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle>Informations du Disciple</CardTitle>
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Nom complet
            </label>
            <input
              type="text"
              defaultValue="Jean Disciple"
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Adresse Email
            </label>
            <input
              type="email"
              defaultValue="jean.disciple@example.com"
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* Mentor Connection Settings */}
      <Card variant="gradient" className="space-y-6">
        <CardHeader className="border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
          <CardTitle>Mon Mentor (Faiseur de Disciple / FD)</CardTitle>
          <Badge variant="gold" size="md">
            Lien Actif
          </Badge>
        </CardHeader>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-900 text-amber-400 font-extrabold flex items-center justify-center text-lg shadow-md">
              PP
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 font-heading">Pasteur Paul</h4>
              <p className="text-xs text-slate-500">paul.mentor@eglise.org • Mentor depuis Mars 2026</p>
            </div>
          </div>

          <Button variant="outline" size="sm">
            Modifier le Mentor
          </Button>
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="gold" size="md" icon={<Save className="w-4 h-4" />}>
            Enregistrer les modifications
          </Button>
        </div>
      </Card>
    </div>
  );
}
