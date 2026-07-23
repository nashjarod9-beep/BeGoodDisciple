import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "draft" | "sent" | "reviewed" | "success" | "warning" | "gold" | "info" | "neutral";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "info",
  size = "md",
  dot = true,
  ...props
}) => {
  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 font-semibold",
    md: "text-xs px-2.5 py-1 font-semibold",
  };

  const variantStyles = {
    draft: "bg-slate-100 text-slate-700 border border-slate-200",
    sent: "bg-blue-50 text-blue-700 border border-blue-200/80",
    reviewed: "bg-purple-50 text-purple-700 border border-purple-200/80",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
    warning: "bg-amber-50 text-amber-800 border border-amber-200/80",
    gold: "bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 font-bold shadow-sm shadow-amber-500/20",
    info: "bg-sky-50 text-sky-700 border border-sky-200/80",
    neutral: "bg-slate-50 text-slate-600 border border-slate-200",
  };

  const dotColors = {
    draft: "bg-slate-400",
    sent: "bg-blue-500",
    reviewed: "bg-purple-500",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    gold: "bg-blue-950",
    info: "bg-sky-500",
    neutral: "bg-slate-400",
  };

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1.5 rounded-full tracking-wide transition-colors",
          sizeStyles[size],
          variantStyles[variant],
          className
        )
      )}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 animate-pulse ${dotColors[variant]}`}
        />
      )}
      {children}
    </span>
  );
};
