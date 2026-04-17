// components/pages/sections/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Rocket, 
  Video,
  Sparkles,
  ChevronRight,
  Users,
  Clock,
  Heart
} from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { StatCard } from "../components/StatCard";
import { useRouter } from "next/navigation";

interface HeroSectionProps {
  heroOpacity: any;
  heroScale: any;
}

const stats = [
  { 
    valeur: "30", 
    label: "Clients", 
    icone: <Users />, 
    changement: "+20%" 
  },
  { 
    valeur: "98%", 
    label: "Satisfaction Client", 
    icone: <Heart />, 
    changement: "+5%" 
  },
  { 
    valeur: "7", 
    label: "Projets Réalisés", 
    icone: <Rocket />, 
    changement: "+3"
  },
  { 
    valeur: "24/7", 
    label: "Support", 
    icone: <Clock />, 
    changement: "Toujours" 
  }
];

export const HeroSection = ({ heroOpacity, heroScale }: HeroSectionProps) => {
  return (
    <motion.section 
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative pt-24 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <FondHero />
      <ContenuHero />
    </motion.section>
  );
};

const FondHero = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
      />
    </div>
  );
};

const ContenuHero = () => {
  return (
    <div className="relative z-10 max-w-7xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="space-y-8"
      >
        <Slogan />
        <TitrePrincipal />
        <SousTitre />
        <CTAsHero />
        {/* <StatsHero /> */}
      </motion.div>
    </div>
  );
};

const Slogan = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, type: "spring" }}
      className="inline-flex items-center gap-1 md:gap-2 px-3 md:px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/30 shadow-lg shadow-blue-500/5"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-5 h-5 text-blue-400" />
      </motion.div>
      <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Leaders en Innovation Digitale depuis 2024
      </span>
    </motion.div>
  );
};

const TitrePrincipal = () => {
  return (
    <div className="relative">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-5xl sm:text-7xl lg:text-8xl font-bold flex-col flex md:flex-row items-center justify-center md:gap-8 leading-tight tracking-tight"
      >
        <span className="block">Transformez</span>
        <span className="block mt-2">
          <GradientText className="bg-linear-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
            Votre Vision
          </GradientText>
        </span>
      </motion.h1>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ delay: 0.8, duration: 1 }}
        className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-8 rounded-full"
      />
    </div>
  );
};

const SousTitre = () => {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 1 }}
      className="text-xl flex flex-col space-y-2 sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
    >
      <span className="hidden md:inline-block text-lg">
        Nous créons des{" "}
      </span>
      <span className="flex md:hidden text-white text-lg ">
        Nous créons des Expériences digitales Exceptionnelles qui propulsent la croissance et transforment les entreprises.
      </span>
      <span className="hidden md:inline-block relative ">
        <span className="text-white text-2xl md:text-4xl font-semibold">Expériences digitales Exceptionnelles</span>
        <motion.span
          className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </span>{" "}
      <span className="hidden md:inline-block mt-4 md:mt-1 text-lg">
        qui propulsent la croissance et transforment les entreprises.
      </span>
    </motion.p>
  );
};

const CTAsHero = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/contact");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="flex flex-col sm:flex-row gap-6 justify-center items-center md:pt-12"
    >
      {/* الزر الأول - باستخدام GlowingButton */}
      <motion.div  
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <GlowingButton 
          as="div"
          onClick={handleClick}
          className="md:px-10 md:py-5 text-lg font-semibold shadow-2xl shadow-blue-500/25"
        >
          <span className="flex items-center justify-center max-md:w-full gap-2 md:gap-3">
            <Rocket className="w-6 h-6" />
            Lancez Votre Projet
            <ArrowRight className="md:ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </span>
        </GlowingButton>
      </motion.div>

      {/* الزر الثاني */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group max-md:w-full md:px-10 py-5 text-lg rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 backdrop-blur-xl border border-white/20 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden"
      >
        <span className="flex items-center justify-center gap-3 relative z-10">
          <Video className="w-6 h-6 text-cyan-400" />
          Consultation Gratuite
          <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      </motion.button>
    </motion.div>
  );
};

const StatsHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-32"
    >
      {stats.map((stat, index) => (
        <StatCard 
          key={index} 
          valeur={stat.valeur}
          label={stat.label}
          icone={stat.icone}
          changement={stat.changement}
          delai={index * 0.1}
        />
      ))}
    </motion.div>
  );
};