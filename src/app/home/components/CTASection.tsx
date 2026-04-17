// components/pages/sections/CTASection.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, Mail, ChevronRight, Clock, Headphones, MessageCircle, PhoneCall, X, Loader2, CheckCircle, Building, User, Phone, Send, ArrowRight } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";

// رابط Google Sheets Webhook
const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzEhym5RcwdnLMIHnz3LfgHH_cnEyH91pg1OolbVkGJ5LGDzj-s16wCRIZk5nInlGHp/exec";

export const CTASection = () => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });

  // رقم WhatsApp
  const whatsappNumber = "213796779790";

  // دالة إرسال البيانات إلى Google Sheets (لـ WhatsApp)
  const sendToGoogleSheetsWhatsApp = async () => {
    try {
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString('fr-FR'),
          name: "Visiteur WhatsApp",
          email: "",
          phone: "",
          company: "",
          service: "Consultation WhatsApp",
          message: "Le visiteur a cliqué sur le bouton WhatsApp pour une consultation directe",
          source: "CTA WhatsApp (Direct)",
          status: 'Nouveau',
          budget: ''
        }),
      });
      
      return { success: true };
    } catch (error) {
      console.error('Google Sheets Error:', error);
      return { success: false };
    }
  };

  // دالة إرسال البيانات إلى Google Sheets (لـ Email)
  const sendToGoogleSheetsEmail = async (data: any) => {
    try {
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString('fr-FR'),
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          company: data.company,
          service: "Demande de Devis",
          message: data.message || "Demande de devis personnalisé",
          source: "CTA Email (Formulaire)",
          status: 'Nouveau',
          budget: ''
        }),
      });
      
      return { success: true };
    } catch (error) {
      console.error('Google Sheets Error:', error);
      throw error;
    }
  };

  // معالج زر WhatsApp
  const handleWhatsAppClick = async () => {
    // إرسال البيانات إلى Google Sheets (بدون إدخال من المستخدم)
    await sendToGoogleSheetsWhatsApp();
    
    // فتح WhatsApp
    const whatsappMessage = "Bonjour, je souhaite bénéficier d'une consultation gratuite pour mon projet digital.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  // فتح نموذج Email
  const handleEmailClick = () => {
    setShowEmailModal(true);
    setError(null);
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      message: ""
    });
  };

  // إغلاق النموذج
  const handleCloseModal = () => {
    setShowEmailModal(false);
    setIsSubmitting(false);
    setIsSubmitted(false);
    setError(null);
  };

  // معالج تغيير الحقول
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // معالج إرسال نموذج Email
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await sendToGoogleSheetsEmail(formData);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Fermer le modal après 3 secondes
      setTimeout(() => {
        handleCloseModal();
      }, 3000);

    } catch (error: any) {
      console.error('Erreur:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
      setIsSubmitting(false);
    }
  };

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
          <ContenuCTA 
            onWhatsAppClick={handleWhatsAppClick}
            onEmailClick={handleEmailClick}
          />
        </motion.div>
      </div>

      {/* Modal pour le formulaire Email */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-8 h-8 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-white">Demande de Devis</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Remplissez ce formulaire pour recevoir un devis personnalisé sous 24h.
                </p>
              </div>

              {/* Success Message */}
              {isSubmitted ? (
                <div className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Demande envoyée !</h4>
                  <p className="text-gray-300">
                    Nous vous enverrons un devis personnalisé sous 24h à l'adresse {formData.email}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* Error Message */}
                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nom complet *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Votre nom et prénom"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="votre@email.com"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Numéro de téléphone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="+213 XX XX XX XX"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nom de l'entreprise
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Nom de votre entreprise"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message (optionnel)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      placeholder="Décrivez brièvement votre projet..."
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 inline mr-2" />
                        Recevoir mon Devis
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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

const ContenuCTA = ({ onWhatsAppClick, onEmailClick }: { onWhatsAppClick: () => void; onEmailClick: () => void }) => {
  return (
    <div className="relative z-10 text-center">
      <IconeFlottante />
      <EnTeteSection />
      <ActionsCTA onWhatsAppClick={onWhatsAppClick} onEmailClick={onEmailClick} />
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
      <Headphones className="w-12 h-12" />
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
        Discutez directement avec nos experts et obtenez une feuille de route personnalisée pour votre projet.
      </p>
    </>
  );
};

const ActionsCTA = ({ onWhatsAppClick, onEmailClick }: { onWhatsAppClick: () => void; onEmailClick: () => void }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      {/* WhatsApp Button - Consultation directe */}
      <button
        onClick={onWhatsAppClick}
        className="group relative md:px-10 p-3 md:py-5 text-base md:text-lg font-semibold rounded-xl md:rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 shadow-2xl shadow-green-500/25 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
          Consultation WhatsApp
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>
      
      {/* Email Button - Formulaire de devis */}
      <button
        onClick={onEmailClick}
        className="group md:px-10 md:py-5 p-3 text-base md:text-lg rounded-xl text-center md:rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 backdrop-blur-xl border border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span className="flex items-center justify-center gap-3">
          <Mail className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
          Demander un Devis
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
        </span>
      </button>
    </div>
  );
};

const TempsReponse = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
      <p className="text-gray-400 text-xs md:text-sm flex items-center gap-2">
        <Clock className="w-4 h-4" />
        Réponse sous 2 heures
      </p>
      <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full" />
      <p className="text-gray-400 text-xs md:text-sm flex items-center gap-2">
        <Headphones className="w-4 h-4" />
        Support prioritaire
      </p>
      <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full" />
      <p className="text-gray-400 text-xs md:text-sm flex items-center gap-2">
        <MessageCircle className="w-4 h-4" />
        WhatsApp 24/7
      </p>
    </div>
  );
};

export default CTASection;