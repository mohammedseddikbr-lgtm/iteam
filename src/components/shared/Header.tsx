"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  PhoneCall,
  FolderGit2,
} from "lucide-react";

import MobileHeaderMenu from "./MobileHeaderMenu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed left-1/2 top-2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-lg md:rounded-full md:px-8 px-6 py-4 md:py-5 bg-blue-900/10 backdrop-blur-xl shadow-2xl border border-white/10">
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={112}
            height={64}
            className="md:w-28 w-16"
            priority
          />
        </Link>

        {/* Desktop */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/">Accueil</Link>
          <Link href="/services">Services</Link>
          <Link href="/Portfolio">Portfolio</Link>
          <Link href="/about">À Propos</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
          >
            Démarrer un Projet <ChevronRight className="inline w-4 h-4" />
          </Link>
        </div>

        {/* Mobile */}
        <MobileHeaderMenu />
      </div>
    </header>
  );
}