"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, UserCheck, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const [role, setRole] = useState<"DISCIPLE" | "MENTOR">("DISCIPLE");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/dashboard";
  };

  return (
    <Card variant="gradient" className="shadow-2xl shadow-blue-950/10 border border-blue-100">
      <CardHeader className="text-center space-y-1 pb-4">
        <CardTitle className="text-2xl font-extrabold font-heading text-slate-900">
          Créer un compte BGD
        </CardTitle>
        <p className="text-xs text-slate-500">
          Rejoignez la communauté BeGoodDisciple et commencez votre suivi.
        </p>
      </CardHeader>

      <CardContent>
        {/* Role Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole("DISCIPLE")}
            className={`flex-1 py-2 rounded-lg transition-all ${
              role === "DISCIPLE"
                ? "bg-gradient-to-r from-blue-600 to-indigo-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Je suis Disciple
          </button>
          <button
            type="button"
            onClick={() => setRole("MENTOR")}
            className={`flex-1 py-2 rounded-lg transition-all ${
              role === "MENTOR"
                ? "bg-gradient-to-r from-amber-400 to-amber-600 text-blue-950 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Je suis Mentor (FD)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Nom complet
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="Ex: Jean Disciple"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Adresse Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="votre.email@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {role === "DISCIPLE" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email de votre Mentor / FD (Optionnel)
              </label>
              <div className="relative">
                <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  placeholder="mentor.fd@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              fullWidth
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Créer mon compte
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          Vous avez déjà un compte ?{" "}
          <Link href="/login" className="font-bold text-blue-900 hover:text-amber-600">
            Se connecter
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
