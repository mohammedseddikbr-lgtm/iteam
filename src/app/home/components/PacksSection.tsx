// components/pages/sections/PacksSection.tsx
"use client";

import { motion } from "framer-motion";
import { Crown, Infinity as InfinityIcon, ArrowRight, Gem, Shield as ShieldIcon } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { PackCard } from "../components/PackCard";

interface PackItem {
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

const packs: PackItem[] = [
  {
    nom: "BASIC",
    icone: <ShieldIcon className="w-12 h-12" />,
    prix: "45,000 DZD",
    periode: "/mois",
    couleur: "from-blue-500 to-cyan-500",
    couleurFond: "bg-gradient-to-br from-blue-500/5 to-cyan-500/5",
    couleurBordure: "border-blue-500/20",
    populaire: false,
    fonctionnalites: [
      "Gestion de la page (3 posts / semaine)",
      "Création de 10 visuels professionnels / mois",
      "Planning de contenu simple (hebdomadaire)",
      "Organisation et publication des posts",
      "Rapport mensuel synthétique",
      "Support basique"
    ],
    cta: "Choisir BASIC",
    description:
      "Idéale pour les petites entreprises ou nouvelles pages souhaitant démarrer une présence digitale."
  },
  {
    nom: "STANDARD",
    icone: <Gem className="w-12 h-12" />,
    prix: "80,000 DZD",
    periode: "/mois",
    couleur: "from-purple-500 to-pink-500",
    couleurFond: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
    couleurBordure: "border-purple-500/30",
    populaire: true,
    fonctionnalites: [
      "Gestion complète Facebook & Instagram",
      "Stratégie de contenu mensuelle",
      "20 publications professionnelles / mois",
      "Textes marketing optimisés",
      "Planning éditorial structuré",
      "Rapport mensuel détaillé (engagement & portée)",
      "Optimisation de la présence digitale"
    ],
    cta: "Choisir STANDARD",
    description:
      "Parfaite pour les entreprises de taille moyenne souhaitant une présence digitale performante et cohérente."
  },
  {
    nom: "BUSINESS",
    icone: <Crown className="w-12 h-12" />,
    prix: "Sur devis",
    periode: "",
    couleur: "from-amber-500 to-orange-500",
    couleurFond: "bg-gradient-to-br from-amber-500/10 to-orange-500/10",
    couleurBordure: "border-amber-500/30",
    populaire: false,
    fonctionnalites: [
      "Gestion avancée des réseaux sociaux",
      "Publications, modération et interaction",
      "Stratégie marketing digitale complète",
      "Analyse marché, concurrence et audience",
      "30 contenus premium / mois",
      "Vidéos marketing (reels, stories, formats courts)",
      "Gestion & optimisation des campagnes publicitaires",
      "Rapports hebdomadaires et mensuels",
      "Recommandations stratégiques personnalisées"
    ],
    cta: "Contactez-nous",
    description:
      "Solution complète pour les marques recherchant une gestion professionnelle et des résultats concrets."
  }
];


export const PacksSection = () => {
  return (
    <section className="md:py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <EnTeteSection />
        <GrillePacks packs={packs} />
        <CTAPersonnalise />
      </div>
    </section>
  );
};

const EnTeteSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-20"
    >
      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/30 mb-6">
        <Crown className="w-5 h-5 text-purple-400" />
        <span className="text-sm font-semibold text-purple-300">Solutions Flexibles</span>
      </div>
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
        Choisissez Votre <GradientText className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Plan Parfait</GradientText>
      </h2>
      <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        Sélectionnez la formule qui correspond le mieux aux besoins de votre entreprise. Tous les plans incluent notre qualité signature.
      </p>
    </motion.div>
  );
};

interface GrillePacksProps {
  packs: PackItem[];
}

const GrillePacks = ({ packs }: GrillePacksProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
      {packs.map((pack, index) => (
        <PackCard key={index} pack={pack} index={index} />
      ))}
    </div>
  );
};

const CTAPersonnalise = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="mt-20 text-center"
    >
      <div className="md:inline-flex flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 max-w-8xl mx-auto">
        <InfinityIcon className="w-8 h-8 hidden md:flex text-blue-400" />
        <div className="text-left">
          <h4 className="text-xl font-bold text-white">Besoin d'une Solution Personnalisée ?</h4>
          <p className="text-gray-400">Contactez-nous pour des packages d'entreprise sur mesure</p>
        </div>
        <GlowingButton className="ml-auto px-6 py-3">
          Obtenir un Devis Personnalisé
          <ArrowRight className="ml-2 w-4 h-4" />
        </GlowingButton>
      </div>
    </motion.div>
  );
};