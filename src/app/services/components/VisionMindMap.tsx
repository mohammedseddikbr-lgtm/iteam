"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Smartphone,
  Palette,
  Cloud,
  Shield,
  Brain,
  Zap,
  ArrowRight,
  X,
  CheckCircle,
  Server,
  DatabaseBackup,
  Sparkles,
  Target,
  Cpu,
  GitBranch,
  Camera,
  BarChart3,
  Users,
  Globe,
  ChevronDown,
  ChevronUp,
  Menu,
  Grid,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceNode {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  features: string[];
  details: {
    title: string;
    description: string;
    items: string[];
  };
}

export const ServicesMindMap = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const services: ServiceNode[] = [
    {
      id: 1,
      title: "Création de Sites Web",
      icon: <Globe className="w-6 h-6" />,
      description: "Sites vitrines et sur mesure, performants et adaptés à votre image",
      color: "from-blue-500 to-cyan-500",
      features: ["Sites Vitrine", "Sites Sur Mesure", "Design Responsive", "Optimisation SEO"],
      details: {
        title: "Solutions Web Complètes",
        description: "Nous concevons des sites web modernes et évolutifs, adaptés à vos besoins et à votre image de marque.",
        items: [
          "Sites Vitrine Professionnels",
          "Sites Sur Mesure",
          "Optimisation Responsive & Mobile",
          "SEO & Performance",
          "Intégration avec CRM et outils tiers",
          "Maintenance & Support"
        ]
      }
    },
    {
      id: 2,
      title: "Solutions Digitales",
      icon: <Code2 className="w-6 h-6" />,
      description: "Applications web et plateformes digitales pour automatiser et optimiser vos processus",
      color: "from-purple-500 to-pink-500",
      features: ["Applications Web", "Intégration API", "Automatisation", "PWA"],
      details: {
        title: "Applications Web & Digitales",
        description: "Développement de solutions digitales personnalisées pour vos besoins métiers.",
        items: [
          "Applications Web Sur Mesure",
          "Plateformes E-commerce",
          "Systèmes CRM & ERP",
          "Tableaux de Bord et Reporting",
          "Intégration d'API",
          "Applications Web Progressives"
        ]
      }
    },
    {
      id: 3,
      title: "Design & Branding",
      icon: <Palette className="w-6 h-6" />,
      description: "Création d'identité visuelle et design graphique cohérents et impactants",
      color: "from-cyan-500 to-emerald-500",
      features: ["Identité Visuelle", "Supports Print & Digital", "Wireframes", "Prototypage"],
      details: {
        title: "Design & Identité de Marque",
        description: "Création d'interfaces et supports graphiques qui reflètent votre marque et séduisent votre audience.",
        items: [
          "Création d'identité visuelle",
          "Design graphique print et digital",
          "Supports publicitaires et marketing",
          "Wireframes et prototypes interactifs",
          "Design d'interactions",
          "Tests et validation UX"
        ]
      }
    },
    {
      id: 4,
      title: "Production Audiovisuelle",
      icon: <Camera className="w-6 h-6" />,
      description: "Photos et vidéos professionnelles pour valoriser votre marque et vos contenus",
      color: "from-green-500 to-lime-500",
      features: ["Photographie Pro", "Vidéos Promotionnelles", "Montage", "Contenu Social Media"],
      details: {
        title: "Photo & Vidéo Professionnelle",
        description: "Production de contenu audiovisuel de qualité pour vos campagnes et réseaux sociaux.",
        items: [
          "Photographie professionnelle",
          "Vidéos promotionnelles et corporate",
          "Contenus pour réseaux sociaux",
          "Montage et post-production",
          "Optimisation pour diffusion digitale",
          "Supports visuels pour marketing"
        ]
      }
    },
    {
      id: 5,
      title: "Marketing Digital",
      icon: <BarChart3 className="w-6 h-6" />,
      description: "Stratégies marketing et publicité digitale pour générer des résultats mesurables",
      color: "from-lime-500 to-yellow-500",
      features: ["Stratégie Digitale", "Publicité en Ligne", "Analytique", "Optimisation ROI"],
      details: {
        title: "Stratégies & Campagnes Digitales",
        description: "Mise en place de campagnes marketing performantes et analytiques pour booster votre visibilité.",
        items: [
          "Campagnes publicitaires ciblées",
          "Marketing sur les réseaux sociaux",
          "Analyse et reporting des performances",
          "Optimisation continue",
          "Gestion de budget publicitaire",
          "Recommandations stratégiques"
        ]
      }
    },
    {
      id: 6,
      title: "Gestion des Réseaux Sociaux",
      icon: <Users className="w-6 h-6" />,
      description: "Animation et développement de votre communauté sur les réseaux sociaux",
      color: "from-yellow-500 to-orange-500",
      features: ["Community Management", "Contenu Social", "Planification", "Reporting"],
      details: {
        title: "Social Media Management",
        description: "Gestion et développement de votre présence sur les réseaux sociaux.",
        items: [
          "Gestion de pages sociales",
          "Création et planification de contenu",
          "Animation de la communauté",
          "Suivi des KPI & reporting",
          "Optimisation des performances",
          "Stratégie de croissance sociale"
        ]
      }
    },
    {
      id: 7,
      title: "Hébergement & Cloud",
      icon: <Cloud className="w-6 h-6" />,
      description: "Solutions d'hébergement web et cloud sécurisées et évolutives",
      color: "from-indigo-500 to-blue-500",
      features: ["Hébergement Web", "Serveurs Cloud", "Backups", "Sécurité"],
      details: {
        title: "Infrastructure Cloud & Hébergement",
        description: "Gestion de vos infrastructures web et cloud pour fiabilité et performance.",
        items: [
          "Hébergement sécurisé",
          "Serveurs Cloud évolutifs",
          "Sauvegardes automatiques",
          "Sécurité et monitoring",
          "Optimisation des performances",
          "Support technique continu"
        ]
      }
    },
    {
      id: 8,
      title: "Support & Maintenance",
      icon: <Shield className="w-6 h-6" />,
      description: "Maintenance et support technique pour vos plateformes digitales",
      color: "from-red-500 to-pink-500",
      features: ["Support Technique", "Mises à Jour", "Monitoring", "Sécurité"],
      details: {
        title: "Support et Maintenance",
        description: "Assurer la continuité et la sécurité de vos solutions digitales.",
        items: [
          "Mises à jour régulières",
          "Surveillance et monitoring",
          "Correction de bugs",
          "Assistance technique",
          "Optimisation continue",
          "Sécurité renforcée"
        ]
      }
    }
  ];

  const toggleService = (id: number) => {
    if (expandedService === id) {
      setExpandedService(null);
    } else {
      setExpandedService(id);
    }
  };

  // Mobile Service Card Component
  const MobileServiceCard = ({ service }: { service: ServiceNode }) => (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      onClick={() => toggleService(service.id)}
      className={cn(
        "relative rounded-2xl backdrop-blur-xl border",
        "bg-gradient-to-br from-white/10 via-white/5 to-white/10",
        "transition-all duration-300 overflow-hidden",
        expandedService === service.id 
          ? "border-cyan-500/40 shadow-lg shadow-cyan-500/20" 
          : "border-white/10"
      )}
    >
      {/* Glow effect when expanded */}
      {expandedService === service.id && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            "absolute -inset-0.5 blur opacity-30"
          )}
          style={{
            background: `linear-gradient(135deg, ${service.color})`,
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative p-4">
        <div className="flex items-center justify-between gap-3">
          {/* Left side with icon and title */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={cn(
              "w-12 h-12 flex-shrink-0 flex items-center justify-center",
              "rounded-xl",
              "bg-gradient-to-br from-white/15 to-white/5",
              "border border-white/10"
            )}>
              <div className={cn(
                "text-xl",
                service.color.replace("from-", "text-").split(" ")[0]
              )}>
                {service.icon}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-sm truncate">{service.title}</h3>
              <p className="text-gray-400 text-xs truncate">{service.description}</p>
            </div>
          </div>

          {/* Expand/Collapse button */}
          <motion.button
            animate={{ rotate: expandedService === service.id ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
            aria-label={expandedService === service.id ? "Collapse" : "Expand"}
          >
            <ChevronDown className="w-4 h-4 text-gray-300" />
          </motion.button>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {expandedService === service.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              {/* Features */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-white">Fonctionnalités</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full bg-white/5 text-xs text-gray-300 border border-white/10"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Points */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-white mb-2">Ce que nous faisons :</h4>
                <div className="space-y-2">
                  {service.details.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveService(service.id);
                }}
                className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-sm font-medium text-white"
              >
                Voir les détails complets
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 md:p-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/5 via-transparent to-cyan-950/5">
        {/* Mobile-optimized particles */}
        {/* <div className="absolute inset-0 pointer-events-none">
          {[...Array(isMobile ? 8 : 15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0, 1, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div> */}
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-8xl mx-auto">
        {/* Mobile View */}
        <div className="md:hidden space-y-6">
        
          {/* Mobile Services List */}
          <div className="space-y-3">
            {services.map((service) => (
              <MobileServiceCard key={service.id} service={service} />
            ))}
          </div>

       
        </div>

        {/* Desktop View (Original Grid) */}
        <div className="hidden md:block">
          {/* Desktop Grid Layout */}
          <div className="grid grid-cols-3 grid-rows-3 gap-12 w-full relative p-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((pos, index) => {
              const service = services[index];
              const row = Math.floor(index / 3) + 1;
              const col = (index % 3) + 1;
              
              if (!service) return null;
              
              return (
                <div
                  key={service.id}
                  className={`col-start-${col} row-start-${row} w-full flex items-center justify-center relative`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                    onClick={() =>
                      setActiveService(activeService === service.id ? null : service.id)
                    }
                    className="relative w-full"
                  >
                    {/* Cloud-shaped Service Card */}
                    <motion.div
                      whileHover={{ 
                        scale: 1.05,
                        y: -5,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        borderColor: hoveredService === service.id || activeService === service.id 
                          ? "rgba(6, 182, 212, 0.6)" 
                          : "rgba(255, 255, 255, 0.15)",
                        boxShadow: hoveredService === service.id || activeService === service.id 
                          ? "0 20px 60px rgba(6, 182, 212, 0.3)" 
                          : "0 10px 40px rgba(0, 0, 0, 0.2)",
                      }}
                      className={cn(
                        "p-6 backdrop-blur-xl border cursor-pointer rounded-2xl",
                        "bg-gradient-to-br from-white/10 via-white/5 to-white/10",
                        "transition-all duration-300",
                        "transform-gpu"
                      )}
                    >
                      {/* Glow Effect */}
                      <motion.div
                        animate={{
                          opacity: hoveredService === service.id || activeService === service.id ? 0.8 : 0,
                          scale: hoveredService === service.id || activeService === service.id ? 1.1 : 1,
                        }}
                        className={cn(
                          "absolute -inset-0.5 blur transition-opacity duration-300"
                        )}
                        style={{
                          clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
                          borderRadius: "30% 10% 30% 10% / 10% 30% 10% 30%",
                          background: `linear-gradient(135deg, ${service.color})`,
                        }}
                      />
                      
                      <div className="flex items-center justify-start gap-6">
                        <motion.div className="mb-4">
                          <div className={cn(
                            "w-14 h-14 flex items-center justify-center",
                            "rounded-xl",
                            "bg-gradient-to-br from-white/15 to-white/5",
                            "border border-white/10",
                            "shadow-lg"
                          )}>
                            <div className={cn(
                              "relative z-10 text-center text-4xl",
                              service.color.replace("from-", "text-").split(" ")[0]
                            )}>
                              {service.icon}
                            </div>
                          </div>
                        </motion.div>
                        
                        <h3 className="text-xl font-bold text-white text-center mb-2">{service.title}</h3>
                      </div>
                      
                      <p className="text-gray-400 text-xs text-center mb-3 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {service.features.slice(0, 2).map((feature, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-2 py-1 rounded-full bg-white/5 text-[10px] text-gray-300 border border-white/10 hover:border-cyan-500/30 transition-all"
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-center gap-1 mt-4">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-1 rounded-full bg-cyan-400"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                        <span className="text-[10px] text-gray-500 ml-1">Learn more</span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}

            {/* Center Node */}
           
          </div>
        </div>
      </div>

      {/* Service Details Panel (Responsive) */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={cn(
              "fixed z-50 max-w-2xl w-full px-4",
              isMobile ? "bottom-4 inset-x-4" : "bottom-8 left-1/2 -translate-x-1/2"
            )}
          >
            {(() => {
              const service = services.find(s => s.id === activeService);
              if (!service) return null;
              
              return (
                <div className="relative p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-500/30">
                  {/* Close button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveService(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                  
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row items-center gap-6 mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={cn(
                        isMobile ? "w-16 h-16" : "w-20 h-20",
                        "flex items-center justify-center rounded-2xl",
                        "bg-gradient-to-br from-white/15 to-white/5",
                        "border border-white/10"
                      )}
                    >
                      <div className={cn(
                        isMobile ? "text-2xl" : "text-3xl",
                        service.color.replace("from-", "text-").split(" ")[0]
                      )}>
                        {service.icon}
                      </div>
                    </motion.div>
                    <div className="text-center lg:text-left">
                      <h2 className={cn(
                        isMobile ? "text-xl" : "text-2xl lg:text-3xl",
                        "font-bold text-white mb-2"
                      )}>
                        {service.details.title}
                      </h2>
                      <p className={cn(
                        isMobile ? "text-sm" : "text-base",
                        "text-gray-400"
                      )}>
                        {service.details.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    <h3 className={cn(
                      isMobile ? "text-lg" : "text-xl",
                      "font-bold text-white flex items-center gap-2"
                    )}>
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                      Key Features
                    </h3>
                    <div className={cn(
                      "gap-3",
                      isMobile ? "space-y-3" : "grid grid-cols-1 lg:grid-cols-2"
                    )}>
                      {service.details.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ x: 5 }}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all",
                            isMobile && "text-sm"
                          )}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                            "bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
                          )}>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </div>
                          <span className="text-gray-300">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button className="relative w-full py-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Start Your {service.title} Project
                        <ArrowRight className="w-5 h-5" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </motion.div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

     
    </div>
  );
};