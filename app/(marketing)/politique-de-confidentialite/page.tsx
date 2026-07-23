import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { BgdLogo } from "@/components/shared/BgdLogo";

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-[#FAFCFF] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-6">
          <BgdLogo size="md" />
          <Link href="/dashboard" className="text-xs font-bold text-blue-700 flex items-center gap-1 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au tableau de bord</span>
          </Link>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Conformité RGPD & Protection des Données</span>
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">
            Politique de Confidentialité
          </h1>
          <p className="text-xs text-slate-500">
            Dernière mise à jour : 23 juillet 2026
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 font-heading">1. Collecte des Données</h3>
            <p>
              BeGoodDisciple (BGD) collecte uniquement les données nécessaires à votre suivi de redevabilité spirituelle : votre nom, adresse email, adresse email de votre mentor (Faiseur de Disciple), ainsi que les données quotidiennes de suivi (temps de prière, chapitres bibliques lus, fardeaux enregistrés).
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 font-heading">2. Utilisation & Redevabilité</h3>
            <p>
              Vos données quotidiennes servent exclusivement à générer vos comptes rendus spirituels périodiques. Aucune donnée n'est vendue ni cédée à des tiers. Les comptes rendus ne sont transmis qu'à l'adresse email de votre mentor désigné par vous.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 font-heading">3. Droits RGPD : Exportation et Suppression</h3>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez du droit d'exporter l'intégralité de vos données au format JSON à tout moment depuis votre page profil, ainsi que du droit de supprimer définitivement votre compte et l'ensemble de vos données.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
