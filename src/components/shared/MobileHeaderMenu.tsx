"use client";

import { useState } from "react";
import Link from "next/link";
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
import { cn } from "@/lib/utils";

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

export default function MobileHeaderMenu({ onClose }: { onClose?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        aria-label="Ouvrir le menu"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>
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
                    onClick={handleClose}
                    className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                  >
                    <span className="text-2xl">{lien.icone}</span>
                    <span className="text-lg font-medium text-white">{lien.nom}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-all" />
                  </Link>
                </motion.div>
              ))}
              <div className="mt-6 pt-4 border-t border-white/10">
                {infosContact.map((info, idx) => (
                  <a
                    key={idx}
                    href={info.href}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                    onClick={handleClose}
                  >
                    <div className="p-2 rounded-lg bg-white/5">{info.icone}</div>
                    <span>{info.texte}</span>
                  </a>
                ))}
              </div>
              <Link
                href="/contact"
                onClick={handleClose}
                className="mt-6 block w-full text-center px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 font-semibold text-white shadow-lg hover:shadow-cyan-400/30 transition-all duration-300"
              >
                Démarrer Votre Projet
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

