// components/pages/components/ServiceCard.tsx (optimized)
"use client";

import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icone: React.ReactNode;
  titre: string;
  description: string;
  fonctionnalites: string[];
  degrade: string;
  listeFonctionnalites?: { texte: string; icone: React.ReactNode }[];
  index: number;
}

export const ServiceCard = ({
  icone,
  titre,
  description,
  fonctionnalites,
  degrade,
  listeFonctionnalites = [],
  index
}: ServiceCardProps) => {
  return (
    <div className="relative group h-full flex flex-col">
      {/* Effet de lueur */}
      <div className={cn(
        "absolute -inset-0.5 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        degrade
      )} />

      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 group-hover:border-white/30 transition-all duration-300 flex flex-col flex-1 hover:-translate-y-2">
        {/* Icône */}
        <div className="mb-8">
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center">
            <div className={cn(
              "transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12",
              degrade.replace("from-", "text-").split(" ")[0]
            )}>
              {icone}
            </div>
          </div>
        </div>

        {/* Titre & Description */}
        <h3 className="text-2xl font-bold text-white mb-4">{titre}</h3>
        <p className="text-gray-400 leading-relaxed mb-8 flex-1">{description}</p>

        {/* Fonctionnalités */}
        <div className="space-y-3 mb-8">
          {listeFonctionnalites.length > 0 ? (
            listeFonctionnalites.map((fonctionnalite, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm">
                <div className={cn(
                  "p-1 rounded-full",
                  degrade.replace("from-", "from-").replace("to-", "to-").replace("500", "500/20")
                )}>
                  {fonctionnalite.icone}
                </div>
                <span className="text-gray-300">{fonctionnalite.texte}</span>
              </div>
            ))
          ) : (
            <div className="flex flex-wrap gap-2">
              {fonctionnalites.map((fonctionnalite, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300 border border-white/10"
                >
                  {fonctionnalite}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};