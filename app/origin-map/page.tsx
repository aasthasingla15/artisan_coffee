'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface OriginDetail {
  id: string;
  name: string;
  coords: { x: number; y: number }; // SVG percentage placement
  profile: string;
  roast: string;
  altitude: string;
  process: string;
  history: string;
  icon: string;
}

const ORIGINS: OriginDetail[] = [
  {
    id: 'ethiopia',
    name: 'Ethiopia (Yirgacheffe)',
    coords: { x: 58, y: 55 },
    profile: 'Bright acidity, floral aroma, notes of jasmine, bergamot, and sweet lemon.',
    roast: 'Light to Medium (best to preserve delicate florals)',
    altitude: '1,700m - 2,200m',
    process: 'Washed & Natural',
    history: 'Known as the birthplace of Arabica coffee. Legend says Kaldi, a 9th-century goat herder, discovered coffee after noticing his goats became hyperactive after eating berries from a specific bush.',
    icon: '🇪🇹'
  },
  {
    id: 'colombia',
    name: 'Colombia (Huila)',
    coords: { x: 28, y: 58 },
    profile: 'Balanced, medium body, clean acidity with sweet caramel and red fruit undertones.',
    roast: 'Medium Roast (accentuates balanced body and caramel)',
    altitude: '1,500m - 1,900m',
    process: 'Washed',
    history: 'Jesuit priests first introduced coffee to Colombia in the early 1700s. Today, Colombia is renowned globally for its rich volcanic soil and small-holder family farms that hand-pick every bean.',
    icon: '🇨🇴'
  },
  {
    id: 'brazil',
    name: 'Brazil (Minas Gerais)',
    coords: { x: 35, y: 70 },
    profile: 'Low acidity, heavy body, rich chocolate, peanut butter, and toasted hazelnut notes.',
    roast: 'Medium-Dark to Dark (perfect base for premium espresso blends)',
    altitude: '800m - 1,200m',
    process: 'Natural / Pulped Natural',
    history: 'Brazil has been the world\'s largest coffee producer for over 150 years. Coffee was smuggled out of French Guiana in 1727 in a bouquet of flowers presented to the governor\'s wife.',
    icon: '🇧🇷'
  },
  {
    id: 'india',
    name: 'India (Karnataka)',
    coords: { x: 69, y: 48 },
    profile: 'Spicy, full-bodied, low acidity, notes of cardamom, clove, pepper, and dark wood.',
    roast: 'Medium-Dark (ideal for spicy, full body extraction)',
    altitude: '1,000m - 1,500m',
    process: 'Washed / Monsooned Malabar',
    history: 'Introduced by Baba Budan, a 17th-century saint who smuggled seven coffee seeds from Yemen strapped to his chest, planting them on the hills of Chikmagalur, Karnataka.',
    icon: '🇮🇳'
  },
  {
    id: 'vietnam',
    name: 'Vietnam (Buon Ma Thuot)',
    coords: { x: 78, y: 51 },
    profile: 'Extremely bold, rich, thick mouthfeel, dark chocolate and chicory notes, high caffeine.',
    roast: 'Dark Roast (traditional for Robusta dripped with condensed milk)',
    altitude: '500m - 800m',
    process: 'Natural / Honey Process',
    history: 'French missionaries introduced coffee in 1857. Today, Vietnam is the world\'s second-largest coffee producer and the absolute leader in Robusta coffee, defining a unique coffee filter culture.',
    icon: '🇻🇳'
  }
];

