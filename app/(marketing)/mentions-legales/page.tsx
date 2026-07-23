import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { BgdLogo } from "@/components/shared/BgdLogo";

export default function MentionsLegalesPage() {
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
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-3 py-1 rounded-full">
            <FileText className="w-4 h-4 text-amber-600" />
            <span>Informations Légales & Éditeur</span>
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">
            Mentions Légales
          </h1>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 font-heading">Éditeur de la Plateforme</h3>
            <p>
              La plateforme <strong>BeGoodDisciple (BGD)</strong> est éditée dans le cadre de la plateforme SaaS de redevabilité spirituelle pour disciples et faiseurs de disciples.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 font-heading">Hébergement & Backend</h3>
            <p>
              Le site et les API sont hébergés par Vercel Inc. (San Francisco, CA, USA) et le stockage de la base de données PostgreSQL est assuré par Supabase Inc.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
