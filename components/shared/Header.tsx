"use client";

import React from "react";
import { Menu, Search, Calendar } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { NotificationCenter } from "./NotificationCenter";

interface HeaderProps {
  onMenuToggle?: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  title = "Tableau de Bord",
}) => {
  const currentDateFormatted = format(new Date(), "EEEE d MMMM yyyy", { locale: fr });

  return (
    <header className="sticky top-0 z-30 w-full h-20 bg-white/90 backdrop-blur-md border-b border-blue-100/60 px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all">
      {/* Left Title & Mobile Menu Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-blue-900 hover:bg-blue-50 transition-colors"
          aria-label="Ouvrir le menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 tracking-tight">
            {title}
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium capitalize mt-0.5">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>{currentDateFormatted}</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search Bar Input */}
        <div className="hidden md:flex items-center gap-2 bg-slate-100/80 border border-slate-200/80 rounded-xl px-3.5 py-2 w-64 text-xs focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Rechercher un objectif, compte rendu..."
            className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400"
          />
        </div>

        {/* Interactive Notification Center */}
        <NotificationCenter />

        {/* User Avatar Badge */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-700 to-amber-400 p-0.5 shadow-md shadow-blue-500/10">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-xs text-blue-900">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
