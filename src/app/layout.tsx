// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ITEAM",
  description: "Modern tech solutions — agences web, design, marketing et production audiovisuelle.",
  keywords: [
    "ITEAM",
    "agence digitale",
    "développement web",
    "design",
    "marketing digital",
    "production audiovisuelle",
  ],
  authors: [{ name: "ITEAM", url: "https://iteam.digital" }],
  openGraph: {
    title: "ITEAM — Solutions digitales modernes",
    description: "Agence digitale spécialisée en sites web, design, marketing et production audiovisuelle.",
    siteName: "ITEAM",
    url: "https://iteam.digital/",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ITEAM — Solutions digitales',
    description: 'Agence digitale: web, design, marketing et production audiovisuelle.'
  },
  robots: {
    index: true,
    follow: true,
    nocache: false
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* JSON-LD structured data for SEO (Organization) - no visual change */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ITEAM",
            "url": "https://iteam.digital/",
            "logo": "https://iteam.digital/images/logo.png",
            "sameAs": [
              "https://www.linkedin.com/",
              "https://twitter.com/"
            ],
            "contactPoint": [{
              "@type": "ContactPoint",
              "telephone": "+213796779790",
              "contactType": "customer service",
              "availableLanguage": ["French","English"]
            }]
          }) }}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
