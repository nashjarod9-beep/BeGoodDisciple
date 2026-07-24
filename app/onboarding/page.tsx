"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Globe,
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  Send,
  Target,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { completeOnboarding, getCurrentUserSession } from "@/lib/auth-service";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [timezone, setTimezone] = useState("Europe/Paris");
  const [mentorEmail, setMentorEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) return;
    setStep(3);
  };

  const handleNextStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorEmail.trim()) return;
    setLoading(true);

    await completeOnboarding(firstName, lastName, timezone, mentorEmail);
    setLoading(false);
    setStep(4);
  };

  const handleFinish = () => {
    router.push("/dashboard");
  };

  return (
    <Card variant="gradient" className="shadow-2xl shadow-blue-950/10 border border-blue-100">
      {/* Progress Stepper Bar */}
      <div className="p-6 border-b border-slate-100 bg-white/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-900 font-heading">
            Configuration initiale • Étape {step} sur 4
          </span>
          <Badge variant="gold" size="sm" dot={false}>
            {step === 1
              ? "Bienvenue"
              : step === 2
              ? "Profil Disciple"
              : step === 3
              ? "Mentor (FD)"
              : "Prêt !"}
          </Badge>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-amber-400 transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <CardContent className="p-6 sm:p-8">
        {/* STEP 1: BIENVENUE & CONCEPT */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-blue-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
                <Sparkles className="w-8 h-8 fill-blue-950 text-blue-950" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                Bienvenue sur BeGoodDisciple !
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                BeGoodDisciple (BGD) est conçu pour vous aider à garder une discipline spirituelle constante et à rester redevable envers votre <strong className="text-blue-900 font-bold">Faiseur de Disciple (FD)</strong>.
              </p>
            </div>

            {/* Concept Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <h4 className="text-xs font-bold font-heading text-slate-900">1. Suivi Quotidien</h4>
                <p className="text-[11px] text-slate-500">Prière, lecture biblique et méditations enregistrées en 2 minutes.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2">
                <Send className="w-6 h-6 text-amber-500" />
                <h4 className="text-xs font-bold font-heading text-slate-900">2. Envoi Automatique</h4>
                <p className="text-[11px] text-slate-500">Un bilan synthétique transmis par email à votre mentor.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <h4 className="text-xs font-bold font-heading text-slate-900">3. Compte Rendu</h4>
                <p className="text-[11px] text-slate-500">Des encouragements et conseils ciblés de votre FD.</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                variant="gold"
                size="lg"
                onClick={() => setStep(2)}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Continuer l'inscription
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: PROFILE INFORMATION */}
        {step === 2 && (
          <form onSubmit={handleNextStep2} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900">
                Vos Informations de Profil
              </h2>
              <p className="text-xs text-slate-500">
                Ces informations apparaîtront sur vos comptes rendus spirituels.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Prénom <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ex: Jean"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
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
                    placeholder="Ex: Disciple"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Fuseau horaire
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
                  <option value="Europe/London">Europe/London (UTC+0)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setStep(1)}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Retour
              </Button>
              <Button
                type="submit"
                variant="gold"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Étape suivante
              </Button>
            </div>
          </form>
        )}

        {/* STEP 3: MENTOR (FD) EMAIL */}
        {step === 3 && (
          <form onSubmit={handleNextStep3} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900">
                Votre Faiseur de Disciple (FD)
              </h2>
              <p className="text-xs text-slate-500">
                Indiquez l'adresse email de la personne qui vous accompagne spirituellement.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Adresse Email du Mentor / FD <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={mentorEmail}
                  onChange={(e) => setMentorEmail(e.target.value)}
                  placeholder="mentor.fd@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Explanation box required by prompt */}
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 space-y-2 text-xs text-blue-950">
              <div className="flex items-center gap-2 font-bold text-blue-900">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Pourquoi cette adresse est-elle obligatoire ?</span>
              </div>
              <p className="leading-relaxed">
                Votre Faiseur de Disciple recevra <strong>automatiquement vos comptes rendus de progression spirituelle par email</strong> à la fréquence choisie (hebdomadaire ou mensuelle).
              </p>
              <p className="text-blue-700 text-[11px] italic">
                * Vous pourrez modifier ou changer l'adresse de votre mentor à tout moment depuis la page de votre profil.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setStep(2)}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Retour
              </Button>
              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={loading}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                {loading ? "Enregistrement..." : "Activer les comptes rendus"}
              </Button>
            </div>
          </form>
        )}

        {/* STEP 4: COMPLETED / REDIRECT TO OBJECTIVES */}
        {step === 4 && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold font-heading text-slate-900">
                Félicitations, {firstName} !
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Votre compte BeGoodDisciple est configuré et le suivi spirituel avec <strong className="text-blue-900 font-bold">{mentorEmail}</strong> est activé.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-blue-50 border border-amber-200 text-xs text-slate-700 text-left space-y-2 max-w-md mx-auto">
              <div className="flex items-center gap-2 font-bold text-amber-800">
                <Target className="w-4 h-4 text-amber-600" />
                <span>Prochaine étape conseillée :</span>
              </div>
              <p className="leading-relaxed">
                Définissez vos objectifs spirituels annuels (prière, lecture de la Bible, jeûne) pour orienter vos premiers comptes rendus.
              </p>
            </div>

            <div className="pt-4 flex justify-center">
              <Button
                variant="gold"
                size="lg"
                onClick={handleFinish}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Définir mes objectifs spirituels
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
