import React from "react";
import Link from "next/link";
import { BgdLogo } from "./BgdLogo";
import { Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <BgdLogo size="md" className="[&_span]:text-white" />
            <p className="text-xs text-slate-400 leading-relaxed">
              BeGoodDisciple (BGD) est la plateforme SaaS dédiée à l'édification, le suivi et le compte rendu de progression spirituelle entre Disciples et leurs Mentors.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading mb-4">
              Plateforme
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="#concept" className="hover:text-amber-400 transition-colors">
                  Le Concept
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-amber-400 transition-colors">
                  Fonctionnalités Clés
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-400 transition-colors">
                  Aperçu du Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resource Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading mb-4">
              Ressources
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="#" className="hover:text-amber-400 transition-colors">
                  Guide du Disciple
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-400 transition-colors">
                  Espace Mentor (FD)
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-400 transition-colors">
                  Modèles de Comptes Rendus
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading mb-4">
              Légal & Sécurité
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="#" className="hover:text-amber-400 transition-colors">
                  Confidentialité des Données
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-400 transition-colors">
                  Conditions Générales
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-400 transition-colors">
                  Support & Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BeGoodDisciple (BGD). Tous droits réservés.</p>
          <div className="flex items-center gap-1">
            Conçu avec <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> pour la croissance des disciples.
          </div>
        </div>
      </div>
    </footer>
  );
};
