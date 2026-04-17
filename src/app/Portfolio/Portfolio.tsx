// components/pages/Portfolio.tsx
"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Link from "next/link";

const TechBackground = dynamic(() => import('@/components/ui/TechBackground').then(mod => mod.TechBackground), { ssr: false, loading: () => null });
const FloatingParticles = dynamic(() => import('@/app/Portfolio/components/FloatingParticles').then(mod => mod.FloatingParticles), { ssr: false, loading: () => null });

import {
  Code2,
  Palette,
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
  Layout,
  Award,
  ExternalLink,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GradientText } from "@/components/ui/GradientText";
import { cn } from "@/lib/utils";

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
  features?: string[];
}

// Composant pour l'image de la carte
const ProjectImage = ({ src, alt, color }: { src: string; alt: string; color: string }) => {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setImgError(true);
      setIsLoading(false);
    };
  }, [src]);

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
    <div className="relative w-full h-full">
      {isLoading && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center z-10",
          `bg-gradient-to-br ${color}`
        )}>
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-700",
          isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100 group-hover:scale-110"
        )}
      />
    </div>
  );
};

// Composant pour l'image de la modale
const ModalImage = ({ src, alt, color }: { src: string; alt: string; color: string }) => {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setImgError(true);
      setIsLoading(false);
    };
  }, [src]);

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
    <div className="relative w-full h-full bg-gray-900">
      {isLoading && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center z-10",
          `bg-gradient-to-br ${color}`
        )}>
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-contain transition-all duration-500",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
};

