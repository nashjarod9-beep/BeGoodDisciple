import React from "react";
import { BgdLogo } from "@/components/shared/BgdLogo";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-white via-blue-50/40 to-amber-50/30">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex justify-center">
          <BgdLogo size="lg" />
        </div>
        {children}
      </div>
    </div>
  );
}
