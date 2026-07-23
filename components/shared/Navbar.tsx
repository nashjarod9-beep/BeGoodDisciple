import React from "react";
import Link from "next/link";
import { BgdLogo } from "./BgdLogo";
import { Button } from "../ui/Button";
import { ArrowRight, UserCheck } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-blue-100/60 bg-white/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="hover:opacity-95 transition-opacity">
          <BgdLogo size="md" />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#concept"
            className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors"
          >
            Le Concept BGD
          </Link>
          <Link
            href="#features"
            className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors"
          >
            Fonctionnalités
          </Link>
          <Link
            href="#mentorat"
            className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors"
          >
            Pour les Mentors (FD)
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" icon={<UserCheck className="w-4 h-4" />}>
              Se connecter
            </Button>
          </Link>

          <Link href="/register">
            <Button
              variant="gold"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Créer mon compte
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
