'use client';

import React from 'react';

export default function MarqueeDivider() {
  const words = [
    "FRESHLY ROASTED", "•",
    "SUSTAINABLY SOURCED", "•",
    "ARTISAN BLENDS", "•",
    "POUR OVER PERFECTION", "•",
    "SINGLE ORIGIN", "•"
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#4F9C8F] py-4 border-y border-[#3D8B7F]">
      <div className="flex animate-[marquee_25s_linear_infinite] whitespace-nowrap will-change-transform">
        {/* Repeat the sentence multiple times to ensure seamless infinite scroll on 4K screens */}
        {[...Array(4)].map((_, arrayIndex) => (
          <div key={arrayIndex} className="flex items-center">
            {words.map((word, wordIndex) => (
              <span 
                key={`${arrayIndex}-${wordIndex}`} 
                className="text-[#F5E6D3] font-['Playfair_Display'] font-bold text-2xl uppercase tracking-widest px-6 opacity-90"
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
