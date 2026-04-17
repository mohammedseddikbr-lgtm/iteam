// components/pages/sections/services/ServicesDetails.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, Award, Zap, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientText } from "@/components/ui/GradientText";


interface ServiceNode {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  position: { x: number; y: number };
  features: string[];
  details: {
    title: string;
    description: string;
    items: string[];
  };
}

interface ServicesDetailsProps {
  services: ServiceNode[];
  activeService: number | null;
  setActiveService: (id: number | null) => void;
}

export const ServicesDetails = ({ 
  services, 
  activeService, 
  setActiveService 
}: ServicesDetailsProps) => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence>
          {activeService && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-20"
            >
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10">
                {(() => {
                  const service = services.find(s => s.id === activeService);
                  if (!service) return null;
                  
                  return (
                    <>
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center",
                            "bg-gradient-to-br from-white/10 to-white/5",
                            "border border-white/10"
                          )}>
                            <div className={cn(
                              "text-2xl",
                              service.color.replace("from-", "text-").split(" ")[0]
                            )}>
                              {service.icon}
                            </div>
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-white">{service.details.title}</h2>
                            <p className="text-gray-400">{service.details.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setActiveService(null)}
                          className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                        >
                          <ChevronRight className="w-6 h-6 rotate-90" />
                        </button>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-6">Fonctionnalités Clés</h3>
                          <div className="space-y-4">
                            {service.details.items.map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-3"
                              >
                                <div className={cn(
                                  "w-8 h-8 rounded-full flex items-center justify-center",
                                  "bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
                                )}>
                                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                </div>
                                <span className="text-gray-300">{item}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-bold text-white mb-6">Pourquoi Nous Choisir</h3>
                          <div className="space-y-6">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                              <div className="flex items-center gap-3 mb-2">
                                <Award className="w-5 h-5 text-amber-400" />
                                <span className="font-semibold text-white">Expertise Sectorielle</span>
                              </div>
                              <p className="text-gray-400 text-sm">Plus de 10 ans d'expérience en {service.title}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                              <div className="flex items-center gap-3 mb-2">
                                <Zap className="w-5 h-5 text-green-400" />
                                <span className="font-semibold text-white">Livraison Rapide</span>
                              </div>
                              <p className="text-gray-400 text-sm">Développement agile avec déploiement rapide</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                              <div className="flex items-center gap-3 mb-2">
                                <Shield className="w-5 h-5 text-blue-400" />
                                <span className="font-semibold text-white">Assurance Qualité</span>
                              </div>
                              <p className="text-gray-400 text-sm">Tests rigoureux et contrôle qualité</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-8 border-t border-white/10">
                        <button className="relative px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                          <span className="relative z-10 flex items-center gap-3">
                            Commencer avec {service.title}
                            <ArrowRight className="w-5 h-5" />
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};