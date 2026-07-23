"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, RotateCcw } from "lucide-react";
import { format, addDays, subDays, isToday, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { getTodayDateString } from "@/lib/suivi-service";

interface DateSelectorProps {
  selectedDate: string; // YYYY-MM-DD
  onDateChange: (newDateStr: string) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const currentDateObj = parseISO(selectedDate);
  const isSelectedToday = isToday(currentDateObj);

  const handlePrevDay = () => {
    const prev = subDays(currentDateObj, 1);
    onDateChange(format(prev, "yyyy-MM-dd"));
  };

  const handleNextDay = () => {
    const next = addDays(currentDateObj, 1);
    onDateChange(format(next, "yyyy-MM-dd"));
  };

  const handleResetToday = () => {
    onDateChange(getTodayDateString());
  };

  const formattedDisplayDate = format(currentDateObj, "EEEE d MMMM yyyy", { locale: fr });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-blue-100 shadow-sm">
      {/* Date Title Display */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
          <CalendarIcon className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-extrabold font-heading text-slate-900 capitalize">
              {formattedDisplayDate}
            </span>
            {isSelectedToday ? (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Aujourd'hui
              </span>
            ) : (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Historique
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            {isSelectedToday
              ? "Saisie en temps réel de votre journal du jour"
              : "Consultation et modification de votre saisie passée"}
          </p>
        </div>
      </div>

      {/* Controls: Prev, Next, Today shortcut */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevDay}
          className="p-2 rounded-xl border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50 text-slate-700 transition-colors"
          title="Jour précédent"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {!isSelectedToday && (
          <button
            onClick={handleResetToday}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Revenir à aujourd'hui</span>
          </button>
        )}

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            if (e.target.value) onDateChange(e.target.value);
          }}
          className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 bg-white outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        />

        <button
          onClick={handleNextDay}
          className="p-2 rounded-xl border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50 text-slate-700 transition-colors"
          title="Jour suivant"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
