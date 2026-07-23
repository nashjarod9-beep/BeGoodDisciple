"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { requestPasswordReset } from "@/lib/auth-service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const res = await requestPasswordReset(email);
    setLoading(false);
    setMessage(res.message);
  };

  return (
    <Card variant="gradient" className="shadow-2xl shadow-blue-950/10 border border-blue-100">
      <CardHeader className="text-center space-y-1 pb-4">
        <CardTitle className="text-2xl font-extrabold font-heading text-slate-900">
          Mot de passe oublié
        </CardTitle>
        <p className="text-xs text-slate-500">
          Saisissez votre email et nous vous enverrons les instructions de réinitialisation.
        </p>
      </CardHeader>

      <CardContent>
        {message ? (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{message}</span>
            </div>
            <Link href="/login" className="inline-block pt-2">
              <Button variant="outline" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
                Retour à la connexion
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="pt-2">
              <Button
                type="submit"
                variant="gold"
                size="lg"
                fullWidth
                disabled={loading}
                icon={<Send className="w-4 h-4" />}
              >
                {loading ? "Envoi..." : "Envoyer les instructions"}
              </Button>
            </div>

            <div className="pt-4 text-center">
              <Link href="/login" className="text-xs text-slate-600 font-semibold hover:text-blue-900 inline-flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Retour à la connexion</span>
              </Link>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
