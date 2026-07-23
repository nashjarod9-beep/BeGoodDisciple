import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeGoodDisciple (BGD) - Suivi & Mentorat Spirituel",
  description:
    "Plateforme SaaS de suivi de vie spirituelle permettant aux disciples d'envoyer automatiquement leurs comptes rendus à leur mentor (Faiseur de Disciple).",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-[#FAFCFF] text-slate-900">
        {children}
      </body>
    </html>
  );
}
