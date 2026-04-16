// components/shared/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Home,
  Star,
  Users,
  PhoneCall
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const liensNavigation = [
    { nom: "Accueil", href: "/", icone: <Home className="w-4 h-4" /> },
    { nom: "Services", href: "/services", icone: <Star className="w-4 h-4" /> },
    { nom: "À Propos", href: "/about", icone: <Users className="w-4 h-4" /> },
    { nom: "Contact", href: "/contact", icone: <PhoneCall className="w-4 h-4" /> },
  ];

  const infosContact = [
    { icone: <Phone className="w-4 h-4" />, texte: "+213 555 123 456", href: "tel:+213555123456" },
    { icone: <Mail className="w-4 h-4" />, texte: "info@iteam.dz", href: "mailto:info@iteam.dz" },
    { icone: <MapPin className="w-4 h-4" />, texte: "Alger, Algérie", href: "#" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed left-1/2 top-2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-lg md:rounded-full md:px-8 transition-all duration-300",
        isScrolled
          ? "bg-linear-to-r from-blue-900/15 to-blue-900/20 backdrop-blur-xl shadow-2xl border border-white/10"
          : "bg-linear-to-r from-blue-900/20 to-transparent backdrop-blur-sm"
      )}
    >
      <div className="flex items-center justify-between px-6 py-4 md:py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/images/logo.png" alt="Logo" className="md:w-28 w-16" />
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden lg:flex items-center gap-6">
          {liensNavigation.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className="relative group"
            >
              <motion.div
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                <span className="text-lg">{lien.icone}</span>
                <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                  {lien.nom}
                </span>
              </motion.div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-blue-400 to-cyan-400 group-hover:w-4/5 transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Bouton CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact"
            className="relative group overflow-hidden px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 font-semibold text-white shadow-lg hover:shadow-cyan-400/30 transition-all duration-300"
          >
            <span className="flex items-center gap-2 relative z-10">
              Démarrer un Projet
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-xl" />
          </Link>
        </div>

        {/* Bouton Menu Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          aria-label="Ouvrir/fermer le menu"
        >
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden backdrop-blur-2xl border-t border-white/10 rounded-b-2xl"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {liensNavigation.map((lien, index) => (
                <motion.div
                  key={lien.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={lien.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                  >
                    <span className="text-2xl">{lien.icone}</span>
                    <span className="text-lg font-medium text-white">{lien.nom}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-all" />
                  </Link>
                </motion.div>
              ))}

              {/* Informations de Contact */}
              <div className="mt-6 pt-4 border-t border-white/10">
                {infosContact.map((info, idx) => (
                  <a
                    key={idx}
                    href={info.href}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="p-2 rounded-lg bg-white/5">{info.icone}</div>
                    <span>{info.texte}</span>
                  </a>
                ))}
              </div>

              {/* CTA Mobile */}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-6 block w-full text-center px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 font-semibold text-white shadow-lg hover:shadow-cyan-400/30 transition-all duration-300"
              >
                Démarrer Votre Projet
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}