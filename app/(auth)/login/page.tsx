"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { signInWithEmail, sendMagicLink } from "@/lib/auth-service";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"password" | "magic">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const result = await signInWithEmail(email, password);
    setLoading(false);

    if (result.success) {
      setMessage({ type: "success", text: "Connexion réussie ! Redirection..." });
      setTimeout(() => {
        if (!result.session?.onboardingCompleted) {
          router.push("/onboarding");
        } else {
          router.push("/dashboard");
        }
      }, 800);
    } else {
      setMessage({ type: "error", text: "Identifiants incorrects. Veuillez réessayer." });
    }
  };

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const result = await sendMagicLink(email);
    setLoading(false);
    setMessage({ type: "success", text: result.message });
  };

  return (
    <Card variant="gradient" className="shadow-2xl shadow-blue-950/10 border border-blue-100">
      <CardHeader className="text-center space-y-1 pb-4">
        <CardTitle className="text-2xl font-extrabold font-heading text-slate-900">
          Connexion à BeGoodDisciple
        </CardTitle>
        <p className="text-xs text-slate-500">
          Accédez à votre espace Disciple ou Mentor (FD).
        </p>
      </CardHeader>

      <CardContent>
        {/* Toggle Login Method Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setTab("password"); setMessage(null); }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              tab === "password"
                ? "bg-gradient-to-r from-blue-600 to-indigo-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Email + Mot de passe
          </button>
          <button
            type="button"
            onClick={() => { setTab("magic"); setMessage(null); }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              tab === "magic"
                ? "bg-gradient-to-r from-amber-400 to-amber-600 text-blue-950 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ✨ Lien Magique (Magic Link)
          </button>
        </div>

        {/* Status Message Alert */}
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

        {/* Tab 1: Password Form */}
        {tab === "password" ? (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
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
                  placeholder="jean.disciple@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Mot de passe
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-800 font-semibold hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
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
                icon={<LogIn className="w-5 h-5" />}
              >
                {loading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </div>
          </form>
        ) : (
          /* Tab 2: Magic Link Form */
          <form onSubmit={handleMagicLinkLogin} className="space-y-4">
            <p className="text-xs text-slate-600">
              Saisissez votre email. Nous vous enverrons un lien d'accès direct sans mot de passe.
            </p>
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
                  placeholder="jean.disciple@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                icon={<Sparkles className="w-5 h-5 fill-amber-300 text-amber-300" />}
              >
                {loading ? "Envoi du lien..." : "Recevoir mon Lien Magique"}
              </Button>
            </div>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          Pas encore de compte ?{" "}
          <Link href="/signup" className="font-bold text-blue-900 hover:text-amber-600">
            Créer un compte
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
