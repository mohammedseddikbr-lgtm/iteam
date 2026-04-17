// Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Home,
  Star,
  Users,
  PhoneCall,
  X,
  Menu
} from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const liensNavigation = [
    { nom: "Accueil", href: "/", icone: <Home className="w-4 h-4" /> },
    { nom: "Services", href: "/services", icone: <Star className="w-4 h-4" /> },
    { nom: "Portfolio", href: "/portfolio", icone: <Star className="w-4 h-4" /> },
    { nom: "À Propos", href: "/about", icone: <Users className="w-4 h-4" /> },
    { nom: "Contact", href: "/contact", icone: <PhoneCall className="w-4 h-4" /> },
  ];

  const infosContact = [
    { icone: <Phone className="w-4 h-4" />, texte: "+213 555 123 456", href: "tel:+213555123456" },
    { icone: <Mail className="w-4 h-4" />, texte: "info@iteam.dz", href: "mailto:info@iteam.dz" },
    { icone: <MapPin className="w-4 h-4" />, texte: "Alger, Algérie", href: "#" },
  ];

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed left-1/2 top-4 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl rounded-2xl  px-4 md:px-8 py-3 md:py-4 bg-gradient-to-r from-gray-900/80 to-blue-900/80 backdrop-blur-xl shadow-2xl border border-white/10">
        <div className="flex items-center justify-between">
          {/* Logo - Left side */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={112}
              height={64}
              className="lg:w-22 w-14 md:h-auto h-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Accueil
            </Link>
            <Link 
              href="/services" 
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Services
            </Link>
            <Link 
              href="/Portfolio" 
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Portfolio
            </Link>
            <Link 
              href="/about" 
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              À Propos
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA - Right side */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              Démarrer un Projet
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button - Toggles between Menu and X */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="relative w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-7xl lg:hidden"
          >
            <div className="rounded-2xl bg-gradient-to-br from-gray-900/95 to-blue-900/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="px-6 py-6 flex flex-col gap-4">
                {liensNavigation.map((lien, index) => (
                  <motion.div
                    key={lien.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={lien.href}
                      onClick={handleCloseMenu}
                      className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                    >
                      <span className="text-cyan-400">{lien.icone}</span>
                      <span className="text-lg font-medium text-white">{lien.nom}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}
                
                <div className="mt-6 pt-4 border-t border-white/10">
                  {infosContact.map((info, idx) => (
                    <a
                      key={idx}
                      href={info.href}
                      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                      onClick={handleCloseMenu}
                    >
                      <div className="p-2 rounded-lg bg-white/5 text-cyan-400">{info.icone}</div>
                      <span>{info.texte}</span>
                    </a>
                  ))}
                </div>
                
                <Link
                  href="/contact"
                  onClick={handleCloseMenu}
                  className="mt-4 block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 font-semibold text-white shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-105"
                >
                  Démarrer Votre Projet
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}