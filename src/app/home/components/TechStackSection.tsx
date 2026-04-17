// components/pages/sections/TechStackSection.tsx
"use client";

import { motion } from "framer-motion";
import { Sparkles, Code2, Cpu, GitBranch, Database, Layers, Globe } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";
import { TechCard } from "../components/TechCard";
import IllusIcon from "../../../../public/icons/IllusIcon";
import AfterEffectIcon from "../../../../public/icons/AfterEffectIcon";
import PsIcon from "../../../../public/icons/PsIcon";
import PremiereProIcon from "../../../../public/icons/PremiereProIcon ";
import FigmaIcon from "../../../../public/icons/FigmaIcon";
import AdobeXDIcon from "../../../../public/icons/AdobeXDIcon";


interface TechItem {
  icone: React.ReactNode;
  nom: string;
  couleur: string;
}

const techStack: TechItem[] = [
  { icone: <PsIcon />, nom: "Adobe Photoshop", couleur: "text-white-500" },
  { icone: <IllusIcon/>, nom: "Adobe Illustator", couleur: "text-white" },
  { icone: <PremiereProIcon />, nom: "Adobe Premire Pro", couleur: "text-white-500" },
  { icone: <AfterEffectIcon/>, nom: "After Effect", couleur: "text-white-500" },
  { icone: <FigmaIcon/>, nom: "Figma", couleur: "text-white-500" },
  { icone: <AdobeXDIcon/>, nom: "Adobe XD", couleur: "text-white-500" },
  

];

export const TechStackSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1 }}
      className="relative py-16 overflow-hidden"
    >
      <FondTechnologie />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <EnTeteSection 
          icone={<Sparkles className="w-5 h-5 text-cyan-400" />}
          texteBadge="Technologie de Pointe"
          titre="Propulsé par une Stack Moderne"
          description="Nous utilisons des technologies leaders du marché pour créer des solutions performantes et évolutives"
        />
        
        <GrilleTechnologies techStack={techStack} />
      </div>
    </motion.section>
  );
};

const FondTechnologie = () => {
  return (
    <>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
      </div>
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
    </>
  );
};

interface EnTeteSectionProps {
  icone: React.ReactNode;
  texteBadge: string;
  titre: string;
  description: string;
}

const EnTeteSection = ({ icone, texteBadge, titre, description }: EnTeteSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/30 mb-6">
        {icone}
        <span className="text-sm font-semibold text-cyan-300">{texteBadge}</span>
      </div>
      <h3 className="text-4xl sm:text-5xl font-bold mb-6">
        {titre}
      </h3>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

interface GrilleTechnologiesProps {
  techStack: TechItem[];
}

const GrilleTechnologies = ({ techStack }: GrilleTechnologiesProps) => {
  return (
    <div className="relative">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {techStack.map((tech, index) => (
          <TechCard key={index} tech={tech} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TechStackSection;