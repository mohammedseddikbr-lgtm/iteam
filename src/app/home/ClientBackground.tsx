"use client";

import dynamic from 'next/dynamic';

const TechBackground = dynamic(
  () => import("@/components/ui/TechBackground").then(mod => mod.TechBackground),
  { ssr: false, loading: () => null }
);

const ParticlesFlottants = dynamic(
  () => import("@/components/ui/ParticlesFlottants"),
  { ssr: false, loading: () => null }
);

export default function ClientBackground() {
  return (
    <>
      <TechBackground />
      <ParticlesFlottants />
    </>
  );
}

