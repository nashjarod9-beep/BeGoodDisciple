"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  Heart,
  Target,
  Shield,
  Zap,
  Users,
  DollarSign,
  Briefcase,
  Flame,
  Award,
  ArrowRight,
  BookMarked,
  Clock,
  Calendar,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function CoursePlanificationPage() {
  const [activeTab, setActiveTab] = useState<"TOUT" | "ETRE" | "FAIRE" | "FINANCES" | "PROJETS">("TOUT");

  const recommendedBooks = [
    { id: 1, title: "L'Homme spirituel", author: "Watchman Nee" },
    { id: 2, title: "L'Église", author: "Watchman Nee" },
    { id: 3, title: "Le chemin de la prière victorieuse", author: "Z.T. Fomum (ZTF)" },
    { id: 4, title: "La pratique de l'intercession", author: "Z.T. Fomum (ZTF)" },
    { id: 5, title: "L'art de l'intercession", author: "Z.T. Fomum (ZTF)" },
    { id: 6, title: "La révélation une nécessité", author: "Z.T. Fomum (ZTF)" },
    { id: 7, title: "L'utilisation du temps", author: "Z.T. Fomum (ZTF)" },
    { id: 8, title: "L'art de travailler dur", author: "Z.T. Fomum (ZTF)" },
    { id: 9, title: "Faire des disciples", author: "Z.T. Fomum (ZTF)" },
    { id: 10, title: "Le berger et son troupeau", author: "Z.T. Fomum (ZTF)" },
    { id: 11, title: "Experience the presence of God", author: "Charles Finney" },
    { id: 12, title: "L'autorité spirituelle", author: "Watchman Nee" },
    { id: 13, title: "Le vrai serviteur de Dieu", author: "Watchman Nee" },
    { id: 14, title: "Une grande faim de Jésus", author: "David Wilkerson" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Top Banner Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 text-white p-8 sm:p-10 shadow-2xl shadow-blue-950/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Guide & Cours de Discipolat</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
            COMMENT PLANIFIER SON ANNÉE ?
          </h1>

          <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
            Apprenez à structurer votre vie spirituelle, votre caractère chrétien, vos finances et vos projets professionnels selon le modèle biblique et les standards de la vie de disciple.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href="/objectifs">
              <Button variant="gold" size="md" icon={<Target className="w-4 h-4" />}>
                Appliquer à mes objectifs annuels
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scripture Foundation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="gradient" className="p-5 space-y-2 border-l-4 border-l-blue-600">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900">
            <BookMarked className="w-4 h-4 text-blue-600" />
            <span>Proverbes 16:9</span>
          </div>
          <p className="text-xs text-slate-700 italic font-medium leading-relaxed">
            « L'homme projette de suivre tel chemin, et Dieu dirige ses pas. »
          </p>
        </Card>

        <Card variant="gradient" className="p-5 space-y-2 border-l-4 border-l-amber-500">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Ecclésiaste 3:1</span>
          </div>
          <p className="text-xs text-slate-700 italic font-medium leading-relaxed">
            « Il y a un temps pour tout et un moment pour toute chose sous le ciel. »
          </p>
        </Card>

        <Card variant="gradient" className="p-5 space-y-2 border-l-4 border-l-indigo-600">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-900">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>1 Corinthiens 9:26</span>
          </div>
          <p className="text-xs text-slate-700 italic font-medium leading-relaxed">
            « Moi donc je cours ainsi, non comme ne sachant pas vers quel but; je combats ainsi... »
          </p>
        </Card>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("TOUT")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "TOUT"
              ? "bg-blue-900 text-white shadow-md shadow-blue-950/20"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Vue Générale (A à Z)
        </button>

        <button
          onClick={() => setActiveTab("ETRE")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "ETRE"
              ? "bg-blue-900 text-white shadow-md shadow-blue-950/20"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          PARTIE I : L'ÊTRE (Caractère)
        </button>

        <button
          onClick={() => setActiveTab("FAIRE")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "FAIRE"
              ? "bg-blue-900 text-white shadow-md shadow-blue-950/20"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          PARTIE II : LE FAIRE (Discipline)
        </button>

        <button
          onClick={() => setActiveTab("FINANCES")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "FINANCES"
              ? "bg-blue-900 text-white shadow-md shadow-blue-950/20"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Finances & Galates 6
        </button>

        <button
          onClick={() => setActiveTab("PROJETS")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "PROJETS"
              ? "bg-blue-900 text-white shadow-md shadow-blue-950/20"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Projets & Entreprenariat
        </button>
      </div>

      {/* SECTION 1: PARTIE I - L'ÊTRE */}
      {(activeTab === "TOUT" || activeTab === "ETRE") && (
        <Card variant="gradient" className="space-y-6">
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-900 text-amber-400 font-bold flex items-center justify-center text-lg shadow-sm">
                I
              </div>
              <div>
                <CardTitle className="text-xl">PARTIE I — « ÊTRE » un Chrétien au Standard de Christ</CardTitle>
                <p className="text-xs text-slate-500">Forger le caractère spirituel, abandonner les vices et développer le ministère personnel</p>
              </div>
            </div>
          </CardHeader>

          <div className="space-y-6">
            {/* A. Ressembler à Christ dans le caractère */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold font-heading text-blue-950 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>A. Revêtement du Fruit de l'Esprit (Galates 5:22-23)</span>
              </h4>
              <p className="text-xs text-slate-600">
                L'amour, la joie, la paix, la patience, la bonté, la bénignité (miséricorde), la fidélité, la douceur et la tempérance (maîtrise de soi).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs font-semibold text-blue-900">
                  1. Être fidèle dans les petites et grandes choses
                </div>
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 text-xs font-semibold text-amber-900">
                  2. Être discipliné dans le quotidien
                </div>
                <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-xs font-semibold text-purple-900">
                  3. Être doux et humble de cœur
                </div>
              </div>
            </div>

            {/* B. Abandon des caractères du diable */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold font-heading text-rose-950 flex items-center gap-2">
                <Shield className="w-4 h-4 text-rose-600" />
                <span>B. Abandon des Caractères Négatifs & Pièges</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100 space-y-1">
                  <span className="text-xs font-bold text-rose-900 block">1. Ôter le bavardage</span>
                  <p className="text-[11px] text-slate-600">Proverbes 10:19 — Éliminer les plaisanteries déplacées, les intrigues et retenir ses lèvres.</p>
                </div>

                <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100 space-y-1">
                  <span className="text-xs font-bold text-rose-900 block">2. Éliminer la procrastination</span>
                  <p className="text-[11px] text-slate-600">Ecclésiaste 3:1 — Exécuter chaque tâche en son temps sans remettre au lendemain.</p>
                </div>

                <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100 space-y-1">
                  <span className="text-xs font-bold text-rose-900 block">3. Vaincre l'amour du sommeil</span>
                  <p className="text-[11px] text-slate-600">Proverbes 20:13 — Ouvrir les yeux tôt pour se réveiller dans la prière et la parole.</p>
                </div>
              </div>
            </div>

            {/* C & D & E. Connaissance, Louange & Dons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  C & D. Connaissance & Ministère Personnel
                </span>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  <li>Connaître Dieu comme mon Père qui m'exauce toujours.</li>
                  <li>Développer une vie d'action de grâce perpétuelle (Éphésiens 5:20).</li>
                  <li>Développer la capacité de chanter longtemps dans la présence de Dieu.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 space-y-2">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
                  E. Ministère Commun (Matthieu 10:1)
                </span>
                <ul className="text-xs text-blue-900 space-y-1.5 list-disc list-inside font-medium">
                  <li>Aiguiser mon don d'évangéliste.</li>
                  <li>Recevoir et manifester le don des guérisons et miracles.</li>
                  <li>Développer le don d'une parole de connaissance.</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* SECTION 2: PARTIE II - LE FAIRE */}
      {(activeTab === "TOUT" || activeTab === "FAIRE") && (
        <Card variant="gradient" className="space-y-6">
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-blue-950 font-bold flex items-center justify-center text-lg shadow-sm">
                II
              </div>
              <div>
                <CardTitle className="text-xl">PARTIE II — « FAIRE » : Discipline & Objectifs Chiffrés</CardTitle>
                <p className="text-xs text-slate-500">Pour devenir un leader capable de former et diriger au moins 10 disciples</p>
              </div>
            </div>
          </CardHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>1. Lecture Biblique</span>
              </div>
              <p className="text-xs text-slate-600">
                <strong>7 chapitres / jour</strong> (soit 210 chap/mois) • Lire la Bible 2 fois dans l'année • 1h par jour (30h/mois).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>2. Prière Personnelle & Nuits</span>
              </div>
              <p className="text-xs text-slate-600">
                <strong>1h30 / jour</strong> (soit 45h/mois) • 2 nuits de prière personnelles par mois (1er et 3ème vendredi du mois).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>3. RDQAD (Rendez-Vous Quotidien)</span>
              </div>
              <p className="text-xs text-slate-600">
                <strong>1 RDQAD / jour</strong> (1h15/jour soit 38h/mois).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <Users className="w-4 h-4 text-purple-600" />
                <span>4. Prière en Groupe & Jeûne</span>
              </div>
              <p className="text-xs text-slate-600">
                30h/mois prière groupe • 8 jeûnes complets de 3 jours • 1 jeûne partiel de 100 jours.
              </p>
            </div>
          </div>

          {/* 14 Recommended Books Grid */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="text-sm font-bold font-heading text-slate-900 flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-amber-600" />
                <span>Littérature Chrétienne — 14 Livres Incontournables à Lire</span>
              </h4>
              <Badge variant="gold" size="sm">Objectif 15 livres/an</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {recommendedBooks.map((book) => (
                <div key={book.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-blue-900 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {book.id}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-tight">{book.title}</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5">Auteur : {book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* SECTION 3: FINANCES & GALATES 6 */}
      {(activeTab === "TOUT" || activeTab === "FINANCES") && (
        <Card variant="gradient" className="space-y-6">
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl">Domaine Financier & Galates 6:6-9</CardTitle>
                <p className="text-xs text-slate-500">Gestion financière fidèle, dîmes, offrandes et soutien à ceux qui enseignent</p>
              </div>
            </div>
          </CardHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                1. Dons à Dieu & à l'Œuvre
              </h4>
              <ul className="text-xs text-emerald-950 space-y-2 font-medium">
                <li className="flex justify-between"><span>Dîmes :</span> <strong>10% / mois</strong></li>
                <li className="flex justify-between"><span>Offrandes libres :</span> <strong>10% / mois</strong></li>
                <li className="flex justify-between"><span>Terrain de l'Église :</span> <strong>2% / mois</strong></li>
                <li className="flex justify-between"><span>Fond Missionnaire :</span> <strong>2% / mois</strong></li>
                <li className="flex justify-between"><span>Camp National :</span> <strong>Participation dédiée</strong></li>
              </ul>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                2. Application Directe de Galates 6:6-9
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                « Que celui à qui l'on enseigne la parole fasse part de tous ses biens à celui qui l'enseigne. »
              </p>
              <ul className="text-xs text-blue-950 space-y-1.5 list-disc list-inside font-medium">
                <li>Envoi mensuel d'une lettre d'encouragement + don bénévole aux frères & pasteurs qui vous enseignent.</li>
                <li>Dons réguliers à la famille physique et soutien à un membre de famille pour démarrer une activité.</li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* SECTION 4: PROJETS 2026 */}
      {(activeTab === "TOUT" || activeTab === "PROJETS") && (
        <Card variant="gradient" className="space-y-6">
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-900 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl">Le Domaine des Projets Spirituels & Professionnels</CardTitle>
                <p className="text-xs text-slate-500">Plan de développement d'activités en ligne, apprentissage et compétences</p>
              </div>
            </div>
          </CardHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <Badge variant="info" size="sm">Projet Financier</Badge>
              <h5 className="text-xs font-bold text-slate-900 mt-1">Boutique en ligne</h5>
              <p className="text-[11px] text-slate-500">Ouvrir une boutique de vente de produits digitaux en ligne.</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <Badge variant="gold" size="sm">Projet Spirituel</Badge>
              <h5 className="text-xs font-bold text-slate-900 mt-1">Chaîne YouTube Chrétienne</h5>
              <p className="text-[11px] text-slate-500">Partager sur l'entreprenariat et le discipolat chrétien.</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <Badge variant="success" size="sm">Professionnel</Badge>
              <h5 className="text-xs font-bold text-slate-900 mt-1">Stratégie & Neuromarketing</h5>
              <p className="text-[11px] text-slate-500">Maîtriser les ventes sur les réseaux sociaux.</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <Badge variant="neutral" size="sm">Permis & Langues</Badge>
              <h5 className="text-xs font-bold text-slate-900 mt-1">Permis C & Anglais</h5>
              <p className="text-[11px] text-slate-500">Apprendre au moins 100 nouveaux mots en Anglais et réviser la grammaire.</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <Badge variant="info" size="sm">Rédaction Ebook</Badge>
              <h5 className="text-xs font-bold text-slate-900 mt-1">Rédaction d'un Ebook</h5>
              <p className="text-[11px] text-slate-500">Écrire un guide pratique sur le business numérique.</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <Badge variant="gold" size="sm">Événements</Badge>
              <h5 className="text-xs font-bold text-slate-900 mt-1">Conférences & Croisades</h5>
              <p className="text-[11px] text-slate-500">Organiser 3 conférences en ligne et réserver ses billets de croisade.</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
