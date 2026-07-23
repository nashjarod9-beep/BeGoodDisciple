import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gradient" | "outline" | "glass";
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = "default", hoverEffect = false, ...props }, ref) => {
    const variantStyles = {
      default: "bg-white border border-slate-100 shadow-sm shadow-slate-200/50",
      gradient:
        "bg-gradient-to-br from-white via-blue-50/40 to-amber-50/30 border border-blue-100/60 shadow-md shadow-blue-900/5",
      glass:
        "bg-white/80 backdrop-blur-md border border-white/60 shadow-lg shadow-blue-950/5",
      outline: "bg-transparent border border-slate-200",
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            "rounded-2xl p-6 transition-all duration-300",
            variantStyles[variant],
            hoverEffect && "hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1",
            className
          )
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={twMerge(clsx("flex flex-col space-y-1.5 pb-4", className))} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h3
    className={twMerge(
      clsx("text-lg font-bold font-heading text-slate-900 tracking-tight", className)
    )}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => (
  <p className={twMerge(clsx("text-xs text-slate-500 font-medium", className))} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => <div className={twMerge(clsx("pt-0", className))} {...props}>{children}</div>;

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={twMerge(clsx("flex items-center pt-4 border-t border-slate-100 mt-4", className))}
    {...props}
  >
    {children}
  </div>
);

// Specialty Stat Card
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: { value: string; isPositive: boolean };
  badgeText?: string;
  variant?: "blue" | "gold" | "slate";
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  badgeText,
  variant = "blue",
}) => {
  const iconBg = {
    blue: "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-blue-500/20",
    gold: "bg-gradient-to-br from-amber-400 to-amber-600 text-blue-950 shadow-amber-500/20",
    slate: "bg-slate-800 text-white shadow-slate-800/20",
  };

  return (
    <Card variant="gradient" hoverEffect className="relative overflow-hidden">
      {badgeText && (
        <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
          {badgeText}
        </span>
      )}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
            {value}
          </div>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          {trend && (
            <div className="flex items-center gap-1 mt-2 text-xs font-medium">
              <span
                className={trend.isPositive ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}
              >
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </span>
              <span className="text-slate-400">vs période précédente</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-2xl shadow-lg shrink-0 ${iconBg[variant]}`}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};
