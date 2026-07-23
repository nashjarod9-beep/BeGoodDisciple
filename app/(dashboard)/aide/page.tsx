"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, Sparkles, BookOpen, Clock, Send, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export default function HelpFaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: "Fonctionnement général",
      question: "Qu'est-ce que BeGoodDisciple (BGD) ?",
      answer: "BeGoodDisciple est une plateforme SaaS de redevabilité spirituelle qui aide un disciple à définir ses objectifs de l'année, enregistrer quotidiennement ses progrès (prière, lecture, méditation, évangélisation), et transmettre automatiquement des comptes rendus structurés à son Faiseur de Disciple (mentor).",
    },
    {
      category: "Objectifs & Suivi",
      question: "Comment sont générés mes blocs de suivi quotidien ?",
      answer: "La page 'Aujourd'hui' (/suivi) est dynamique. Seules les catégories que vous avez activées dans vos 'Objectifs de l'année' apparaissent. Si vous choisissez de suivre la lecture biblique et la prière, seuls ces blocs seront affichés.",
    },
    {
      category: "Comptes Rendus & Mentor",
      question: "Comment mon Faiseur de Disciple reçoit-il mes comptes rendus ?",
      answer: "À la fin de chaque période (hebdomadaire ou mensuelle selon vos préférences), les comptes rendus sont agrégés avec une synthèse IA et envoyés sous forme de document PDF soigné par email à vous-même et à votre mentor.",
    },
    {
      category: "Chronomètre & Prière",
      question: "Comment utiliser le chronomètre de prière interactive ?",
      answer: "Sur la page 'Suivi', vous trouverez le chronomètre. Cliquez sur 'Démarrer la prière'. À l'arrêt, une pop-up vous propose d'enregistrer le temps écoulé ainsi que votre principal fardeau/sujet de prière.",
    },
    {
      category: "Intelligence Artificielle DeepSeek",
      question: "À quoi sert l'IA DeepSeek dans la plateforme ?",
      answer: "L'IA DeepSeek apporte un accompagnement pastoral bienveillant : elle rédige les synthèses de vos comptes rendus, propose des encouragements quotidiens sur le dashboard, détecte les baisses de rythme pour vous conseiller doucement, et répond à vos questions sur l'Assistant BGD.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold mb-2">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Centre d'Aide & FAQ</span>
        </div>
        <h2 className="text-2xl font-extrabold font-heading text-slate-900">
          Comment fonctionne BeGoodDisciple ?
        </h2>
        <p className="text-xs text-slate-500">
          Retrouvez toutes les réponses aux questions fréquemment posées par les disciples et mentors.
        </p>
      </div>

      {/* Feature Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="gradient" className="space-y-2 p-5">
          <Clock className="w-6 h-6 text-blue-700" />
          <h4 className="text-sm font-bold font-heading text-slate-900">Suivi Quotidien Sur-Mesure</h4>
          <p className="text-xs text-slate-500">Blocs dynamiques et chronomètre de prière avec sauvegarde automatique du fardeau.</p>
        </Card>

        <Card variant="gradient" className="space-y-2 p-5">
          <Send className="w-6 h-6 text-amber-600" />
          <h4 className="text-sm font-bold font-heading text-slate-900">Redevabilité Automatisée</h4>
          <p className="text-xs text-slate-500">Comptes rendus agrégés transmis en PDF à votre mentor par email.</p>
        </Card>

        <Card variant="gradient" className="space-y-2 p-5">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h4 className="text-sm font-bold font-heading text-slate-900">IA Pastorale DeepSeek</h4>
          <p className="text-xs text-slate-500">Synthèses encourageantes, rappels doux et assistant conversationnel RAG.</p>
        </Card>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Questions Fréquentes (FAQ)</h3>

        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="info" size="sm">{faq.category}</Badge>
                  <span>{faq.question}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen && (
                <div className="p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
