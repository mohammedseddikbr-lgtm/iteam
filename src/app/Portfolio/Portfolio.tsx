// components/pages/Portfolio.tsx
"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const TechBackground = dynamic(() => import('@/components/ui/TechBackground').then(mod => mod.TechBackground), { ssr: false, loading: () => null });
const FloatingParticles = dynamic(() => import('@/app/Portfolio/components/FloatingParticles').then(mod => mod.FloatingParticles), { ssr: false, loading: () => null });

import {
  Code2,
  Palette,
  Camera,
  TrendingUp,
  Users,
  Video,
  Star,
  Sparkles,
  X,
  Briefcase,
  Clock,
  Maximize2,
  Send,
  ShoppingBag,
  Stethoscope,
  Facebook,
  Instagram,
  PenTool,
  Layout,
  Package,
  Award,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GradientText } from "@/components/ui/GradientText";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Types
type ProjectCategory = "web" | "design" | "marketing" | "video" | "social";

interface PortfolioProject {
  id: number;
  title: string;
  category: ProjectCategory;
  categoryName: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  imageUrl: string;
  client: string;
  year: string;
  fullDescription: string;
  technologies?: string[];
  link?: string;
}

// Composant pour afficher une image avec fallback
const ProjectImage = ({ src, alt, color }: { src: string; alt: string; color: string }) => {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (imgError) {
    return (
      <div className={cn(
        "w-full h-full flex items-center justify-center",
        `bg-gradient-to-br ${color}`
      )}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-xs text-gray-400">Image non disponible</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
          `bg-gradient-to-br ${color}`
        )}>
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgError(true);
          setIsLoading(false);
        }}
      />
    </>
  );
};

// Composant pour la modale avec image
const ModalImage = ({ src, alt, color }: { src: string; alt: string; color: string }) => {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (imgError) {
    return (
      <div className={cn(
        "w-full h-full flex items-center justify-center",
        `bg-gradient-to-br ${color}`
      )}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-xs text-gray-400">Image non disponible</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
          `bg-gradient-to-br ${color}`
        )}>
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgError(true);
          setIsLoading(false);
        }}
      />
    </>
  );
};

