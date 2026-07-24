import React from "react";
import Link from "next/link";
import { BgdLogo } from "@/components/shared/BgdLogo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-white via-blue-50/50 to-amber-50/30">
      <div className="w-full max-w-md space-y-6">
        {/* Header logo */}
        <div className="flex justify-center">
          <Link href="/">
            <BgdLogo size="lg" />
          </Link>
        </div>

        {/* Content Box */}
        {children}

        {/* Footer info */}
        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} BeGoodDisciple (BGD) • Plateforme de Suivi & Compte Rendu Spirituel
        </p>
      </div>
    </div>
  );
}
