"use client";

import React from "react";
import { Plus, Target, BookOpen, Clock, Flame, HeartHandshake } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LinearProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";

export default function ObjectifsPage() {
  const goals = [
    {
      id: "1",
      title: "Prière Quotidienne Intense",
      category: "Prière",
      target: "45 min / jour",
      progress: 85,
      icon: Clock,
      variant: "blue" as const,
    },
    {
      id: "2",
      title: "Lecture Intégrale Nouveau Testament",
      category: "Lecture Biblique",
      target: "4 chapitres / jour",
      progress: 100,
      icon: BookOpen,
      variant: "gold" as const,
    },
    {
      id: "3",
      title: "Jeûne d'Intercession Hebdomadaire",
      category: "Jeûne",
      target: "1 jour / semaine",
      progress: 50,
      icon: Flame,
      variant: "blue" as const,
    },
    {
      id: "4",
      title: "Évangélisation & Témoignage",
      category: "Évangélisation",
      target: "2 personnes / semaine",
      progress: 75,
      icon: HeartHandshake,
      variant: "emerald" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900">
            Mes Objectifs Spirituels
          </h2>
          <p className="text-xs text-slate-500">
            Fixez vos objectifs de croissance et suivez votre progression en continu.
          </p>
        </div>

        <Button variant="gold" size="md" icon={<Plus className="w-4 h-4" />}>
          Nouveau grand objectif
        </Button>
      </div>

      {/* Grid of Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const Icon = goal.icon;
          return (
            <Card key={goal.id} variant="gradient" hoverEffect className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-heading text-slate-900">
                      {goal.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{goal.target}</p>
                  </div>
                </div>
                <Badge variant={goal.progress === 100 ? "success" : "info"} size="sm">
                  {goal.category}
                </Badge>
              </div>

              <LinearProgressBar
                value={goal.progress}
                colorVariant={goal.variant}
                showValue
              />

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Statut : {goal.progress === 100 ? "Objectif atteint !" : "En cours"}</span>
                <button className="text-blue-600 hover:text-blue-900 font-bold">
                  Éditer
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
