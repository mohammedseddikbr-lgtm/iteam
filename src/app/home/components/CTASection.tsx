// components/pages/sections/CTASection.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Calendar, Mail, ChevronRight, Clock } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";

export const CTASection = () => {
  return (
    <section className="md:py-32 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-12 sm:p-16 rounded-3xl overflow-hidden"
        >
          <FondCTA />
          <ContenuCTA />
        </motion.div>
      </div>
    </section>
  );
};

const FondCTA = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"
      />
    </>
  );
};

const ContenuCTA = () => {
  return (
    <div className="relative z-10 text-center">
      <IconeFlottante />
      <EnTeteSection />
      <ActionsCTA />
      <TempsReponse />
    </div>
  );
};

const IconeFlottante = () => {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 mb-8 shadow-2xl shadow-blue-500/25"
    >
      <Sparkles className="w-12 h-12" />
    </motion.div>
  );
};

const EnTeteSection = () => {
  return (
    <>
      <h2 className="text-3xl sm:text-5xl font-bold mb-6">
        Prêt à <GradientText className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">Commencer ?</GradientText>
      </h2>
      <p className="md:text-xl text-gray-300 mb-10 md:max-w-2xl md:mx-auto leading-relaxed">
        Créons ensemble quel  que chose d'incroyable. Planifiez votre consultation gratuite dès aujourd'hui et obtenez une feuille de route personnalisée.
      </p>
    </>
  );
};

const ActionsCTA = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      <button className="relative md:px-10 p-2 md:py-5 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 shadow-2xl shadow-blue-500/25">
        <span className="relative z-10 flex text-xs items-center gap-3">
          <Calendar className="hidden md:flex w-6 h-6" />
          Réserver un Appel Stratégique 
          <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>
      
      <button className="md:px-10 md:py-5 p-3 text-lg rounded-xl text-center md:rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 backdrop-blur-xl border border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 group">
        <span className="flex text-xs justify-center items-center gap-3">
          <Mail className="hidden md:flex w-6 h-6 text-cyan-400" />
          Obtenir un Devis
          <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </span>
      </button>
    </div>
  );
};

const TempsReponse = () => {
  return (
    <p className="text-gray-400 mt-8 text-xs md:text-sm">
      <Clock className="inline w-4 h-4 mr-2" />
      Réponse sous 2 heures • Consultation gratuite de 30 minutes
    </p>
  );
};


export default CTASection;