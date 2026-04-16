// components/pages/Home.tsx
"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const TechBackground = dynamic(() => import("@/components/ui/TechBackground").then(mod => mod.TechBackground), { ssr: false, loading: () => null });
const ParticlesFlottants = dynamic(() => import("@/components/ui/ParticlesFlottants"), { ssr: false, loading: () => null });
import { HeroSection } from "./components/HeroSection";
import { TechStackSection } from "./components/TechStackSection";
import { PacksSection } from "./components/PacksSection";
import { ServicesSection } from "./components/ServciesSection";
import { ProcessTimelineSection } from "./components/ProcessTimelineSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { CTASection } from "./components/CTASection";

export const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-linear-to-br from-gray-900 via-blue-900/20 to-gray-900 text-white overflow-hidden">
      <TechBackground />
      <ParticlesFlottants />
      
      <HeroSection 
        heroOpacity={heroOpacity} 
        heroScale={heroScale} 
      />
      
      <TechStackSection />
      <PacksSection />
      <ServicesSection />
      <ProcessTimelineSection />
      <ReviewsSection />
      <CTASection />
    </div>
  );
};
