// components/pages/sections/ProcessTimelineSection.tsx
"use client";

import { Target, Calendar, Palette, Code2, CheckCircle, Rocket } from "lucide-react";
import { ProcessTimeline } from "./ProcessTimeLine";

const etapesProcessus = [
  { 
    numero: "01", 
    titre: "Analyse & Compréhension", 
    description: "Analyse de votre activité, de votre audience et de vos objectifs",
    icone: <Target className="w-6 h-6" />,
    couleur: "from-blue-500 to-cyan-500"
  },
  { 
    numero: "02", 
    titre: "Stratégie & Planification", 
    description: "Définition de la stratégie éditoriale et du planning de contenu",
    icone: <Calendar className="w-6 h-6" />,
    couleur: "from-cyan-500 to-emerald-500"
  },
  { 
    numero: "03", 
    titre: "Création de Contenu", 
    description: "Conception de visuels, textes et vidéos adaptés à votre marque",
    icone: <Palette className="w-6 h-6" />,
    couleur: "from-emerald-500 to-green-500"
  },
  { 
    numero: "04", 
    titre: "Publication & Gestion", 
    description: "Publication, modération et interaction avec votre communauté",
    icone: <Code2 className="w-6 h-6" />,
    couleur: "from-green-500 to-lime-500"
  },
  { 
    numero: "05", 
    titre: "Suivi & Optimisation", 
    description: "Analyse des performances et optimisation continue des contenus",
    icone: <CheckCircle className="w-6 h-6" />,
    couleur: "from-lime-500 to-yellow-500"
  },
  { 
    numero: "06", 
    titre: "Reporting", 
    description: "Rapports clairs avec indicateurs clés et recommandations",
    icone: <Rocket className="w-6 h-6" />,
    couleur: "from-yellow-500 to-orange-500"
  }
];

export const ProcessTimelineSection = () => {
  return (
    <section className="ms:py-32 px-4 sm:px-6 lg:px-8 relative">
      <ProcessTimeline etapes={etapesProcessus} />
    </section>
  );
};


export default ProcessTimelineSection ;