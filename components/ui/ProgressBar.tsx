import React from "react";

interface LinearProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showValue?: boolean;
  colorVariant?: "blue" | "gold" | "emerald";
  height?: "sm" | "md" | "lg";
  className?: string;
}

export const LinearProgressBar: React.FC<LinearProgressBarProps> = ({
  value,
  label,
  showValue = true,
  colorVariant = "blue",
  height = "md",
  className = "",
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const heightClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const gradientFills = {
    blue: "bg-gradient-to-r from-blue-500 to-indigo-700 shadow-blue-500/20",
    gold: "bg-gradient-to-r from-amber-400 to-amber-600 shadow-amber-500/20",
    emerald: "bg-gradient-to-r from-emerald-400 to-teal-600 shadow-emerald-500/20",
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs font-semibold">
          {label && <span className="text-slate-600 font-medium">{label}</span>}
          {showValue && <span className="text-slate-900 font-bold">{clampedValue}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 ${heightClasses[height]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out shadow-sm ${gradientFills[colorVariant]}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};

interface CircularProgressBarProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  colorVariant?: "blue" | "gold" | "emerald";
  className?: string;
}

export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  value,
  size = 140,
  strokeWidth = 12,
  label,
  sublabel,
  colorVariant = "blue",
  className = "",
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  const gradientIds = {
    blue: "circularBlueGradient",
    gold: "circularGoldGradient",
    emerald: "circularEmeraldGradient",
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="circularBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="circularGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="circularEmeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        
        {/* Track Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress Stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientIds[colorVariant]})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
        <span className="text-2xl font-extrabold font-heading text-slate-900 tracking-tight">
          {clampedValue}%
        </span>
        {label && <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">{label}</span>}
        {sublabel && <span className="text-[10px] text-slate-400">{sublabel}</span>}
      </div>
    </div>
  );
};
