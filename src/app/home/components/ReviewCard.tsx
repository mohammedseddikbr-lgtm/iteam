// components/home/ReviewCard.tsx
// Optimized Server Component - CSS effects, no Framer infinite anims

import { Star, Quote, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  nom: string;
  role: string;
  contenu: string;
  note: number;
  avatar: string;
  logoEntreprise?: string;
  projet?: string;
  pleineLargeur?: boolean;
}

export const ReviewCard = ({
  nom,
  role,
  contenu,
  note,
  avatar,
  logoEntreprise,
  projet,
  pleineLargeur = false
}: ReviewCardProps) => {
  return (
    <div className={cn(
      "relative group h-full p-8 rounded-3xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500",
      pleineLargeur && "w-full"
    )}>
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center" />
      </div>

      {/* Quote Icon */}
      <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <Quote className="w-24 h-24" />
      </div>

      {/* Avatar */}
      <div className="absolute -top-6 -left-6 z-10">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-white/10 overflow-hidden animate-pulse">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <span className="text-blue-300 text-xs font-bold">{avatar}</span>
              </div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-4">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-8 ml-20">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-6 h-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12",
                  i < note 
                    ? "fill-yellow-400 text-yellow-400 group-hover:fill-yellow-300" 
                    : "fill-gray-800 text-gray-800"
                )}
              />
            ))}
          </div>
          <div className="ml-3 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20">
            <span className="text-sm font-semibold text-yellow-400">{note}/5</span>
          </div>
        </div>

        {/* Review */}
        <div className="relative">
          <Quote className="absolute -top-2 -left-2 w-6 h-6 text-blue-400/30" />
          <p className="text-xl text-gray-200 leading-relaxed mb-10 pl-4 italic font-light">
            "{contenu}"
          </p>
        </div>

        {/* Author */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 animate-spin slow">
                {avatar}
              </div>
              {logoEntreprise && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <span className="text-xs font-bold text-white">{logoEntreprise}</span>
                </div>
              )}
            </div>
            <div>
              <h4 className="font-bold text-white text-lg group-hover:text-cyan-100 transition-colors duration-300">
                {nom}
              </h4>
              <p className="text-gray-400 text-sm">{role}</p>
            </div>
          </div>

          {projet && (
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/20 group-hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-300">{projet}</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Particles - CSS keyframe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[0,1,2].map(i => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full animate-float"
            style={{
              left: `${20 + i * 30}%`,
              top: "20%",
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

