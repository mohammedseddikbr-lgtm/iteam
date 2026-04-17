"use client";

import dynamic from 'next/dynamic';

const Contact = dynamic(() => import('./Contact').then(mod => mod.Contact), {
  ssr: false,
});

export default function ContactPage() {
  return <Contact />;
}