'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import ProductShowcase from '@/components/ProductShowcase';
import CoffeeProfile from '@/components/CoffeeProfile';
import FeatureSection from '@/components/FeatureSection';
import FinalCTA from '@/components/FinalCTA';
import MarqueeDivider from '@/components/MarqueeDivider';
import Footer from '@/components/Footer';
import StorySection from '@/components/StorySection';
import RoasterySection from '@/components/RoasterySection';
import StoreLocator from '@/components/StoreLocator';

const HeroCanvasAnimation = dynamic(() => import('@/components/HeroCanvasAnimation'), { ssr: false });

export default function Home() {
  useEffect(() => {
    // Ensure smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);
  return (
    <main className="bg-[#1A0F0A] min-h-screen">
      {/* Hero: Scroll-Triggered Canvas Animation */}
      <HeroCanvasAnimation />
      <StorySection />
      <RoasterySection />
      <StoreLocator />
      <CoffeeProfile />
      <MarqueeDivider />
      {/* Product Showcase Section */}
      <ProductShowcase />
      {/* Feature Highlights Section */}
      <FeatureSection />
      {/* Final Call-to-Action */}
      <FinalCTA />
      <Footer />
    </main>
  );
}
