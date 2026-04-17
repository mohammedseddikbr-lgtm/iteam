// src/app/home/components/PackCard.tsx
// Fixed with onSelect prop + debug logs + button click

import { Check, ArrowRight, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PackItem {
  nom: string;
  icone: React.ReactNode;
  prix: string;
  periode: string;
  couleur: string;
  couleurFond: string;
  couleurBordure: string;
  populaire: boolean;
  fonctionnalites: string[];
  cta: string;
  description: string;
}

interface PackCardProps {
  pack: PackItem;
  index?: number;
  onSelect?: (pack: PackItem) => void;
}

export const PackCard = ({ pack, index, onSelect }: PackCardProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("[PackCard] Card clicked:", pack.nom, "onSelect:", typeof onSelect);
    
    if (pack.nom === "BUSINESS") {
      window.location.href = "/contact";
    } else if (onSelect) {
      onSelect(pack);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("[PackCard] Button clicked:", pack.nom);
    handleClick(e as any);
  };

  return (
    <div 
      className="relative group cursor-pointer transition-all duration-500 hover:shadow-2xl"
      onClick={handleClick}
    >
      {/* Badge */}
      {pack.populaire && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-xl border border-purple-500/30 shadow-lg">
            <Crown className="w-4 h-4" />
            <span className="text-xs font-semibold">Le Plus Populaire</span>
          </div>
        </div>
      )}

      {/* Glow */}
      <div className={cn("absolute -inset-0.5 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500", pack.couleur)} />

      {/* Card */}
      <div className={cn("relative h-full rounded-3xl backdrop-blur-xl border transition-all duration-300 overflow-hidden hover:-translate-y-2", pack.couleurFond, pack.couleurBordure)}>
        {/* Header */}
        <div className="p-8 bg-gradient-to-b from-transparent to-black/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{pack.nom}</h3>
              <p className="text-gray-400 text-sm">{pack.description}</p>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
              {pack.icone}
            </div>
          </div>
          <div className="mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-white">{pack.prix}</span>
              <span className="text-gray-400">{pack.periode}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 pt-0">
          <ul className="space-y-3 my-8">
            {pack.fonctionnalites.map((f, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="p-1 rounded-full mt-1 bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                  <Check className="w-3 h-3 text-green-400" />
                </div>
                <span className="text-gray-300">{f}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="mt-8">
            <button
              onClick={handleButtonClick}
              className={cn(
                "inline-flex items-center justify-center w-full py-4 px-6 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 group relative overflow-hidden",
                pack.populaire ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25" : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-blue-500/25"
              )}
            >
              <span className="flex items-center justify-center text-xs gap-2">
                {pack.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 transition-all duration-300" />
      </div>
    </div>
  );
};

