// components/home/Home.tsx
// Optimized Server Page Component

import dynamic from "next/dynamic";
import HeroSection from "./components/HeroSection";
import TechStackSection from "./components/TechStackSection";
import PacksSection from "./components/PacksSection";
import ServciesSection from "./components/ServciesSection";
import ProcessTimelineSection from "./components/ProcessTimelineSection";
import CTASection from "./components/CTASection";

import ClientBackground from './ClientBackground';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 text-white overflow-hidden">
      <ClientBackground />
      <HeroSection />
      <TechStackSection />
      <PacksSection />
      <ServciesSection />
      <ProcessTimelineSection />
      {/* <ReviewsSection /> */}
      <CTASection />
    </div>
  );
}

