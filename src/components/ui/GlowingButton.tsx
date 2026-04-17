// src/components/ui/GlowingButton.tsx
"use client";

import { ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface GlowingButtonProps {
  children: ReactNode;
  className?: string;
  as?: 'button' | 'div' | 'span';
  onClick?: () => void;
  disabled?: boolean;
}

export const GlowingButton = ({ 
  children, 
  className, 
  as: Component = 'button', 
  onClick,
  disabled,
  ...props 
}: GlowingButtonProps) => {
  
  return (
    <Component
      className={cn(
        "relative px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25",
        Component !== 'button' && "cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      {...(Component === 'button' && { 
        type: 'button',
        disabled 
      })}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Component>
  );
};