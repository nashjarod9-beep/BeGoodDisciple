import React from "react";

interface BgdLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export const BgdLogo: React.FC<BgdLogoProps> = ({
  size = "md",
  showText = true,
  className = "",
}) => {
  const sizeDimensions = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Circle Gradient Icon with BGD Monogram SVG */}
      <div className={`relative flex items-center justify-center rounded-full shrink-0 ${sizeDimensions[size]} shadow-md shadow-blue-500/20`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full rounded-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bgdLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="60%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="bgdGoldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25"/>
            </filter>
          </defs>

          {/* Outer circle with gradient */}
          <circle cx="50" cy="50" r="48" fill="url(#bgdLogoGradient)" />
          
          {/* Decorative ring arc */}
          <path
            d="M 22 50 A 28 28 0 0 1 78 50"
            stroke="url(#bgdGoldAccent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="4 4"
            opacity="0.8"
          />

          {/* Monogram "BGD" */}
          <text
            x="50"
            y="58"
            fontFamily="'Poppins', 'Inter', sans-serif"
            fontWeight="800"
            fontSize="32"
            fill="#FFFFFF"
            textAnchor="middle"
            filter="url(#glow)"
            letterSpacing="-0.5"
          >
            BGD
          </text>

          {/* Golden crown / star dot top right */}
          <circle cx="72" cy="28" r="4" fill="url(#bgdGoldAccent)" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-extrabold tracking-tight font-heading ${textSizes[size]}`}>
            <span className="text-blue-900">BeGood</span>
            <span className="text-amber-500">Disciple</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-0.5">
            Suivi & Compte Rendu Spirituel
          </span>
        </div>
      )}
    </div>
  );
};
