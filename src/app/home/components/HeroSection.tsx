// components/home/HeroSection.tsx
// Optimized Server Component - CSS animations, no Framer

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, Rocket, Headphones, MessageCircle } from 'lucide-react';

export const HeroSection = () => {
  // رقم WhatsApp مع رمز الدولة (بدون + أو 00)
  const whatsappNumber = "213796779790";
  // رسالة افتراضية للتواصل
  const whatsappMessage = "Bonjour, je souhaite discuter avec un conseiller pour mon projet digital.";
  // رابط WhatsApp
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="relative pt-24 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 animate-fadeIn">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className="space-y-8">
          {/* Slogan */}
          <div className="inline-flex items-center gap-1 md:gap-2 px-3 md:px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/30 shadow-lg shadow-blue-500/5 animate-slideUp">
            <span className="w-5 h-5 bg-blue-400 rounded-full block">✨</span>
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Leaders en Innovation Digitale depuis 2024
            </span>
          </div>

          {/* Title */}
          <div className="relative animate-slideUp delay-200">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold flex flex-col md:flex-row items-center justify-center md:gap-8 leading-tight tracking-tight">
              <span className="block">Transformez</span>
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
                Votre Vision
              </span>
            </h1>
            <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-8 rounded-full w-48 animate-expand" />
          </div>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slideUp delay-400">
            Nous créons des <span className="text-white font-semibold text-2xl md:text-4xl block">Expériences digitales Exceptionnelles</span>
            qui propulsent la croissance et transforment les entreprises.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center md:pt-12 animate-slideUp delay-600">
            {/* Primary CTA - Redirection vers page contact */}
            <Link 
              href="/contact"
              className="cursor-pointer relative px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 md:px-10 md:py-5 text-lg shadow-2xl shadow-blue-500/25 hover:scale-105 active:scale-95 group"
            >
              <span className="relative z-10 flex items-center justify-center max-md:w-full gap-2 md:gap-3">
                <Rocket className="w-6 h-6" />
                Lancez Votre Projet
                <ArrowRight className="md:ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
              </span>
            </Link>

            {/* Secondary CTA - WhatsApp direct */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group max-md:w-full md:px-10 py-5 text-lg rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 backdrop-blur-xl border border-white/20 transition-all duration-300 hover:border-green-500/50 hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center justify-center"
            >
              <span className="flex items-center justify-center gap-3">
                <Headphones className="w-6 h-6 text-green-400" />
                Discuter avec un Conseiller
                <MessageCircle className="w-5 h-5 text-green-400 transition-transform group-hover:translate-x-2" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;