// Composant ImageIcon
const ImageIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [filterCategory, setFilterCategory] = useState<ProjectCategory | "all">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const openModal = (project: PortfolioProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // ========== VOS PROJETS RÉELS ==========
  const projects: PortfolioProject[] = [
    {
      id: 1,
      title: "Store B2B - CSM Taksit",
      category: "web",
      categoryName: "Développement Web",
      description: "Plateforme B2B avec système de paiement en plusieurs fois",
      icon: <ShoppingBag className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      imageUrl: "/images/store-b2b.jpg",
      client: "CSM Taksit",
      year: "2024",
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      fullDescription: "Plateforme e-commerce B2B complète permettant aux professionnels d'acheter en ligne avec un système de paiement échelonné (taksit). Interface intuitive et sécurisée.",
      link: "https://b2b.csmtaksit.dz/"
    },
    {
      id: 2,
      title: "Plateforme Médicale i-doc",
      category: "web",
      categoryName: "Développement Web",
      description: "Plateforme de gestion médicale pour professionnels de santé",
      icon: <Stethoscope className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      imageUrl: "/images/i-doc.png",
      client: "i-doc",
      year: "2024",
      technologies: ["React", "Laravel", "MySQL", "WebRTC"],
      fullDescription: "Plateforme médicale complète pour la gestion des patients, rendez-vous, dossiers médicaux et téléconsultation.",
      link: "https://i-doc.com"
    },
    {
      id: 3,
      title: "Groupe Rahmani",
      category: "social",
      categoryName: "Community Management",
      description: "Gestion des réseaux sociaux et stratégie de contenu",
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-600 to-blue-800",
      imageUrl: "/images/groupe-rahmani.png",
      client: "Groupe Rahmani",
      year: "2024",
      technologies: ["Facebook", "Instagram", "LinkedIn"],
      fullDescription: "Gestion complète des réseaux sociaux du Groupe Rahmani : création de contenu, planification, community management et reporting.",
      link: "https://facebook.com/grouperahmani"
    },
    {
      id: 4,
      title: "CSM Taksit - Social Media",
      category: "social",
      categoryName: "Community Management",
      description: "Stratégie digitale et animation de communauté",
      icon: <Facebook className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-500",
      imageUrl: "/images/csm-taksit-social.png",
      client: "CSM Taksit",
      year: "2024",
      technologies: ["Facebook", "Instagram", "Meta Ads"],
      fullDescription: "Stratégie de contenu et community management pour CSM Taksit, avec campagnes publicitaires ciblées.",
      link: "https://facebook.com/csmtaksit"
    },
    {
      id: 5,
      title: "EMS Algerie",
      category: "social",
      categoryName: "Community Management",
      description: "Gestion des réseaux sociaux et e-réputation",
      icon: <Instagram className="w-8 h-8" />,
      color: "from-pink-500 to-rose-500",
      imageUrl: "/images/ems-algerie.png",
      client: "EMS Algérie",
      year: "2024",
      technologies: ["Instagram", "Facebook", "LinkedIn"],
      fullDescription: "Gestion complète des réseaux sociaux d'EMS Algérie, avec création de contenu et stratégie d'engagement.",
      link: "https://instagram.com/emsalgerie"
    },
    {
      id: 6,
      title: "Branding - Groupe Rahmani",
      category: "design",
      categoryName: "Design Graphique",
      description: "Identité visuelle complète du groupe",
      icon: <PenTool className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      imageUrl: "/images/branding-rahmani.png",
      client: "Groupe Rahmani",
      year: "2024",
      technologies: ["Illustrator", "Photoshop", "Figma"],
      fullDescription: "Création de l'identité visuelle complète du Groupe Rahmani : logo, charte graphique, papeterie et supports marketing."
    },
    {
      id: 7,
      title: "Design Packaging - CSM",
      category: "design",
      categoryName: "Design Graphique",
      description: "Packaging produits et emballages",
      icon: <Package className="w-8 h-8" />,
      color: "from-lime-500 to-green-500",
      imageUrl: "/images/packaging-csm.png",
      client: "CSM Taksit",
      year: "2024",
      technologies: ["Illustrator", "InDesign"],
      fullDescription: "Design de packaging pour la gamme de produits CSM Taksit, avec un design moderne et attractif."
    },
    {
      id: 8,
      title: "Affiches Publicitaires",
      category: "design",
      categoryName: "Design Graphique",
      description: "Création d'affiches et flyers",
      icon: <Layout className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      imageUrl: "/images/affiches.png",
      client: "EMS Algérie",
      year: "2024",
      technologies: ["Photoshop", "Illustrator"],
      fullDescription: "Création d'affiches publicitaires, flyers et supports print pour les campagnes marketing."
    },
    {
      id: 9,
      title: "UI/UX - Plateforme i-doc",
      category: "design",
      categoryName: "Design Graphique",
      description: "Design d'interface utilisateur",
      icon: <Award className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-500",
      imageUrl: "/images/ui-ux-idoc.png",
      client: "i-doc",
      year: "2024",
      technologies: ["Figma", "Adobe XD"],
      fullDescription: "Design UI/UX complet pour la plateforme médicale i-doc, avec une interface claire et intuitive pour les médecins et patients."
    },
    {
      id: 10,
      title: "Campagne Publicitaire EMS",
      category: "marketing",
      categoryName: "Marketing Digital",
      description: "Campagne Facebook & Instagram Ads",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-red-500 to-rose-500",
      imageUrl: "/images/campagne-ems.png",
      client: "EMS Algérie",
      year: "2024",
      technologies: ["Meta Ads", "Google Ads", "Analytics"],
      fullDescription: "Campagne publicitaire sur Facebook et Instagram pour promouvoir les services d'EMS Algérie. Résultats : +200% d'engagement et +150% de leads.",
      link: "https://facebook.com/emsalgerie"
    }
  ];

  // Filtrage
  const filteredProjects = filterCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === filterCategory);

  // Statistiques
  const categoriesStats = {
    all: projects.length,
    web: projects.filter(p => p.category === "web").length,
    design: projects.filter(p => p.category === "design").length,
    marketing: projects.filter(p => p.category === "marketing").length,
    video: projects.filter(p => p.category === "video").length,
    social: projects.filter(p => p.category === "social").length
  };

  const categories = [
    { id: "all", name: "Tous", icon: <Star className="w-4 h-4" />, count: categoriesStats.all },
    { id: "web", name: "Développement", icon: <Code2 className="w-4 h-4" />, count: categoriesStats.web },
    { id: "design", name: "Design Graphique", icon: <Palette className="w-4 h-4" />, count: categoriesStats.design },
    { id: "marketing", name: "Marketing Digital", icon: <TrendingUp className="w-4 h-4" />, count: categoriesStats.marketing },
    { id: "video", name: "Production Vidéo", icon: <Video className="w-4 h-4" />, count: categoriesStats.video },
    { id: "social", name: "Community", icon: <Users className="w-4 h-4" />, count: categoriesStats.social }
  ];

  // Services cards
  const servicesList = [
    { name: "Développement Web", icon: <Code2 className="w-6 h-6" />, color: "from-blue-500 to-cyan-500", count: categoriesStats.web },
    { name: "Design Graphique", icon: <Palette className="w-6 h-6" />, color: "from-cyan-500 to-emerald-500", count: categoriesStats.design },
    { name: "Marketing Digital", icon: <TrendingUp className="w-6 h-6" />, color: "from-lime-500 to-yellow-500", count: categoriesStats.marketing },
    { name: "Production Vidéo", icon: <Video className="w-6 h-6" />, color: "from-orange-500 to-red-500", count: categoriesStats.video },
    { name: "Community Management", icon: <Users className="w-6 h-6" />, color: "from-pink-500 to-rose-500", count: categoriesStats.social }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 text-white">
      <TechBackground />
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400">Notre travail</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Nos <GradientText>réalisations</GradientText>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Découvrez nos projets réalisés pour nos clients
          </p>
        </div>

        {/* SERVICES CARDS */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Nos <span className="text-cyan-400">services</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {servicesList.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => {
                  const categoryMap: Record<string, ProjectCategory> = {
                    "Développement Web": "web",
                    "Design Graphique": "design",
                    "Marketing Digital": "marketing",
                    "Production Vidéo": "video",
                    "Community Management": "social"
                  };
                  setFilterCategory(categoryMap[service.name]);
                }}
                className={cn(
                  "cursor-pointer p-4 rounded-xl text-center transition-all duration-300",
                  "bg-white/5 border hover:border-blue-500/30",
                  (service.name === "Développement Web" && filterCategory === "web") ||
                  (service.name === "Design Graphique" && filterCategory === "design") ||
                  (service.name === "Marketing Digital" && filterCategory === "marketing") ||
                  (service.name === "Production Vidéo" && filterCategory === "video") ||
                  (service.name === "Community Management" && filterCategory === "social")
                    ? "border-blue-500/50 bg-blue-500/10"
                    : "border-white/10 hover:bg-white/10"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3",
                  `bg-gradient-to-r ${service.color}`
                )}>
                  {service.icon}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{service.name}</h3>
                <p className="text-xs text-gray-500">{service.count} projets</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FILTRES */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
                filterCategory === cat.id
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                  : "bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300"
              )}
            >
              {cat.icon}
              <span className="text-sm">{cat.name}</span>
              <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* GRILLE DES PROJETS */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">Aucun projet dans cette catégorie pour le moment</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => openModal(project)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className={cn(
                  "h-48 relative overflow-hidden",
                  `bg-gradient-to-br ${project.color}`
                )}>
                  <ProjectImage 
                    src={project.imageUrl} 
                    alt={project.title} 
                    color={project.color}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Maximize2 className="w-6 h-6 text-white" />
                    <span className="text-white text-sm">Voir détails</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-gray-500">{project.year}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className={cn(
                      "px-2 py-1 rounded-full",
                      `bg-gradient-to-r ${project.color} bg-clip-text text-transparent`
                    )}>
                      {project.categoryName}
                    </span>
                    <span className="text-gray-500">{project.client}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODALE */}
        <AnimatePresence>
          {isModalOpen && selectedProject && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200]"
                onClick={closeModal}
              />
              
              <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative max-w-2xl w-full max-h-[80vh] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-white/20 shadow-2xl pointer-events-auto"
                >
                  <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>

                  <div className={cn(
                    "h-64 relative overflow-hidden",
                    `bg-gradient-to-br ${selectedProject.color}`
                  )}>
                    <ModalImage 
                      src={selectedProject.imageUrl} 
                      alt={selectedProject.title} 
                      color={selectedProject.color}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <span className={cn(
                        "text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-md bg-black/50 text-white"
                      )}>
                        {selectedProject.categoryName}
                      </span>
                      <span className="text-xs text-white backdrop-blur-md bg-black/50 px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {selectedProject.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 overflow-y-auto max-h-[calc(80vh-16rem)]">
                    <h2 className="text-xl font-bold text-white mb-1">{selectedProject.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                      <Briefcase className="w-4 h-4" />
                      <span>{selectedProject.client}</span>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {selectedProject.fullDescription}
                      </p>
                    </div>

                    {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                      <div className="mb-5">
                        <h3 className="text-sm font-semibold text-white mb-2">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-cyan-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Boutons - Avec lien conditionnel */}
                    <div className="flex flex-col gap-3 mt-4">
                      {/* Lien vers le projet (s'affiche seulement si le projet a un lien) */}
                      {selectedProject.link && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 text-center text-sm rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visiter le site web
                        </a>
                      )}
                      
                      {/* Bouton Devis */}
                      <Link href="/contact" onClick={closeModal}>
                        <Button
                          
                          className="w-full py-2.5 text-center text-sm"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <Send className="w-4 h-4" />
                            Demander un devis
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="text-center mt-20">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-white/10">
            <h2 className="text-2xl font-bold mb-3">
              Vous avez un projet similaire ?
            </h2>
            <p className="text-gray-400 mb-6">
              Discutons de votre idée et créons quelque chose ensemble
            </p>
            <Link href="/contact">
              <button
                className="inline-flex px-6 py-2"
              >
                Contactez-nous
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};