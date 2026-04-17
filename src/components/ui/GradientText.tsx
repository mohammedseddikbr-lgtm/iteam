// src/components/ui/GradientText.tsx
"use client";

import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export const GradientText = ({ children, className = "" }: GradientTextProps) => {
  return (
    <span className={`bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};