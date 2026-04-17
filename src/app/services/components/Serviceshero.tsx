// components/services/Serviceshero.tsx
// Optimized Server Component - CSS animations

import Link from 'next/link';

export const ServicesHero = () => {
  return (
    <section className="relative pt-42 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slideUp">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 mb-8 animate-slideUp delay-200">
            <span className="w-5 h-5 bg-cyan-400 rounded-full block">🌐</span>
            <span className="text-sm font-semibold text-cyan-300">Nos Services</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 animate-slideUp delay-400">
            Solutions <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">Digitales</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-slideUp delay-600">
            Services digitaux complets conçus pour transformer votre entreprise et propulser la croissance dans le paysage moderne.
          </p>
        </div>
      </div>
    </section>
  );
};

