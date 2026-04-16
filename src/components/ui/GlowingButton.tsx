// src/components/ui/GlowingButton.tsx
"use client";

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface GlowingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const GlowingButton = ({ children, className, ...props }: GlowingButtonProps) => {
  return (
    <button
      className={cn(
        "relative px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};