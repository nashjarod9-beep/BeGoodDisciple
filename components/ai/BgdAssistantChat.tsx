"use client";

import React, { useState } from "react";
import { MessageSquare, Send, Sparkles, X, Bot, User, Loader2 } from "lucide-react";
import { Button } from "../ui/Button";
import { getCurrentUserSession } from "@/lib/auth-service";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
}

export const BgdAssistantChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "assistant",
      text: "Shalom ! Je suis votre Assistant Spirituel BGD. Comment puis-je vous encourager ou analyser votre progression aujourd'hui ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    "Comment évolue ma prière ce mois-ci ?",
    "Que me conseilles-tu d'améliorer ?",
    "Donne-moi un verset d'encouragement.",
  ];

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput("");
    setLoading(true);

    const userSession = getCurrentUserSession();

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: textToSend,
          context: {
            discipleName: `${userSession?.firstName || "Jean"} ${userSession?.lastName || "Disciple"}`,
            mentorEmail: userSession?.activeMentorEmail || "pastor.paul@example.com",
            activeGoalsSummary: "Prière 45 min/jour, Lecture Biblique 4 chapitres/jour, 2 personnes évangélisées/semaine",
            recentStatsSummary: "Dernière semaine : 5h15 de prière (85%), 32 chapitres lus (100%), score régularité 92%",
          },
        }),
      });

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: "assistant",
        text: data.reply || "Félicitations pour votre persévérance ! Le Seigneur bénit votre fidélité.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: "assistant",
        text: "Votre persévérance porte du fruit ! Continuez d'avancer pas à pas avec joie.",
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-blue-900 via-blue-800 to-amber-500 text-white shadow-2xl shadow-blue-950/40 hover:scale-105 transition-all duration-300 flex items-center gap-3 ${
          isOpen ? "hidden" : "flex"
        }`}
      >
        <Sparkles className="w-6 h-6 fill-amber-300 text-amber-300 animate-pulse" />
        <span className="font-bold font-heading text-sm hidden sm:inline">Assistant BGD</span>
      </button>

      {/* Chat Window Box */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-blue-950/30 border border-blue-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-amber-400 text-blue-950 font-bold flex items-center justify-center">
                <Sparkles className="w-5 h-5 fill-blue-950" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-heading">Assistant IA BeGoodDisciple</h4>
                <p className="text-[10px] text-amber-300 font-medium">Pastoral & Analyse personnalisée</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-300 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Chips */}
          <div className="p-3 bg-blue-50/60 border-b border-blue-100 flex flex-wrap gap-1.5">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                className="text-[11px] bg-white border border-blue-200/80 hover:border-blue-400 text-blue-950 px-2.5 py-1 rounded-full font-medium transition-colors"
              >
                ✨ {qp}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="p-4 space-y-3.5 h-80 overflow-y-auto bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 text-xs ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-blue-900 text-amber-300 font-bold flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    🤖
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-900 text-white rounded-tr-none shadow-sm"
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-blue-900 font-semibold p-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>L'assistant BGD analyse vos données...</span>
              </div>
            )}
          </div>

          {/* Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez une question sur votre suivi..."
              className="flex-1 px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
            <Button
              type="submit"
              variant="gold"
              size="sm"
              disabled={loading || !input.trim()}
              icon={<Send className="w-4 h-4" />}
            />
          </form>
        </div>
      )}
    </>
  );
};
