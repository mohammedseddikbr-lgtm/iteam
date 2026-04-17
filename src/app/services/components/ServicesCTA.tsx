// components/pages/sections/services/ServicesCTA.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

export const ServicesCTA = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 mt-32">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative p-12 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10" />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 mb-8">
                <Zap className="w-10 h-10" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Prêt à Transformer Votre Entreprise ?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Discutons de la manière dont nos services peuvent vous aider à atteindre vos objectifs digitaux.
              </p>
              <Link href="/contact">
                <button className="relative px-8 py-4 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer">
                  <span className="relative z-10 flex items-center gap-3">
                    Commencer Votre Projet Aujourd'hui
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesCTA;