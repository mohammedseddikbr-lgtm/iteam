import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Rocket,
  PlayCircle,
  CheckCircle,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-28 px-6 lg:px-16">
      
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto flex justify-center  gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <div className="text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8">
            <span className="text-cyan-400 text-sm font-medium">
              Leaders en Innovation Digitale depuis 2025
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            Transformez votre{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              vision digitale
            </span>{" "}
            en croissance réelle
          </h1>

          {/* Paragraph */}
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Nous concevons des expériences digitales haut de gamme qui
            augmentent votre visibilité, renforcent votre crédibilité et
            accélèrent votre croissance.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center ">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition"
            >
              <Rocket className="w-5 h-5" />
              Lancez votre projet
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl border border-white/15 bg-white/5 backdrop-blur-lg text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition"
            >
              <PlayCircle className="w-5 h-5 text-cyan-400" />
              Consultation gratuite
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Metrics */}
          {/* <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto lg:mx-0">
            <div>
              <h3 className="text-3xl font-bold text-white">50+</h3>
              <p className="text-gray-400 text-sm">Projets réalisés</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">98%</h3>
              <p className="text-gray-400 text-sm">Clients satisfaits</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">24/7</h3>
              <p className="text-gray-400 text-sm">Support dédié</p>
            </div>
          </div> */}
        </div>

       
      </div>
    </section>
  );
}