export default function OriginMapPage() {
  const [selectedOrigin, setSelectedOrigin] = useState<OriginDetail | null>(ORIGINS[0]);

  return (
    <div className="min-h-screen bg-[#100906] text-[#FAFAF9] font-['Inter'] relative flex flex-col justify-between py-12 px-6 overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-amber-900/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-orange-950/15 blur-[130px] pointer-events-none" />

      {/* Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between mb-8 z-10">
        <Link href="/" className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-[#D4A574]">
          Artisan Coffee
        </Link>
        <Link href="/" className="text-amber-100/60 hover:text-amber-100 text-sm transition-colors">
          Back to Lounge
        </Link>
      </header>

      {/* Main Map Content */}
      <main className="max-w-6xl mx-auto w-full flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 items-center z-10">
        
        {/* Map Visualization Card */}
        <div className="lg:col-span-2 bg-[#1C120C]/65 border border-amber-900/30 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl h-[450px] relative overflow-hidden flex items-center justify-center">
          
          {/* Stylized Minimal World Map SVG Background */}
          <svg className="w-full h-full opacity-35" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* North America */}
            <path d="M 5,15 Q 15,10 25,25 T 30,35 Q 20,40 10,25 Z" fill="currentColor" className="text-amber-950/50" />
            {/* South America */}
            <path d="M 22,48 Q 28,52 35,62 T 32,85 Q 25,75 22,55 Z" fill="currentColor" className="text-amber-950/50" />
            {/* Africa */}
            <path d="M 45,40 Q 58,40 60,55 T 52,80 Q 42,65 45,40 Z" fill="currentColor" className="text-amber-950/50" />
            {/* Europe / Asia */}
            <path d="M 40,15 Q 60,10 80,18 T 95,45 Q 80,45 65,30 Z" fill="currentColor" className="text-amber-950/50" />
            {/* India / SE Asia */}
            <path d="M 68,43 Q 73,43 78,52 T 76,60 Z" fill="currentColor" className="text-amber-950/50" />
            {/* Australia */}
            <path d="M 80,68 Q 92,68 90,82 T 78,80 Z" fill="currentColor" className="text-amber-950/50" />
          </svg>

          {/* Interactive Hotspots */}
          {ORIGINS.map((origin) => {
            const isSelected = selectedOrigin?.id === origin.id;
            return (
              <button
                key={origin.id}
                onClick={() => setSelectedOrigin(origin)}
                style={{ left: `${origin.coords.x}%`, top: `${origin.coords.y}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-20"
              >
                {/* Pulse rings */}
                <span className={`absolute inline-flex h-6 w-6 rounded-full opacity-75 animate-ping ${
                  isSelected ? 'bg-amber-400' : 'bg-amber-600/50'
                }`} />
                {/* Core dot */}
                <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border border-[#100906] transition-all duration-300 ${
                  isSelected ? 'bg-amber-300 scale-125 shadow-lg shadow-amber-500/50' : 'bg-amber-600 group-hover:bg-amber-400'
                }`} />
                {/* Floating label */}
                <span className="absolute left-5 top-1/2 -translate-y-1/2 bg-amber-950/90 text-[10px] font-semibold text-amber-100 tracking-wider px-2 py-0.5 rounded border border-amber-800/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                  {origin.name}
                </span>
              </button>
            );
          })}

          <div className="absolute bottom-6 left-6 text-xs text-amber-100/40">
            📍 Click pulsing hotspots to explore origins
          </div>
        </div>

        {/* Origin Details Glassmorphic Overlay Panel */}
        <div className="h-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {selectedOrigin ? (
              <motion.div
                key={selectedOrigin.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1C120C]/65 border border-amber-900/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{selectedOrigin.icon}</span>
                    <div>
                      <h2 className="text-2xl font-['Playfair_Display'] font-bold text-amber-50">
                        {selectedOrigin.name}
                      </h2>
                      <span className="text-xs text-amber-500 font-semibold tracking-wide uppercase">
                        Origin Profile
                      </span>
                    </div>
                  </div>

                  <hr className="border-amber-900/20 my-4" />

                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-amber-200/80 mb-1">Flavor Profile</h4>
                      <p className="text-amber-100/70 leading-relaxed">{selectedOrigin.profile}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-amber-200/80 mb-1">Altitude</h4>
                        <p className="text-amber-100/70 text-xs">{selectedOrigin.altitude}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-200/80 mb-1">Process</h4>
                        <p className="text-amber-100/70 text-xs">{selectedOrigin.process}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-amber-200/80 mb-1">Roast Suggestion</h4>
                      <p className="text-amber-100/70 leading-relaxed text-xs">{selectedOrigin.roast}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-amber-200/80 mb-1">Heritage & History</h4>
                      <p className="text-amber-100/60 leading-relaxed text-xs italic">
                        &ldquo;{selectedOrigin.history}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <Link
                    href={`/#products`}
                    className="flex-grow text-center py-3 bg-[#D4A574] text-[#100906] font-semibold rounded-xl text-xs hover:bg-amber-400 transition-colors shadow-lg shadow-amber-950/20"
                  >
                    View Harvested Beans
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="text-center p-8 bg-[#1C120C]/40 border border-amber-900/10 rounded-3xl backdrop-blur-xl">
                <p className="text-amber-100/50">Select a hotspot on the world map to dive into coffee heritage.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-amber-100/40 mt-8 z-10">
        © {new Date().getFullYear()} Artisan Coffee Origin Atlas. All rights reserved.
      </footer>
    </div>
  );
}
