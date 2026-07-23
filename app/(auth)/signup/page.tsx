"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, UserCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { signUpWithEmail } from "@/lib/auth-service";
import { UserRole } from "@/types";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleSelection, setRoleSelection] = useState<"DISCIPLE" | "FAISEUR_DE_DISCIPLE" | "BOTH">("DISCIPLE");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const roles: UserRole[] =
      roleSelection === "BOTH"
        ? ["DISCIPLE", "FAISEUR_DE_DISCIPLE"]
        : [roleSelection];

    const result = await signUpWithEmail(email, password, roles);
    setLoading(false);

    if (result.success) {
      setMessage({ type: "success", text: "Compte créé ! Redirection vers l'onboarding..." });
      setTimeout(() => {
        router.push("/onboarding");
      }, 800);
    } else {
      setMessage({ type: "error", text: "Erreur lors de l'inscription." });
    }
  };

  return (
    <Card variant="gradient" className="shadow-2xl shadow-blue-950/10 border border-blue-100">
      <CardHeader className="text-center space-y-1 pb-4">
        <CardTitle className="text-2xl font-extrabold font-heading text-slate-900">
          Rejoindre BeGoodDisciple
        </CardTitle>
        <p className="text-xs text-slate-500">
          Créez votre compte pour commencer votre suivi spirituel ou encadrer des disciples.
        </p>
      </CardHeader>

      <CardContent>
        {message && (
          <div
            className={`p-3 rounded-xl mb-4 text-xs font-semibold flex items-center gap-2 ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Role Selector Buttons */}
        <div className="space-y-2 mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Votre rôle sur la plateforme
          </label>
          <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setRoleSelection("DISCIPLE")}
              className={`py-2 rounded-lg transition-all ${
                roleSelection === "DISCIPLE"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Disciple
            </button>
            <button
              type="button"
              onClick={() => setRoleSelection("FAISEUR_DE_DISCIPLE")}
              className={`py-2 rounded-lg transition-all ${
                roleSelection === "FAISEUR_DE_DISCIPLE"
                  ? "bg-gradient-to-r from-amber-400 to-amber-600 text-blue-950 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Mentor (FD)
            </button>
            <button
              type="button"
              onClick={() => setRoleSelection("BOTH")}
              className={`py-2 rounded-lg transition-all ${
                roleSelection === "BOTH"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-800 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Les Deux
            </button>
          </div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Adresse Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Mot de passe (8 caractères minimum)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              fullWidth
              disabled={loading}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              {loading ? "Création en cours..." : "Créer mon compte"}
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
