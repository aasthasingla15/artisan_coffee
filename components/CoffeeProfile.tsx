'use client';

import React, { useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import dynamic from 'next/dynamic';

const CoffeeBean3D = dynamic(() => import('@/components/CoffeeBean3D'), { ssr: false });

export default function CoffeeProfile() {
  const { cartItems } = useCart();

  const profile = useMemo(() => {
    if (cartItems.length === 0) {
      return {
        title: 'Coffee Adventurer',
        headline: 'Start adding beans for your personalized profile.',
        description: 'Your data will build as you shop. Add various roasts and flavor notes to customize your profile analytics.'
      };
    }

    const roastCount: Record<string, number> = {};
    const flavorCount: Record<string, number> = {};

    cartItems.forEach(item => {
      const roast = item.roastLevel || 'medium';
      roastCount[roast] = (roastCount[roast] || 0) + item.quantity;
      item.flavorNotes?.forEach(note => {
        const key = note.toLowerCase();
        flavorCount[key] = (flavorCount[key] || 0) + item.quantity;
      });
    });

    const favoriteRoast = Object.entries(roastCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'medium';
    const favoriteFlavor = Object.entries(flavorCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'balanced';

    const personalityMap: Record<string, string> = {
      dark: 'Bold Explorer',
      medium: 'Smooth Storyteller',
      light: 'Bright Voyager'
    };

    return {
      title: `Your Profile: ${personalityMap[favoriteRoast] || 'Curious Connoisseur'}`,
      headline: `${favoriteRoast.charAt(0).toUpperCase() + favoriteRoast.slice(1)} Roast Enthusiast`,
      description: `You like ${favoriteFlavor} flavor notes and prefer ${favoriteRoast} roasts. Keep exploring our seasonal micro-lots!`
    };
  }, [cartItems]);

  return (
    <section id="coffee-profile" className="py-20 px-4 md:px-8 bg-[#0A0503]/80 border-t border-[#5A4034]/60">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Profile details */}
          <div className="rounded-3xl border border-[#5A4034] bg-[#1A0F0A]/85 p-8 md:p-12 backdrop-blur-md shadow-2xl flex flex-col justify-center h-full">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4F9C8F] mb-3">
              Craft Consumption Profile
            </span>
            <h3 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-4">
              {profile.title}
            </h3>
            <p className="text-[#C9B8A0] text-lg md:text-xl mb-4 font-semibold">
              {profile.headline}
            </p>
            <p className="text-[#A8907C] leading-relaxed text-sm md:text-base">
              {profile.description}
            </p>
          </div>

          {/* Interactive 3D Coffee Bean */}
          <div className="w-full">
            <CoffeeBean3D />
          </div>
        </div>
      </div>
    </section>
  );
}
