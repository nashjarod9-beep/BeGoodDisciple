import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Calendar,
  Send,
  Users,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, StatCard } from "@/components/ui/Card";
import { CircularProgressBar, LinearProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";

export default function LandingPage() {
  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 lg:pt-28">
        {/* Background gradient decorative glow orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-amber-400/25 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-amber-50 border border-blue-200/80 text-blue-900 text-xs font-semibold shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>La plateforme N°1 de suivi & compte rendu spirituel</span>
            </div>

            {/* Main Catchphrase Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 tracking-tight leading-[1.15]">
              Grandissez dans votre foi avec{" "}
              <span className="bgd-text-gradient">intention</span> &{" "}
              <span className="bgd-text-gradient-gold">suivi</span>.
            </h1>

            {/* Concept summary description */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
              <strong className="text-slate-900 font-semibold">BeGoodDisciple (BGD)</strong> transforme vos habitudes spirituelles quotidiennes (prière, lecture biblique, méditation) en comptes rendus automatisés transmis directement à votre mentor (<strong className="text-blue-900 font-semibold">Faiseur de Disciple</strong>).
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  variant="gold"
                  size="lg"
                  fullWidth
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Créer mon compte Disciple
                </Button>
              </Link>

              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" fullWidth>
                  Aperçu du Dashboard
                </Button>
              </Link>
            </div>

            {/* Social Trust Indicators */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Suivi Quotidien Simplifié</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Rapports Hebdomadaires Automatiques</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Lien direct Disciple ↔ FD</span>
              </div>
            </div>
          </div>

          {/* Dynamic Mockup Preview Card */}
          <div className="mt-14 max-w-5xl mx-auto relative">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-indigo-600 to-amber-400 rounded-3xl blur-xl opacity-30 animate-pulse" />
            
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-blue-100 p-6 md:p-8 shadow-2xl shadow-blue-950/10">
              {/* Mockup Top Window Controls */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-slate-400 ml-2">App / Dashboard Disciple</span>
                </div>
                <Badge variant="sent" size="sm">
                  Compte rendu automatique prêt
                </Badge>
              </div>

              {/* Mockup Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Prière & Intercession"
                  value="4h 30m"
                  subtitle="Cette semaine"
                  variant="blue"
                  trend={{ value: "+45m", isPositive: true }}
                />

                <StatCard
                  title="Lecture Biblique"
                  value="28 Chapitres"
                  subtitle="Évangile de Jean"
                  variant="gold"
                  trend={{ value: "100% de l'objectif", isPositive: true }}
                />

                <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                        Statut du compte rendu
                      </span>
                      <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                    </div>
                    <p className="text-2xl font-extrabold font-heading mt-2">Transmis au FD</p>
                    <p className="text-xs text-blue-200 mt-1">
                      Prochaine révision par Pasteur Paul jeudi.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-blue-800/80 flex items-center gap-2 text-xs text-amber-300 font-semibold">
                    <span>Série active : 14 jours</span>
                    <Award className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONCEPT SECTION */}
      <section id="concept" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Le Principe BeGoodDisciple
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
            Comment fonctionne le suivi & compte rendu spirituel ?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            BGD simplifie le processus d'accompagnement spirituel en automatisant les synthèses et en garantissant une communication fluide entre le Disciple et son mentor (FD).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <Card variant="gradient" hoverEffect className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-xl flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
              1
            </div>
            <h4 className="text-xl font-bold font-heading text-slate-900 mb-2">
              Saisie du Suivi Quotidien
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Enregistrez vos temps de prière, vos lectures bibliques, vos sujets de jeûne et vos réflexions quotidiennes en moins de 2 minutes par jour.
            </p>
          </Card>

          {/* Step 2 */}
          <Card variant="gradient" hoverEffect className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-blue-950 font-bold text-xl flex items-center justify-center mb-6 shadow-md shadow-amber-500/20">
              2
            </div>
            <h4 className="text-xl font-bold font-heading text-slate-900 mb-2">
              Génération Automatique du Bilan
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              En fin de semaine, la plateforme génère automatiquement un compte rendu structuré et lisible résumant votre régularité et vos victoires spirituelles.
            </p>
          </Card>

          {/* Step 3 */}
          <Card variant="gradient" hoverEffect className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-800 to-blue-950 text-white font-bold text-xl flex items-center justify-center mb-6 shadow-md shadow-indigo-900/20">
              3
            </div>
            <h4 className="text-xl font-bold font-heading text-slate-900 mb-2">
              Transmis au Mentor (FD)
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Votre mentor (Faiseur de Disciple) reçoit le bilan, analyse votre progression, valide vos étapes et vous apporte conseils spirituels et encouragements.
            </p>
          </Card>
        </div>
      </section>

      {/* KEY FEATURES GRID */}
      <section id="features" className="bg-gradient-to-b from-blue-50/50 to-white py-20 border-y border-blue-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Fonctionnalités Clés
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Tout ce dont vous avez besoin pour grandir
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card hoverEffect className="bg-white">
              <div className="p-3 w-fit rounded-xl bg-blue-50 text-blue-600 mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-heading text-slate-900 mb-2">
                Journal Spirituel Interactif
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Consignez facilement vos moments d'intimité spirituelle, versets marquants et prières exaucées.
              </p>
            </Card>

            <Card hoverEffect className="bg-white">
              <div className="p-3 w-fit rounded-xl bg-amber-50 text-amber-600 mb-4">
                <Send className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-heading text-slate-900 mb-2">
                Envoi Automatisé de Comptes Rendus
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Ne manquez aucun rapport. Définissez la fréquence d'envoi à votre FD (hebdomadaire, bimensuel ou mensuel).
              </p>
            </Card>

            <Card hoverEffect className="bg-white">
              <div className="p-3 w-fit rounded-xl bg-indigo-50 text-indigo-600 mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-heading text-slate-900 mb-2">
                Interface Faiseur de Disciple (FD)
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Une vue synthétique pour les mentors permettant de suivre plusieurs disciples et de leur répondre rapidement.
              </p>
            </Card>

            <Card hoverEffect className="bg-white">
              <div className="p-3 w-fit rounded-xl bg-emerald-50 text-emerald-600 mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-heading text-slate-900 mb-2">
                Statistiques & Barres de Progression
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Visualisez vos accomplissements grâce à des jauges circulaires et des graphiques de régularité inspirants.
              </p>
            </Card>

            <Card hoverEffect className="bg-white">
              <div className="p-3 w-fit rounded-xl bg-purple-50 text-purple-600 mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-heading text-slate-900 mb-2">
                Programmes de Lecture Biblique
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Définissez des objectifs personnalisés de lecture et suivez votre progression chapitre par chapitre.
              </p>
            </Card>

            <Card hoverEffect className="bg-white">
              <div className="p-3 w-fit rounded-xl bg-rose-50 text-rose-600 mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-heading text-slate-900 mb-2">
                Confidentiel & Sécurisé
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Vos notes personnelles restent strictement confidentielles, seuls les comptes rendus validés sont transmis à votre mentor.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 md:p-16 shadow-2xl shadow-blue-950/30">
          {/* Decorative ambient gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Prêt à franchir un cap dans votre discipline spirituelle ?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Rejoignez dès aujourd'hui la plateforme BeGoodDisciple et commencez à envoyer des comptes rendus réguliers à votre Faiseur de Disciple.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  variant="gold"
                  size="lg"
                  fullWidth
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Commencer maintenant gratuitement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
