// components/shared/Footer.tsx
// Optimized Server Component

import Image from "next/image";
import Link from "next/link";
import ScrollTopButton from "./ScrollTopButton";

// Lucide Icons
import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const services = [
    "Création de Sites Web",
    "Applications Web & SaaS",
    "Design Graphique & Branding",
    "Gestion des Réseaux Sociaux",
    "Marketing Digital",
    "Production Photo & Vidéo",
  ];

  const liensRapides = [
    { nom: "Accueil", href: "/" },
    { nom: "Services", href: "/services" },
    { nom: "À Propos", href: "/about" },
    { nom: "Contact", href: "/contact" },
  ];

  const liensEntreprise = [
    { nom: "Politique de Confidentialité", href: "/privacy" },
    { nom: "Conditions d'Utilisation", href: "/terms" },
    { nom: "Politique des Cookies", href: "/cookies" },
    { nom: "Plan du Site", href: "/sitemap" },
  ];

  const liensSociaux = [
    {
      icon: Facebook,
      href: "https://facebook.com/iteam.digital",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/iteam.dz",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/iteam-digital/",
      label: "LinkedIn",
    },
  ];

  const infosContact = [
    {
      icon: Phone,
      texte: "+213 796 779 790",
      href: "tel:+213796779790",
    },
    {
      icon: Mail,
      texte: "contact@iteam.digital",
      href: "mailto:contact@iteam.digital",
    },
    {
      icon: MapPin,
      texte: "25 Boulevard Ouaked Ahmed, Cheraga 16002",
      href: "https://maps.google.com/?q=25+Boulevard+Ouaked+Ahmed+Cheraga",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-blue-900/30 to-gray-900 border-t border-white/10">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-10 mb-16">
          {/* Entreprise */}
          <div className="space-y-6">
            <Link href="/" className="flex justify-center">
              <Image
                src="/images/logo.png"
                alt="Logo i-Team"
                width={144}
                height={64}
                priority
              />
            </Link>

            <p className="text-gray-400 leading-relaxed">
              i-Team est une agence digitale spécialisée dans les solutions web,
              le marketing digital et la création de contenu pour booster votre
              présence en ligne.
            </p>

            <div className="flex gap-4">
              {liensSociaux.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2">
            {/* Liens rapides */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Liens Rapides ➜
              </h3>
              <ul className="space-y-3">
                {liensRapides.map((lien) => (
                  <li key={lien.nom}>
                    <Link
                      href={lien.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-cyan-400"
                    >
                      <span>{lien.nom}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Nos Services ➜
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="text-gray-400 hover:text-cyan-400"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Contactez-nous ➜
            </h3>
            <div className="space-y-4">
              {infosContact.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.texte} className="flex gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <a
                      href={info.href}
                      className="text-gray-400 hover:text-cyan-400"
                    >
                      {info.texte}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © 2026 ITEAM Solutions Digitales. Tous droits réservés.
            </div>

            <div className="flex flex-wrap gap-6">
              {liensEntreprise.map((lien) => (
                <Link
                  key={lien.nom}
                  href={lien.href}
                  className="text-sm text-gray-500 hover:text-cyan-400 transition-colors"
                >
                  {lien.nom}
                </Link>
              ))}
            </div>

            <ScrollTopButton />
          </div>
        </div>
      </div>
    </footer>
  );
}