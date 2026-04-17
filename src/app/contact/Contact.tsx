// components/pages/Contact.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Calendar,
  Users,
  X,
  CheckCircle,
  Loader2,
  Building,
  PhoneCall,
  Video,
  Facebook,
  Instagram,
  Linkedin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientText } from "@/components/ui/GradientText";
import { TechBackground } from "@/components/ui/TechBackground";
import { CustomDropdown } from "./components/CustomDropDown";

// رابط Google Sheets Webhook
const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzEhym5RcwdnLMIHnz3LfgHH_cnEyH91pg1OolbVkGJ5LGDzj-s16wCRIZk5nInlGHp/exec";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
    budget: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // دالة لإرسال البيانات إلى Google Sheets
  const sendToGoogleSheets = async (data: any) => {
    try {
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString('fr-FR'),
          name: data.name,
          email: data.email,
          company: data.company || '',
          phone: data.phone || '',
          service: data.service || '',
          message: data.message,
          budget: data.budget || '',
          status: 'Nouveau'
        }),
      });
      
      return { success: true };
    } catch (error) {
      console.error('Google Sheets Error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // إرسال البيانات إلى Google Sheets
      await sendToGoogleSheets(formData);
      
      // محاولة إرسال الإيميل إذا كان متاحاً (اختياري)
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            phone: formData.phone,
            service: formData.service,
            message: formData.message,
            budget: formData.budget
          }),
        });
      } catch (emailError) {
        // تجاهل خطأ الإيميل، المهم هو Google Sheets
        console.log('Email service not available, but Google Sheets works');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // إعادة تعيين النموذج بعد 5 ثواني
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          service: "",
          message: "",
          budget: ""
        });
      }, 5000);

    } catch (error: any) {
      console.error('Erreur:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      value: "+213 549 402 461",
      subtitle: "Dimanche-Jeudi, 8h-16h",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "contact@iteam.digital",
      subtitle: "Réponse sous 2 heures",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Adresse",
      value: "Chéraga, Alger",
      subtitle: "25 Bd Ouaked Ahmed",
      color: "from-cyan-500 to-emerald-500"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horaires",
      value: "Support 24/7",
      subtitle: "Support d'urgence disponible",
      color: "from-emerald-500 to-green-500"
    }
  ];

  const services = [
    "Solutions Web & Digitales",
    "Design & Branding",
    "Production Audiovisuelle",
    "Marketing & Communication",
    "Autre"
  ];

  const budgets = [
    "Moins de 30,000 DA",
    "30,000 - 70,000 DA",
    "70,000 - 120,000 DA",
    "120,000 - 200,000 DA",
    "Plus de 200,000 DA"
  ];

  return (
    <div className="relative min-h-screen bg-linear-to-br from-gray-900 via-blue-900/20 to-gray-900 text-white overflow-hidden">
      <TechBackground />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />
        
        {/* Animated Circles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-blue-500/20 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 30 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 mb-8"
            >
              <MessageCircle className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300">Contactez-nous</span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
              Travaillons <GradientText>Ensemble</GradientText>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Prêt à transformer vos idées en réalité ? Contactez-nous dès aujourd'hui et construisons quelque chose d'extraordinaire.
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 mb-32">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        "bg-gradient-to-br from-white/10 to-white/5",
                        "border border-white/10"
                      )}>
                        <div className={info.color.replace("from-", "text-").split(" ")[0]}>
                          {info.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{info.title}</h3>
                        <p className="text-sm text-gray-400">{info.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-white">{info.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Réponse Rapide</h3>
                      <p className="text-sm text-gray-400">Nous vous répondons sous 2 heures</p>
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition-opacity">
                    Planifier un Appel
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <Video className="w-6 h-6 text-pink-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Réunion Virtuelle</h3>
                      <p className="text-sm text-gray-400">Consultation gratuite de 30 minutes</p>
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity">
                    Réserver une Réunion
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10">
                <h3 className="font-bold text-white mb-4">Suivez-nous</h3>
                <div className="flex items-center gap-4">
                  {[
                    { icon: <Facebook className="w-5 h-5" />, label: "Facebook", url: "https://facebook.com/iteam.digital" },
                    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", url: "https://instagram.com/iteam.dz" },
                    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", url: "https://linkedin.com/company/iteam-digital" }
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center gap-2 transition-colors"
                    >
                      {social.icon}
                      <span className="text-xs text-gray-400">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10">
                {/* Success Message */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-xl rounded-3xl flex items-center justify-center z-10"
                    >
                      <div className="text-center p-8">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center mx-auto mb-6"
                        >
                          <CheckCircle className="w-10 h-10" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-2">Message Envoyé !</h3>
                        <p className="text-gray-300">Nous vous répondrons sous 2 heures.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4" />
                        <span>{error}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <h2 className="text-3xl font-bold mb-2">Envoyez-nous un message</h2>
                <p className="text-gray-400 mb-8">Remplissez le formulaire ci-dessous et nous vous répondrons rapidement</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Nom *</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                          placeholder="Votre nom"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Users className="w-5 h-5 text-gray-500" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Email *</label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                          placeholder="votre@email.com"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Mail className="w-5 h-5 text-gray-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Entreprise</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                          placeholder="Nom de l'entreprise"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Building className="w-5 h-5 text-gray-500" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Téléphone</label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                          placeholder="+213 XX XX XX XX"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <PhoneCall className="w-5 h-5 text-gray-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <CustomDropdown
                    label="Service Intéressé"
                    options={services}
                    value={formData.service}
                    onChange={(val) => setFormData({ ...formData, service: val })}
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Budget du Projet</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {budgets.map((budget, idx) => (
                        <motion.button
                          key={idx}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFormData({ ...formData, budget })}
                          className={cn(
                            "px-3 mt-2 py-2 rounded-lg text-sm transition-all",
                            formData.budget === budget
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                              : "bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300"
                          )}
                        >
                          {budget}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Message *</label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="Parlez-nous de votre projet..."
                      />
                      <div className="absolute right-3 top-3">
                        <MessageCircle className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* ✅ تم التصحيح هنا - استخدمنا motion.button بدلاً من GlowingButton */}
                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer le Message
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-sm text-gray-400">
                    En soumettant, vous acceptez notre{" "}
                    <a href="#" className="text-cyan-400 hover:text-cyan-300">Politique de Confidentialité</a>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Visitez Notre <GradientText>Bureau</GradientText>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Rendez-vous à notre siège à Chéraga, Alger
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="w-full h-96 rounded-3xl overflow-hidden border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150.352824372116!2d2.9611272243613116!3d36.76743096954649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb10069799cfb%3A0x8d01439935b3ac0c!2sIteam%20Digital!5e1!3m2!1sar!2sdz!4v1766104031194!5m2!1sar!2sdz"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-300">Dim-Jeu: 8h-16h</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
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
                  <PhoneCall className="w-10 h-10" />
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                  Besoin d'Assistance Immédiate ?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Appelez notre équipe de support directement pour les urgences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    +213 549 402 461
                  </div>
                  <button className="px-8 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    Appeler Maintenant
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};