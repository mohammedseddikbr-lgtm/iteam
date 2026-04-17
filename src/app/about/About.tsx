// components/pages/About.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, 
  Eye, 
  Rocket, 
  Users, 
  Award, 
  Globe, 
  TrendingUp,
  Heart,
  Clock,
  Zap,
  Shield,
  Star,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Building,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Github,
  Coffee,
  Palette,
  Code,
  Server,
  Cpu,
  Brain,
  X,
  Upload,
  User,
  Briefcase,
  GraduationCap,
  FileText,
  CheckCircle,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientText } from "@/components/ui/GradientText";
import { TechBackground } from "@/components/ui/TechBackground";

// ==================== INTERFACES ====================
interface ApplicationFormData {
  // Informations personnelles
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  linkedin: string;
  
  // Informations professionnelles
  posteRecherche: string;
  specialite: string;
  experience: string;
  niveauEtude: string;
  
  // Motivation
  pourquoiNous: string;
  competences: string;
  disponibilite: string;
  
  // Fichiers
  cv: File | null;
  lettreMotivation: File | null;
  
  // Consentement
  consentementDonnees: boolean;
  consentementNewsletter: boolean;
}

// ==================== FORM MODAL COMPONENT ====================
const ApplicationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    linkedin: "",
    posteRecherche: "",
    specialite: "",
    experience: "",
    niveauEtude: "",
    pourquoiNous: "",
    competences: "",
    disponibilite: "immédiate",
    cv: null,
    lettreMotivation: null,
    consentementDonnees: false,
    consentementNewsletter: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const sections = [
    { id: 0, title: "Informations Personnelles" },
    { id: 1, title: "Profil Professionnel" },
    { id: 2, title: "Motivation & Compétences" },
    { id: 3, title: "Documents" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'cv' | 'lettreMotivation') => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.files![0]
      }));
    }
  };

  const handleDrag = (e: React.DragEvent, field: 'cv' | 'lettreMotivation') => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, field: 'cv' | 'lettreMotivation') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData(prev => ({
        ...prev,
        [field]: e.dataTransfer.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Réinitialiser après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        linkedin: "",
        posteRecherche: "",
        specialite: "",
        experience: "",
        niveauEtude: "",
        pourquoiNous: "",
        competences: "",
        disponibilite: "immédiate",
        cv: null,
        lettreMotivation: null,
        consentementDonnees: false,
        consentementNewsletter: false
      });
    }, 3000);
  };

  const nextSection = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
    }
  };

  const prevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
             {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xl transition-all"
              >
                <X className="w-5 h-5" />
              </motion.button>
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 shadow-2xl shadow-blue-500/20"
            >
             

              {/* Progress Steps */}
              <div className="md:px-8 px-4 pt-8 pb-2 md:pb-6 border-b border-white/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      Postuler chez i-Team
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      Rejoignez notre équipe de visionnaires
                    </p>
                  </div>
                  
                  {/* Progress Steps */}
                  <div className="flex items-center gap-2">
                    {sections.map((section, idx) => (
                      <div key={section.id} className="flex items-center">
                        <div className="relative">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300",
                            activeSection >= idx 
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                              : "bg-white/5 text-gray-400"
                          )}>
                            {idx + 1}
                          </div>
                          {activeSection > idx && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -inset-1 rounded-full border-2 border-blue-400/50"
                            />
                          )}
                        </div>
                        {idx < sections.length - 1 && (
                          <div className={cn(
                            "w-8 h-0.5 transition-all duration-300",
                            activeSection > idx 
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                              : "bg-white/10"
                          )} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Titles */}
                  <div className="flex overflow-x-auto max-h-[calc(90vh-180px)] px-2 md:px-8 py-2 md:py-6 scrollbar-hide">
                  {sections.map((section, idx) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(idx)}
                      className={cn(
                        "px-4 py-2 text-xs md:text-sm rounded-lg transition-all duration-300 whitespace-nowrap mr-2",
                        activeSection === idx
                          ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-180px)] md:px-8 px-4 py-6">
                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Section 1: Informations Personnelles */}
                        {activeSection === 0 && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Nom *
                                </label>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                  <input
                                    type="text"
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                                    placeholder="Votre nom"
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Prénom *
                                </label>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                  <input
                                    type="text"
                                    name="prenom"
                                    value={formData.prenom}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                                    placeholder="Votre prénom"
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email *
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                                  placeholder="email@exemple.com"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Téléphone *
                                </label>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                  <input
                                    type="tel"
                                    name="telephone"
                                    value={formData.telephone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                                    placeholder="+213 5XX XX XX XX"
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Profil LinkedIn
                                </label>
                                <div className="relative">
                                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                  <input
                                    type="url"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleInputChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                                    placeholder="https://linkedin.com/in/votre-profil"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Section 2: Profil Professionnel */}
                        {activeSection === 1 && (
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Poste recherché *
                              </label>
                              <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                  type="text"
                                  name="posteRecherche"
                                  value={formData.posteRecherche}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                                  placeholder="Ex: Développeur Full Stack, Designer UX/UI..."
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Spécialité *
                                </label>
                                <select
                                  name="specialite"
                                  value={formData.specialite}
                                  onChange={handleInputChange}
                                  required 
                                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                                >
                                  <option value="" className="text-black">Sélectionnez votre spécialité</option>
                                  <option value="developpement" className="text-black">Développement Web/Mobile</option>
                                  <option value="design" className="text-black">Design UI/UX</option>
                                  <option value="marketing" className="text-black">Marketing Digital</option>
                                  <option value="data" className="text-black">Data Science & IA</option>
                                  <option value="devops" className="text-black">DevOps & Cloud</option>
                                  <option value="autre" className="text-black">Autre</option>
                                </select>
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Niveau d'expérience *
                                </label>

                                <select
                                  name="experience"
                                  value={formData.experience}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                                >
                                  <option value="" className="text-black">Sélectionnez votre niveau</option>
                                  <option value="debutant" className="text-black">Débutant (0-2 ans)</option>
                                  <option value="intermediaire" className="text-black">Intermédiaire (2-5 ans)</option>
                                  <option value="senior" className="text-black">Senior (5-8 ans)</option>
                                  <option value="expert" className="text-black">Expert (8+ ans)</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Niveau d'étude *
                                </label>
                                <div className="relative">
                                  <GraduationCap className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                  <select
                                    name="niveauEtude"
                                    value={formData.niveauEtude}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                                  >
                                    <option value="" className="text-black">Sélectionnez votre niveau</option>
                                    <option value="bac" className="text-black">Bac</option>
                                    <option value="bac+2" className="text-black">Bac+2 (BTS, DUT)</option>
                                    <option value="bac+3" className="text-black">Bac+3 (Licence)</option>
                                    <option value="bac+5" className="text-black">Bac+5 (Master, École d'ingénieur)</option>
                                    <option value="doctorat" className="text-black">Doctorat</option>
                                    <option value="autre" className="text-black">Autre</option>
                                  </select>
                                </div>
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Disponibilité *
                                </label>
                                <select
                                  name="disponibilite"
                                  value={formData.disponibilite}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                                >
                                  <option value="immédiate" className="text-black">Immédiate</option>
                                  <option value="1mois" className="text-black">1 mois</option>
                                  <option value="3mois" className="text-black">3 mois</option>
                                  <option value="nego" className="text-black">À négocier</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Section 3: Motivation & Compétences */}
                        {activeSection === 2 && (
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Pourquoi souhaitez-vous rejoindre i-Team ? *
                              </label>
                              <textarea
                                name="pourquoiNous"
                                value={formData.pourquoiNous}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 resize-none"
                                placeholder="Expliquez-nous ce qui vous motive à rejoindre notre équipe..."
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Vos compétences techniques et soft skills *
                              </label>
                              <textarea
                                name="competences"
                                value={formData.competences}
                                onChange={handleInputChange}
                                required
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 resize-none"
                                placeholder="Listez vos compétences principales (ex: React, Node.js, Photoshop, Communication...)"
                              />
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <input
                                  type="checkbox"
                                  id="consentementDonnees"
                                  name="consentementDonnees"
                                  checked={formData.consentementDonnees}
                                  onChange={handleInputChange}
                                  required
                                  className="mt-1 w-5 h-5 rounded-lg bg-white/5 border border-white/10 text-blue-500 focus:ring-blue-500/50 focus:ring-2"
                                />
                                <label htmlFor="consentementDonnees" className="text-sm text-gray-300">
                                  J'accepte que mes données soient traitées conformément à la politique de confidentialité d'i-Team *
                                </label>
                              </div>

                              <div className="flex items-start gap-3">
                                <input
                                  type="checkbox"
                                  id="consentementNewsletter"
                                  name="consentementNewsletter"
                                  checked={formData.consentementNewsletter}
                                  onChange={handleInputChange}
                                  className="mt-1 w-5 h-5 rounded-lg bg-white/5 border border-white/10 text-blue-500 focus:ring-blue-500/50 focus:ring-2"
                                />
                                <label htmlFor="consentementNewsletter" className="text-sm text-gray-300">
                                  Je souhaite recevoir des informations sur les nouvelles opportunités et actualités d'i-Team
                                </label>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Section 4: Documents */}
                        {activeSection === 3 && (
                          <div className="space-y-6">
                            {/* CV Upload */}
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-4">
                                CV (PDF) *
                              </label>
                              <div
                                className={cn(
                                  "relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer",
                                  dragActive
                                    ? "border-blue-500/50 bg-blue-500/10"
                                    : "border-white/10 hover:border-blue-500/30 hover:bg-white/5",
                                  formData.cv && "border-green-500/50 bg-green-500/10"
                                )}
                                onDragEnter={(e) => handleDrag(e, 'cv')}
                                onDragLeave={(e) => handleDrag(e, 'cv')}
                                onDragOver={(e) => handleDrag(e, 'cv')}
                                onDrop={(e) => handleDrop(e, 'cv')}
                                onClick={() => document.getElementById('cv-upload')?.click()}
                              >
                                <input
                                  id="cv-upload"
                                  type="file"
                                  accept=".pdf"
                                  onChange={(e) => handleFileChange(e, 'cv')}
                                  className="hidden"
                                />
                                
                                <div className="flex flex-col items-center gap-4">
                                  <div className="p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                                    <Upload className="w-8 h-8 text-blue-400" />
                                  </div>
                                  
                                  {formData.cv ? (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-green-400">
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="font-medium">CV téléversé</span>
                                      </div>
                                      <p className="text-sm text-gray-400">
                                        {formData.cv.name}
                                      </p>
                                    </div>
                                  ) : (
                                    <>
                                      <div>
                                        <p className="text-gray-300 font-medium mb-1">
                                          Glissez-déposez votre CV
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          ou cliquez pour sélectionner un fichier PDF
                                        </p>
                                      </div>
                                      <p className="text-xs text-gray-500">
                                        Taille maximale : 5MB
                                      </p>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Lettre de motivation Upload */}
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-4">
                                Lettre de motivation (Optionnel)
                              </label>
                              <div
                                className={cn(
                                  "relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer",
                                  dragActive
                                    ? "border-blue-500/50 bg-blue-500/10"
                                    : "border-white/10 hover:border-blue-500/30 hover:bg-white/5",
                                  formData.lettreMotivation && "border-green-500/50 bg-green-500/10"
                                )}
                                onDragEnter={(e) => handleDrag(e, 'lettreMotivation')}
                                onDragLeave={(e) => handleDrag(e, 'lettreMotivation')}
                                onDragOver={(e) => handleDrag(e, 'lettreMotivation')}
                                onDrop={(e) => handleDrop(e, 'lettreMotivation')}
                                onClick={() => document.getElementById('lettre-upload')?.click()}
                              >
                                <input
                                  id="lettre-upload"
                                  type="file"
                                  accept=".pdf"
                                  onChange={(e) => handleFileChange(e, 'lettreMotivation')}
                                  className="hidden"
                                />
                                
                                <div className="flex flex-col items-center gap-4">
                                  <div className="p-4 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                                    <FileText className="w-8 h-8 text-purple-400" />
                                  </div>
                                  
                                  {formData.lettreMotivation ? (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-green-400">
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="font-medium">Lettre téléversée</span>
                                      </div>
                                      <p className="text-sm text-gray-400">
                                        {formData.lettreMotivation.name}
                                      </p>
                                    </div>
                                  ) : (
                                    <>
                                      <div>
                                        <p className="text-gray-300 font-medium mb-1">
                                          Glissez-déposez votre lettre
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          ou cliquez pour sélectionner un fichier PDF
                                        </p>
                                      </div>
                                      <p className="text-xs text-gray-500">
                                        Taille maximale : 5MB
                                      </p>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      // Success State
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.2 }}
                          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"
                        >
                          <CheckCircle className="w-10 h-10" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                          Candidature envoyée avec succès !
                        </h3>
                        <p className="text-gray-400 mb-6">
                          Nous avons bien reçu votre candidature. Notre équipe RH l'examinera 
                          et vous recontactera dans les plus brefs délais.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span>Redirection vers la page en cours...</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  {!isSubmitted && (
                    <div className="flex flex-col sm:flex-row gap-2 mt-8 md:py-6 pt-2 pb-16 border-t border-white/10">
                      <button
                        type="button"
                        onClick={prevSection}
                        disabled={activeSection === 0}
                        className={cn(
                          "px-6 py-3 rounded-xl font-medium transition-all duration-300",
                          activeSection === 0
                            ? "opacity-50 cursor-not-allowed"
                            : "bg-white/5 hover:bg-white/10 border border-white/10"
                        )}
                      >
                        Précédent
                      </button>
                      
                      <div className="flex-1" />
                      
                      {activeSection < sections.length - 1 ? (
                        <button
                          type="button"
                          onClick={nextSection}
                          className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 hover:border-blue-500/50 transition-all"
                        >
                          Suivant
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting || !formData.cv}
                          className={cn(
                            "px-8 py-3 rounded-xl font-medium transition-all duration-300",
                            "flex items-center justify-center gap-2",
                            isSubmitting || !formData.cv
                              ? "opacity-50 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                          )}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              Envoyer ma candidature
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ==================== MAIN COMPONENT ====================
export const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const valeurs = [
    {
      icone: <Zap className="w-8 h-8" />,
      titre: "Innovation",
      description: "Repousser constamment les limites avec les technologies de pointe",
      couleur: "from-blue-500 to-cyan-500"
    },
    {
      icone: <Shield className="w-8 h-8" />,
      titre: "Intégrité",
      description: "Communication transparente et pratiques éthiques",
      couleur: "from-cyan-500 to-emerald-500"
    },
    {
      icone: <Users className="w-8 h-8" />,
      titre: "Collaboration",
      description: "Travailler ensemble pour obtenir des résultats extraordinaires",
      couleur: "from-emerald-500 to-green-500"
    },
    {
      icone: <Heart className="w-8 h-8" />,
      titre: "Passion",
      description: "Amour de la technologie et dévouement à l'excellence",
      couleur: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="relative min-h-screen bg-linear-to-br from-gray-900 via-blue-900/20 to-gray-900 text-white overflow-hidden">
      <TechBackground />
      
      {/* Application Modal */}
      <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
     
      {/* Section Héro */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 mb-8"
            >
              <Building className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300">À propos d'i-Team</span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
             Accélérez Votre <GradientText>Transformation Digitale</GradientText>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Agence digitale innovante spécialisée dans la création de solutions sur mesure 
              qui valorisent votre image, optimisent votre présence en ligne et accélèrent 
              votre croissance commerciale.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-20 md:mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20"
            >
              <div className="absolute -top-6 -left-6 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Target className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-6 mt-6">Notre Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Chez i-Team, notre mission est de fournir des solutions digitales complètes et personnalisées 
                qui aident nos clients à se démarquer, à valoriser leur image et à atteindre leurs objectifs 
                avec efficacité et créativité. Nous combinons technologie, design et stratégie pour transformer 
                chaque projet en une expérience digitale réussie et durable.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm text-cyan-300">
                  <Code className="w-4 h-4" />
                  <span>Solutions personnalisées</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-cyan-300">
                  <Palette className="w-4 h-4" />
                  <span>Design créatif</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20"
            >
              <div className="absolute -top-6 -left-6 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Eye className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-6 mt-6">Notre Vision</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Nous aspirons à devenir une référence incontournable dans le monde digital et créatif, 
                reconnue pour notre innovation, notre qualité de service et notre capacité à anticiper 
                les besoins du marché. Chez i-Team, nous visons à construire des relations durables avec 
                nos clients en contribuant à leur succès et à leur croissance.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm text-purple-300">
                  <TrendingUp className="w-4 h-4" />
                  <span>Croissance durable</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-300">
                  <Star className="w-4 h-4" />
                  <span>Référence qualité</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Section Équipe - COMMENTÉE (Masquée temporairement) */}
          {/*
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20 md:mb-32"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Notre <GradientText>Équipe Passionnée</GradientText>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Une équipe de professionnels dévoués à transformer votre vision en réalité digitale
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {membresEquipe.map((membre, idx) => (
                ...
              ))}
            </div>
          </motion.div>
          */}

          {/* Valeurs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20 md:mb-32"
          >
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                Nos <GradientText>Valeurs Fondamentales</GradientText>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Les principes qui guident chaque décision et action au sein d'i-Team
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {valeurs.map((valeur, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onMouseEnter={() => setHoveredValue(idx)}
                  onMouseLeave={() => setHoveredValue(null)}
                  className="relative p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={cn(
                      "w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center",
                      "bg-gradient-to-br from-white/10 to-white/5",
                      "border border-white/10"
                    )}>
                      <motion.div
                        animate={{
                          scale: hoveredValue === idx ? 1.2 : 1,
                          rotate: hoveredValue === idx ? [0, 10, -10, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        className={valeur.couleur.replace("from-", "text-").split(" ")[0]}
                      >
                        {valeur.icone}
                      </motion.div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white">{valeur.titre}</h3>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base">{valeur.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bureau & Culture */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 md:mb-32"
          >
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre Culture d'Équipe</h2>
                <div className="space-y-6">
                  {[
                    {
                      icone: <Code className="w-6 h-6" />,
                      titre: "Innovation Continue",
                      description: "Veille technologique et adoption des dernières innovations"
                    },
                    {
                      icone: <Users className="w-6 h-6" />,
                      titre: "Collaboration Étroite",
                      description: "Travail d'équipe et communication transparente"
                    },
                    {
                      icone: <Heart className="w-6 h-6" />,
                      titre: "Passion du Métier",
                      description: "Engagement et dévouement à chaque projet"
                    },
                    {
                      icone: <Shield className="w-6 h-6" />,
                      titre: "Qualité Garantie",
                      description: "Standards d'excellence dans chaque livrable"
                    }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="p-2 md:p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                        {item.icone}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm md:text-base">{item.titre}</h4>
                        <p className="text-gray-400 text-xs md:text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Notre Bureau</h2>
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 overflow-hidden">
  
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                      <MapPin className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Siège Social – Algérie</h3>
                      <p className="text-gray-400">
                        25 Boulevard Ouaked Ahmed، Cheraga 16002
                      </p>
                    </div>
                  </div>

                  {/* Contact info - NUMÉRO MODIFIÉ */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-300">+213 796 779 790</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-300">contact@iteam.dz</span>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="mt-8 h-48 rounded-xl overflow-hidden border border-white/10">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6300.705974918544!2d2.958552!3d36.767427!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb10069799cfb%3A0x8d01439935b3ac0c!2sIteam%20Digital!5e1!3m2!1sar!2sdz!4v1766162893709!5m2!1sar!2sdz"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-xl"
                    />
                  </div>

                </div>
              </div>
            </div>
          </motion.div>

          {/* Section CTA - COMMENTÉE (Masquée temporairement) */}
          {/*
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative p-6 md:p-12 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 mb-6 md:mb-8">
                  <Users className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                  Rejoignez Notre Aventure
                </h2>
                <p className="text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                  Faites partie d'une équipe qui façonne l'avenir de l'innovation digitale.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="relative px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Rejoindre Nous
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  <button className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    Contactez Notre Équipe
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          */}
        </div>
      </section>
    </div>
  );
};