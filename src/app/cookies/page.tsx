"use client";

import { useState, useEffect } from "react";
import LegalPage from "@/components/LegalPage";

export default function CookiesPage() {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentYear, setCurrentYear] = useState<number>(2024);

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('fr-FR'));
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <LegalPage
      title="Politique des Cookies"
      subtitle="Comment nous utilisons les cookies et vos options"
      content={
        <>
          <div className="mb-8 p-5 bg-gradient-to-r from-gray-900/50 to-cyan-900/20 backdrop-blur-sm rounded-xl border border-cyan-800/50">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-cyan-900/40 flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.95 10.99c-1.79-.03-3.7-1.95-2.68-4.22-2.97 1-5.78-1.59-5.19-4.56C6.95.53 2 5.64 2 11.31 2 16.52 6.48 21 11.69 21c5.67 0 10.61-5.05 9.16-10.01z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Information importante</h3>
                <p className="text-cyan-300 text-sm">
                  Dernière mise à jour: {currentDate || "Chargement..."}
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Notre site utilise des cookies pour améliorer l'expérience utilisateur, 
              analyser les performances et personnaliser le contenu. Cette politique 
              explique comment nous les utilisons et comment vous pouvez les contrôler.
            </p>
          </div>

          <div className="space-y-8">
            <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4 pb-3 border-b border-gray-700">
                1. Qu'est-ce qu'un cookie ?
              </h3>
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="lg:w-2/3 space-y-4">
                  <p className="text-gray-300">
                    Un cookie est un petit fichier texte stocké sur votre appareil lorsque 
                    vous naviguez sur notre site. Il permet de mémoriser vos préférences, 
                    améliorer la navigation et personnaliser votre expérience.
                  </p>
                  <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700">
                    <p className="text-gray-400 text-sm italic">
                      <strong className="text-white">Exemple :</strong> Les cookies peuvent retenir votre langue préférée, 
                      les articles dans votre panier, ou vos identifiants de connexion pour 
                      vous éviter de les ressaisir à chaque visite.
                    </p>
                  </div>
                </div>
                <div className="lg:w-1/3">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-5 border border-gray-700">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      Durée de vie
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Session : expire à la fermeture</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span>Persistant : jours/mois</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Suivi : jusqu'à 2 ans</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4 pb-3 border-b border-gray-700">
                2. Types de cookies utilisés
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-b from-green-900/20 to-gray-900/50 rounded-lg p-5 border border-green-800/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-900/40 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">Essentiels</h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Nécessaires au fonctionnement du site. Ils ne peuvent pas être désactivés.
                  </p>
                  <ul className="text-gray-400 text-xs space-y-1">
                    <li>• Sécurité du site</li>
                    <li>• Gestion du panier</li>
                    <li>• Authentification</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-b from-blue-900/20 to-gray-900/50 rounded-lg p-5 border border-blue-800/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-900/40 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">Analytiques</h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Utilisés pour analyser le trafic et la performance du site.
                  </p>
                  <ul className="text-gray-400 text-xs space-y-1">
                    <li>• Analyse d'audience</li>
                    <li>• Mesure de performance</li>
                    <li>• Amélioration UX</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-b from-purple-900/20 to-gray-900/50 rounded-lg p-5 border border-purple-800/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-900/40 flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">Marketing</h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Pour les campagnes publicitaires ciblées et personnalisées.
                  </p>
                  <ul className="text-gray-400 text-xs space-y-1">
                    <li>• Publicités ciblées</li>
                    <li>• Suivi de conversion</li>
                    <li>• Retargeting</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800/30 rounded-lg p-5 border border-gray-700">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  Cookies tiers
                </h4>
                <p className="text-gray-300 text-sm">
                  Certains cookies peuvent provenir de services tiers comme Google Analytics, 
                  Facebook Pixel, ou d'autres outils d'analyse et de marketing. Ces tiers 
                  ont leurs propres politiques de confidentialité.
                </p>
              </div>
            </section>

            <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4 pb-3 border-b border-gray-700">
                3. Gestion des cookies
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Options de contrôle</h4>
                  <p className="text-gray-300 mb-4">
                    Vous pouvez configurer votre navigateur pour refuser certains ou tous les cookies. 
                    Notez que cela peut affecter certaines fonctionnalités du site.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/40 rounded-lg p-5 border border-gray-700">
                    <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                      </svg>
                      Paramètres navigateur
                    </h5>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                        <span>Chrome : Paramètres → Confidentialité</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                        <span>Firefox : Options → Vie privée</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                        <span>Safari : Préférences → Confidentialité</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                        <span>Edge : Paramètres → Cookies</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-800/40 rounded-lg p-5 border border-gray-700">
                    <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      Gestion en ligne
                    </h5>
                    <p className="text-gray-300 text-sm mb-3">
                      Utilisez des plateformes de gestion des préférences pour contrôler 
                      les cookies sur plusieurs sites :
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                        YourOnlineChoices
                      </span>
                      <span className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                        NetworkAdvertising
                      </span>
                      <span className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                        AboutCookies
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-900/20 to-gray-900/50 rounded-lg p-5 border border-amber-800/30">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                    </svg>
                    <div>
                      <h5 className="text-white font-medium mb-2">Impact de la désactivation</h5>
                      <p className="text-gray-300 text-sm">
                        La désactivation des cookies peut empêcher certaines fonctionnalités 
                        comme la connexion automatique, le panier d'achat, ou les préférences 
                        de personnalisation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-gray-900/50 to-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-800/50">
              <h3 className="text-2xl font-bold text-white mb-4 pb-3 border-b border-purple-800/50">
                4. Consentement et mise à jour
              </h3>
              <div className="space-y-4">
                <p className="text-gray-300">
                  En continuant à utiliser notre site, vous consentez à l'utilisation des cookies 
                  conformément à cette politique. Vous pouvez retirer votre consentement à tout moment 
                  via les paramètres de votre navigateur.
                </p>
                
                <div className="bg-gray-800/40 rounded-lg p-5 border border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Mise à jour de la politique</h5>
                      <p className="text-gray-400 text-sm">
                        Cette politique peut être mise à jour périodiquement. La version 
                        actuelle est toujours disponible sur cette page.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 bg-purple-900/30 px-4 py-2 rounded-lg">
                      <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 4h-4.18C14.4 2.84 13.3 2 12 2c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                      </svg>
                      <span className="text-white font-medium">
                        Version 2.1 • {currentYear}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      }
    />
  );
}