// Composant ImageIcon
const ImageIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// Composant CheckIcon
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [filterCategory, setFilterCategory] = useState<ProjectCategory | "all">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Préchargement des images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = projects.map((project) => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.src = project.imageUrl;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });
      });
      await Promise.all(imagePromises);
    };
    preloadImages();
  }, []);

  // Gestion du scroll quand la modale est ouverte
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
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

  // ========== PROJETS ==========
  const projects: PortfolioProject[] = [
    {
      id: 1,
      title: "Store B2B - CSM Taksit",
      category: "web",
      categoryName: "Développement Web",
      description: "Plateforme B2B e-commerce avec système de paiement échelonné",
      icon: <ShoppingBag className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      imageUrl: "/images/store-b2b.jpg",
      client: "CSM Taksit",
      year: "2024",
      technologies: ["WordPress", "WooCommerce", "PHP", "MySQL", "Custom Plugins", "REST API"],
      fullDescription: "Plateforme e-commerce B2B complète développée avec WordPress et WooCommerce. Solution sur mesure permettant aux professionnels d'acheter en ligne avec un système de paiement échelonné (taksit). Interface intuitive, catalogue produits avancé, gestion des stocks en temps réel et suivi des commandes.",
      link: "https://b2b.csmtaksit.dz/",
      features: [
        "Système de paiement en plusieurs fois (Taksit)",
        "Catalogue produits B2B",
        "Gestion des stocks temps réel",
        "Multi-devises et taux personnalisés",
        "Export factures et devis",
        "Dashboard fournisseur"
      ]
    },
    {
      id: 2,
      title: "Plateforme Médicale i-doc",
      category: "web",
      categoryName: "Développement Web",
      description: "Plateforme de téléconsultation et gestion médicale",
      icon: <Stethoscope className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      imageUrl: "/images/i-doc.png",
      client: "i-doc",
      year: "2024",
      technologies: ["React.js", "Laravel", "MySQL", "WebRTC", "Tailwind CSS", "RESTful API"],
      fullDescription: "Application web moderne de téléconsultation et gestion médicale. Interface utilisateur réactive avec React.js et backend robuste avec Laravel. Permet aux médecins de gérer leurs patients, consultations, dossiers médicaux et téléconsultations en visioconférence sécurisée.",
      link: "https://i-doc.com",
      features: [
        "Téléconsultation en visio (WebRTC)",
        "Gestion des dossiers patients",
        "Prise de rendez-vous en ligne",
        "Ordonnances et prescriptions digitales",
        "Chat sécurisé médecin-patient",
        "Tableau de bord analytique"
      ]
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
      technologies: ["Meta Business Suite", "Canva", "Later", "Hootsuite", "Google Analytics"],
      fullDescription: "Gestion complète des réseaux sociaux du Groupe Rahmani : création de contenu, planification éditoriale, community management, modération et reporting mensuel. Stratégie de contenu adaptée à chaque plateforme.",
      link: "https://facebook.com/grouperahmani",
      features: [
        "Stratégie de contenu mensuelle",
        "Création de visuels professionnels",
        "Community management 24/7",
        "Campagnes publicitaires ciblées",
        "Rapports d'analyse détaillés",
        "Veille concurrentielle"
      ]
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
      technologies: ["Meta Ads", "Instagram Business", "Facebook Creator Studio", "Buffer"],
      fullDescription: "Stratégie de contenu et community management pour CSM Taksit. Gestion des pages Facebook et Instagram, création de publications engageantes, campagnes publicitaires ciblées pour promouvoir les offres de financement.",
      link: "https://facebook.com/csmtaksit",
      features: [
        "Planning éditorial mensuel",
        "Création de contenu visuel",
        "Modération et interaction",
        "Campagnes Meta Ads",
        "Analyse des performances",
        "Rapports hebdomadaires"
      ]
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
      technologies: ["Instagram", "Facebook", "LinkedIn", "Sprout Social", "Google Analytics"],
      fullDescription: "Gestion complète des réseaux sociaux d'EMS Algérie. Création de contenu visuel et textuel, stratégie d'engagement, campagnes publicitaires, reporting mensuel et analyse des KPIs.",
      link: "https://www.facebook.com/officielleEMSCHAMPIONPOSTALGERIA",
      features: [
        "Gestion multi-plateformes",
        "Création de contenus premium",
        "Stratégie d'engagement",
        "Campagnes publicitaires",
        "E-réputation monitoring",
        "Analyses et recommandations"
      ]
    },
    {
      id: 6,
      title: "Affiches Publicitaires",
      category: "design",
      categoryName: "Design Graphique",
      description: "Création d'affiches et flyers pour campagnes marketing",
      icon: <Layout className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      imageUrl: "/images/affiches.png",
      client: "EMS Algérie",
      year: "2024",
      technologies: ["Adobe Photoshop", "Adobe Illustrator", "InDesign", "Figma"],
      fullDescription: "Création d'affiches publicitaires, flyers et supports print pour les campagnes marketing d'EMS Algérie. Designs modernes et percutants adaptés aux différents supports.",
      features: [
        "Affiches publicitaires",
        "Flyers et brochures",
        "Bannières web",
        "Supports print",
        "Adaptation multi-formats",
        "Charte graphique cohérente"
      ]
    },
    {
      id: 7,
      title: "UI/UX - Plateforme i-doc",
      category: "design",
      categoryName: "Design Graphique",
      description: "Design d'interface utilisateur pour plateforme médicale",
      icon: <Award className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-500",
      imageUrl: "/images/ui-ux-idoc.png",
      client: "i-doc",
      year: "2024",
      technologies: ["Figma", "Adobe XD", "Miro", "Whimsical", "Illustrator"],
      fullDescription: "Design UI/UX complet pour la plateforme médicale i-doc. Création de wireframes, prototypes interactifs, design system et tests utilisateurs. Interface claire et intuitive pour médecins et patients.",
      features: [
        "Wireframes et prototypes",
        "Design system complet",
        "Tests utilisateurs",
        "Accessibilité (WCAG)",
        "Responsive design",
        "Animations UI"
      ]
    },
    {
      id: 8,
      title: "Campagne Publicitaire EMS",
      category: "marketing",
      categoryName: "Marketing Digital",
      description: "Campagne Facebook & Instagram Ads",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-red-500 to-rose-500",
      imageUrl: "/images/campagne-ems.png",
      client: "EMS Algérie",
      year: "2024",
      technologies: ["Meta Ads Manager","Google Analytics"],
      fullDescription: "Campagne publicitaire sur Facebook et Instagram pour promouvoir les services d'EMS Algérie. Stratégie d'audience ciblée, créations publicitaires A/B testées, optimisation continue et reporting détaillé.",
      link: "https://www.facebook.com/reel/3060308457474091",
      features: [
        "Audience ciblée",
        "Créations A/B testées",
        "Optimisation continue",
        "Budget management",
        "Reporting détaillé",
        "ROI mesurable"
      ]
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

      {/* Supprimé le z-10 pour éviter les conflits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => openModal(project)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className={cn(
                  "h-64 relative overflow-hidden",
                  `bg-gradient-to-br ${project.color}`
                )}>
                  <ProjectImage 
                    src={project.imageUrl} 
                    alt={project.title} 
                    color={project.color}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Maximize2 className="w-8 h-8 text-white" />
                    <span className="text-white font-medium">Voir détails</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-sm text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded-full bg-white/5 text-cyan-400">
                        {tech}
                      </span>
                    ))}
                    {project.technologies && project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={cn(
                      "px-3 py-1 rounded-full font-medium",
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

        {/* MODALE - Z-INDEX CORRIGÉ - Supprimé le pointer-events-none du container */}
        <AnimatePresence>
          {isModalOpen && selectedProject && (
            <>
              {/* Overlay avec z-index très élevé */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
                style={{ zIndex: 99999 }}
                onClick={closeModal}
              />
              
              {/* Modal Container */}
              <div 
                className="fixed inset-0 flex items-center justify-center p-4 md:p-6"
                style={{ zIndex: 100000 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/20 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors backdrop-blur-sm text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex flex-col md:flex-row h-full">
                    {/* Partie image */}
                    <div className={cn(
                      "md:w-1/2 h-80 md:h-auto relative overflow-hidden",
                      `bg-gradient-to-br ${selectedProject.color}`
                    )}>
                      <ModalImage 
                        src={selectedProject.imageUrl} 
                        alt={selectedProject.title} 
                        color={selectedProject.color}
                      />
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <span className={cn(
                          "text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md bg-black/60 text-white"
                        )}>
                          {selectedProject.categoryName}
                        </span>
                        <span className="text-xs text-white backdrop-blur-md bg-black/60 px-3 py-1 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {selectedProject.year}
                        </span>
                      </div>
                    </div>

                    {/* Partie contenu */}
                    <div className="md:w-1/2 p-6 overflow-y-auto max-h-[calc(90vh-2rem)]">
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h2>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 pb-4 border-b border-white/10">
                        <Briefcase className="w-4 h-4" />
                        <span>{selectedProject.client}</span>
                      </div>

                      <div className="mb-5">
                        <p className="text-gray-300 leading-relaxed">
                          {selectedProject.fullDescription}
                        </p>
                      </div>

                      {selectedProject.features && selectedProject.features.length > 0 && (
                        <div className="mb-5">
                          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-cyan-400" />
                            Fonctionnalités principales
                          </h3>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedProject.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                                <CheckIcon className="w-3 h-3 text-green-400" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-cyan-400" />
                            Technologies utilisées
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 text-xs rounded-lg bg-white/10 border border-white/10 text-cyan-400 font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Boutons */}
                      <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-white/10">
                        {selectedProject.link && (
                          <a
                            href={selectedProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 text-center text-sm rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Visiter le site web
                          </a>
                        )}
                        
                        <Link href="/contact" onClick={closeModal} className="w-full">
                          <button className="w-full py-3 text-center text-sm rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                            <Send className="w-4 h-4" />
                            Demander un devis
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="text-center mt-20">
          <div className="p-10 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-white/10">
            <h2 className="text-3xl font-bold mb-4">
              Vous avez un projet similaire ?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Discutons de votre idée et créons quelque chose ensemble
            </p>
            <Link href="/contact">
              <button className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 active:scale-95 text-lg">
                Contactez-nous
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};