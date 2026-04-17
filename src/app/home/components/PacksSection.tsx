"use client";

import { useState } from "react";
import { Crown, Infinity as InfinityIcon, Shield as ShieldIcon, Gem, X, MessageCircle, Instagram, Phone, Copy, ExternalLink, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { PackCard, PackItem } from "./PackCard";

// رابط Google Sheets Webhook (نفس الرابط المستخدم في Contact)
const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzEhym5RcwdnLMIHnz3LfgHH_cnEyH91pg1OolbVkGJ5LGDzj-s16wCRIZk5nInlGHp/exec";

const packs: PackItem[] = [
  {
    nom: "BASIC",
    icone: <ShieldIcon className="w-12 h-12" />,
    prix: "45,000 DZD",
    periode: "/mois",
    couleur: "from-blue-500 to-cyan-500",
    couleurFond: "bg-gradient-to-br from-blue-500/5 to-cyan-500/5",
    couleurBordure: "border-blue-500/20",
    populaire: false,
    fonctionnalites: [
      "Gestion de la page (3 posts / semaine)",
      "Création de 10 visuels professionnels / mois",
      "Planning de contenu simple (hebdomadaire)",
      "Organisation et publication des posts",
      "Rapport mensuel synthétique",
      "Support basique"
    ],
    cta: "Choisir BASIC",
    description: "Idéale pour petites entreprises"
  },
  {
    nom: "STANDARD",
    icone: <Gem className="w-12 h-12" />,
    prix: "80,000 DZD",
    periode: "/mois",
    couleur: "from-purple-500 to-pink-500",
    couleurFond: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
    couleurBordure: "border-purple-500/30",
    populaire: true,
    fonctionnalites: [
      "Gestion complète Facebook & Instagram",
      "Stratégie de contenu mensuelle",
      "20 publications professionnelles / mois",
      "Textes marketing optimisés",
      "Planning éditorial structuré",
      "Rapport mensuel détaillé (engagement & portée)",
      "Optimisation de la présence digitale"
    ],
    cta: "Choisir STANDARD",
    description: "Entreprises moyennes"
  },
  {
    nom: "BUSINESS",
    icone: <Crown className="w-12 h-12" />,
    prix: "Sur devis",
    periode: "",
    couleur: "from-amber-500 to-orange-500",
    couleurFond: "bg-gradient-to-br from-amber-500/10 to-orange-500/10",
    couleurBordure: "border-amber-500/30",
    populaire: false,
    fonctionnalites: [
      "Gestion avancée des réseaux sociaux",
      "Publications, modération et interaction",
      "Stratégie marketing digitale complète",
      "Analyse marché, concurrence et audience",
      "30 contenus premium / mois",
      "Vidéos marketing (reels, stories, formats courts)",
      "Gestion & optimisation des campagnes publicitaires",
      "Rapports hebdomadaires et mensuels",
      "Recommandations stratégiques personnalisées"
    ],
    cta: "Contactez-nous",
    description: "Solution complète"
  }
];

export const PacksSection = () => {
  const [selectedPack, setSelectedPack] = useState<PackItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: ""
  });

  // دالة لإرسال البيانات إلى Google Sheets
  const sendToGoogleSheets = async (data: any) => {
    try {
      const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
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
          pack: data.pack,
          source: 'Formulaire Packs',
          status: 'Nouveau',
          company: '',
          service: data.pack,
          message: `Demande d'information pour le pack ${data.pack}`,
          budget: ''
        }),
      });
      
      return { success: true };
    } catch (error) {
      console.error('Google Sheets Error:', error);
      throw error;
    }
  };

  const handleOpenModal = (pack: PackItem) => {
    console.log("Opening modal:", pack.nom);
    setSelectedPack(pack);
    setIsModalOpen(true);
    setError(null);
    setIsSubmitted(false);
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
    setSelectedPack(null);
    setFormData({ fullName: "", email: "", phone: "" });
    setIsSubmitting(false);
    setIsSubmitted(false);
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // إرسال البيانات إلى Google Sheets
      await sendToGoogleSheets({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        pack: selectedPack?.nom
      });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // إعادة تعيين النموذج بعد 3 ثواني
      setTimeout(() => {
        handleCloseModal();
      }, 3000);

    } catch (error: any) {
      console.error('Erreur:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
      setIsSubmitting(false);
    }
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+213796779790");
    alert("Numéro copié !");
  };

  return (
    <section className="md:py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/30 mb-6">
            <Crown className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">Solutions Flexibles</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
            Choisissez Votre Plan Parfait
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Sélectionnez la formule pour votre entreprise
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {packs.map((pack, index) => (
            <PackCard 
              key={index} 
              pack={pack} 
              index={index}
              onSelect={handleOpenModal}
            />
          ))}
        </div>

        {/* Custom Quote Section */}
        <div className="mt-20 text-center">
          <div className="md:inline-flex flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 max-w-8xl mx-auto">
            <InfinityIcon className="w-8 h-8 hidden md:flex text-blue-400" />
            <div className="text-left">
              <h4 className="text-xl font-bold text-white">Besoin d'une Solution Personnalisée ?</h4>
              <p className="text-gray-400">Contactez-nous pour des packages d'entreprise sur mesure</p>
            </div>
            <button className="relative ml-auto px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Obtenir un Devis Personnalisé
                <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedPack && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-md w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button 
              onClick={handleCloseModal} 
              className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <h3 className="text-2xl font-bold text-white">Demande pour le pack</h3>
              <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1">
                {selectedPack.nom}
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
                  Nous vous contacterons dans les plus brefs délais pour le pack {selectedPack.nom}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
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
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Votre nom et prénom"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="votre@email.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Numéro de téléphone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="+213 5XX XX XX XX"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Pack sélectionné
                  </label>
                  <input
                    type="text"
                    value={selectedPack.nom}
                    disabled
                    className="w-full px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 font-semibold"
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
                    "Envoyer la demande"
                  )}
                </button>
              </form>
            )}

            {/* Contact section - يظهر فقط إذا لم يتم الإرسال */}
            {!isSubmitted && (
              <div className="p-6 border-t border-white/10">
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-3 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-400 text-sm">
                      Ou contactez-nous sur
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  {/* WhatsApp Button */}
                  <a
                    href="https://wa.me/213796779790"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 hover:border-green-500/60 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <MessageCircle className="relative z-10 w-5 h-5 text-green-400" />
                    <span className="relative z-10 font-semibold text-green-400">WhatsApp</span>
                    <ExternalLink className="relative z-10 w-4 h-4 text-green-400/60 group-hover:translate-x-1 transition-transform" />
                  </a>

                  {/* Instagram Button */}
                  <a
                    href="https://instagram.com/iteam.dz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/5 to-pink-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <Instagram className="relative z-10 w-5 h-5 text-pink-400" />
                    <span className="relative z-10 font-semibold text-pink-400">Instagram</span>
                    <ExternalLink className="relative z-10 w-4 h-4 text-pink-400/60 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Phone Number with Copy Feature */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-green-500/30 transition-all group cursor-pointer">
                    <Phone className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300 group-hover:text-green-400 transition-colors">
                      +213 796 779 790
                    </span>
                    <button
                      onClick={handleCopyPhone}
                      className="ml-2 p-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <Copy className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    Disponible 24/7 sur WhatsApp
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PacksSection;