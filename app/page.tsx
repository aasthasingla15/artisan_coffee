import HeroCanvasAnimation from '@/components/HeroCanvasAnimation';
import ProductShowcase from '@/components/ProductShowcase';
import CoffeeProfile from '@/components/CoffeeProfile';
import FeatureSection from '@/components/FeatureSection';
import FinalCTA from '@/components/FinalCTA';
import MarqueeDivider from '@/components/MarqueeDivider';
import Footer from '@/components/Footer';
import StorySection from '@/components/StorySection';
import RoasterySection from '@/components/RoasterySection';
import StoreLocator from '@/components/StoreLocator';

async function fetchProducts() {
  const res = await fetch('/api/products', { cache: 'no-store' });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function Home() {
  const products = await fetchProducts();

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
      <ProductShowcase initialProducts={products} />
      {/* Feature Highlights Section */}
      <FeatureSection />
      {/* Final Call-to-Action */}
      <FinalCTA />
      <Footer />
    </main>
  );
}
