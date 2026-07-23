"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BgdLogo } from "./BgdLogo";
import {
  LayoutDashboard,
  Target,
  CalendarCheck,
  FileText,
  User,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "../ui/Badge";

const navItems = [
  {
    label: "Accueil",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Objectifs",
    href: "/objectifs",
    icon: Target,
  },
  {
    label: "Suivi quotidien",
    href: "/suivi",
    icon: CalendarCheck,
  },
  {
    label: "Comptes rendus",
    href: "/comptes-rendus",
    icon: FileText,
  },
  {
    label: "Profil",
    href: "/profil",
    icon: User,
  },
];

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen = false,
  onMobileClose,
}) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-gradient-to-b from-white via-blue-50/20 to-slate-50 border-r border-blue-100/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Header section */}
        <div className="p-6">
          <Link href="/dashboard" className="block mb-8" onClick={onMobileClose}>
            <BgdLogo size="md" />
          </Link>

          {/* User Role Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-md shadow-blue-950/20 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-400 text-blue-950 font-bold flex items-center justify-center text-sm shadow-sm">
                JD
              </div>
              <div>
                <p className="text-xs font-bold font-heading leading-snug">Jean Disciple</p>
                <p className="text-[10px] text-blue-200">Mentor: Past. Paul</p>
              </div>
            </div>
            <Badge variant="gold" size="sm" dot={false}>
              Disciple
            </Badge>
          </div>

          {/* Navigation links */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Menu Principal
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onMobileClose}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/20"
                      : "text-slate-600 hover:text-blue-900 hover:bg-blue-50/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                        isActive ? "text-amber-300" : "text-slate-400 group-hover:text-blue-600"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-amber-300" />}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom footer section */}
        <div className="p-6 border-t border-slate-200/60 bg-white/50">
          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 mb-4 flex items-center gap-2 text-xs text-blue-900">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-medium text-[11px]">Redevabilité active avec le FD</span>
          </div>

          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Se déconnecter</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
