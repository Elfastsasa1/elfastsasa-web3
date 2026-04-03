import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "error" | "warning" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANTS: Record<BadgeVariant, string> = {
  default: "bg-border text-text-secondary",
  success: "bg-acid/10 text-acid border border-acid/20",
  error: "bg-danger/10 text-danger border border-danger/20",
  warning: "bg-ember/10 text-ember border border-ember/20",
  info: "bg-plasma/10 text-plasma-light border border-plasma/20",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md",
        "font-mono text-[11px] font-medium",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
