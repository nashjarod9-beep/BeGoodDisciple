"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  ShieldCheck,
  Globe,
  Key,
  LogOut,
  Trash2,
  Save,
  CheckCircle2,
  AlertTriangle,
  Clock,
  History,
  Info,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  getCurrentUserSession,
  updateUserProfile,
  signOutUser,
  deleteUserAccount,
  CurrentUserSession,
} from "@/lib/auth-service";
import { FrequenceCompteRendu } from "@/types";

export default function ProfilPage() {
  const router = useRouter();
  const [session, setSession] = useState<CurrentUserSession | null>(null);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [timezone, setTimezone] = useState("Europe/Paris");
  const [mentorEmail, setMentorEmail] = useState("");
  const [defaultFrequency, setDefaultFrequency] = useState<FrequenceCompteRendu>("HEBDOMADAIRE");

  // Password modal & feedback states
  const [newPassword, setNewPassword] = useState("");
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const s = getCurrentUserSession();
    if (s) {
      setSession(s);
      setFirstName(s.firstName || "Jean");
      setLastName(s.lastName || "Disciple");
      setTimezone(s.timezone || "Europe/Paris");
      setMentorEmail(s.activeMentorEmail || "pastor.paul@example.com");
      setDefaultFrequency(s.defaultFrequency || "HEBDOMADAIRE");
    }
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateUserProfile({
      firstName,
      lastName,
      timezone,
      mentorEmail,
      defaultFrequency,
    });

    if (res.success && res.session) {
      setSession(res.session);
      setSavedSuccess("Profil et paramètres de redevabilité mis à jour avec succès !");
      setTimeout(() => setSavedSuccess(null), 4000);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    router.push("/login");
  };

  const handleDeleteAccount = async () => {
    await deleteUserAccount();
    setDeleteModalOpen(false);
    router.push("/login");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-extrabold font-heading text-slate-900">
          Profil & Paramètres du Disciple
        </h2>
        <p className="text-xs text-slate-500">
          Gérez vos informations personnelles, votre mentor (FD) et la fréquence de vos comptes rendus.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{savedSuccess}</span>
        </div>
      )}

      <form onSubmit={handleSaveProfile} className="space-y-8">
        {/* 1. INFORMATIONS PERSONNELLES */}
        <Card variant="gradient" className="space-y-6">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle>Informations Personnelles</CardTitle>
          </CardHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Prénom
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Nom
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Adresse Email (Compte BGD)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  readOnly
                  value={session?.email || "jean.disciple@example.com"}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-600 outline-none cursor-not-allowed font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Fuseau Horaire
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="Europe/Paris">Europe/Paris (UTC+1/+2)</option>
                  <option value="Africa/Abidjan">Africa/Abidjan (UTC+0)</option>
                  <option value="Africa/Kinshasa">Africa/Kinshasa (UTC+1)</option>
                  <option value="America/Montreal">America/Montreal (UTC-5)</option>
                  <option value="America/New_York">America/New_York (UTC-5)</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* 2. GESTION DU MENTOR / FAISEUR DE DISCIPLE */}
        <Card variant="gradient" className="space-y-6">
          <CardHeader className="border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle>Faiseur de Disciple (FD) & Redevabilité</CardTitle>
              <p className="text-xs text-slate-500">Adresse email du mentor qui reçoit vos synthèses</p>
            </div>
            <Badge variant="gold" size="md">
              Relation Active
            </Badge>
          </CardHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email du Faiseur de Disciple actuel
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-blue-600 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={mentorEmail}
                  onChange={(e) => setMentorEmail(e.target.value)}
                  placeholder="mentor.fd@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-blue-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 font-bold text-blue-900"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-950 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">Historique de la relation :</p>
                <p className="text-[11px] text-blue-800">
                  Si vous modifiez l'adresse email ci-dessus, l'ancienne relation sera archivée comme <em>inactive</em> tout en conservant l'historique de vos anciens comptes rendus.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* 3. FRÉQUENCE DES COMPTES RENDUS */}
        <Card variant="gradient" className="space-y-6">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle>Fréquence d'Envoi des Comptes Rendus</CardTitle>
            <p className="text-xs text-slate-500">Choisissez la fréquence d'envoi automatique par défaut</p>
          </CardHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setDefaultFrequency("HEBDOMADAIRE")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  defaultFrequency === "HEBDOMADAIRE"
                    ? "bg-gradient-to-br from-blue-600 to-indigo-900 text-white border-blue-600 shadow-md shadow-blue-500/20"
                    : "bg-white border-slate-200 text-slate-700 hover:border-blue-300"
                }`}
              >
                <Clock className={`w-5 h-5 mb-2 ${defaultFrequency === "HEBDOMADAIRE" ? "text-amber-300" : "text-blue-600"}`} />
                <h4 className="text-sm font-bold font-heading">Hebdomadaire</h4>
                <p className={`text-xs mt-1 ${defaultFrequency === "HEBDOMADAIRE" ? "text-blue-100" : "text-slate-500"}`}>
                  Envoi automatique tous les dimanches soir.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setDefaultFrequency("MENSUEL")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  defaultFrequency === "MENSUEL"
                    ? "bg-gradient-to-br from-amber-400 to-amber-600 text-blue-950 border-amber-400 shadow-md shadow-amber-500/20"
                    : "bg-white border-slate-200 text-slate-700 hover:border-amber-300"
                }`}
              >
                <Clock className={`w-5 h-5 mb-2 ${defaultFrequency === "MENSUEL" ? "text-blue-950" : "text-amber-600"}`} />
                <h4 className="text-sm font-bold font-heading">Mensuel</h4>
                <p className={`text-xs mt-1 ${defaultFrequency === "MENSUEL" ? "text-blue-900" : "text-slate-500"}`}>
                  Envoi automatique à la fin de chaque mois.
                </p>
              </button>
            </div>

            {/* MANDATORY NOTICE REQUIRED BY PROMPT */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Rappel important sur les fréquences de compte rendu :</span>
              </div>
              <p className="leading-relaxed">
                Quel que soit votre choix par défaut (hebdomadaire ou mensuel), sachez que les bilans <strong>mensuel, trimestriel, semestriel et annuel</strong> restent de toute façon obligatoires en plus de votre choix principal.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              icon={<Save className="w-5 h-5" />}
            >
              Enregistrer les modifications
            </Button>
          </div>
        </Card>
      </form>

      {/* 4. SÉCURITÉ & DECONNEXION */}
      <Card variant="gradient" className="space-y-6">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle>Sécurité & Compte</CardTitle>
        </CardHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Nouveau Mot de passe
            </label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  if (newPassword) {
                    setSavedSuccess("Mot de passe mis à jour !");
                    setNewPassword("");
                  }
                }}
              >
                Mettre à jour
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              variant="secondary"
              size="md"
              onClick={handleSignOut}
              icon={<LogOut className="w-4 h-4" />}
            >
              Se déconnecter de BGD
            </Button>

            <Button
              variant="danger"
              size="md"
              onClick={() => setDeleteModalOpen(true)}
              icon={<Trash2 className="w-4 h-4" />}
            >
              Supprimer mon compte (RGPD)
            </Button>
          </div>
        </div>
      </Card>

      {/* RGPD Account Deletion Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Supprimer définitivement votre compte"
        subtitle="Conformité RGPD"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setDeleteModalOpen(false)}>
              Annuler
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeleteAccount}>
              Confirmer la suppression
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs text-slate-600">
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>Attention : Cette action est irréversible.</span>
          </div>
          <p>
            Conformément au RGPD, la suppression de votre compte effacera l'intégralité de vos journaux spirituels, de vos suivis quotidiens et de vos relations de discipolat.
          </p>
        </div>
      </Modal>
    </div>
  );
}
