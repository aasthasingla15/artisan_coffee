'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { CoffeeProduct } from '@/data/products';

interface ProductShowcaseProps {
  initialProducts: CoffeeProduct[];
}

export default function ProductShowcase({ initialProducts }: ProductShowcaseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [roastLevel, setRoastLevel] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const products = useMemo(() => initialProducts ?? [], [initialProducts]);

  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = [Math.min(priceRange[0], priceRange[1]), Math.max(priceRange[0], priceRange[1])];
    const specialIds = ['affogato', 'irish-coffee', 'nitro-cold-brew', 'frappe'];

    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all'
        || (selectedType === 'special' && specialIds.includes(product.id))
        || product.features.some(feature => feature.toLowerCase().includes(selectedType.toLowerCase()));
      const matchesRoast = roastLevel === 'all' || product.roastLevel === roastLevel;
      const productPrice = parseFloat(product.price.replace('$', ''));
      const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;
      const matchesFlavors = selectedFlavors.length === 0 || selectedFlavors.some(flavor => 
        product.flavorNotes.some(note => note.toLowerCase().includes(flavor.toLowerCase()))
      );
      
      return matchesSearch && matchesType && matchesRoast && matchesPrice && matchesFlavors;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case 'price-high':
          return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedType, sortBy, roastLevel, priceRange, selectedFlavors, products]);

  return (
    <section id="products" className="py-24 px-4 md:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative h-64 mb-16 rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D2418] via-[#4D3428] to-[#3D2418]" />
        <Image
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200"
          alt="Coffee Splash"
          width={1200}
          height={256}
          unoptimized={true}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        />
        {/* Floating Coffee Beans */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0 }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              rotate: [0, 360]
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 2,
              delay: i * 0.3
            }}
            className="absolute w-8 h-8 opacity-40"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + Math.random() * 40}%`
            }}
          >
            <Image src="https://img.icons8.com/color/48/000000/coffee-beans.png" alt="Coffee Bean" width={32} height={32} unoptimized={true} className="w-full h-full object-contain grayscale sepia" />
          </motion.div>
        ))}
      </motion.div>
      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        {/* Filters and Search */}
        <div className="mb-12">
          <div className="bg-[#2D1810]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#5A4034]/30">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm text-[#C9B8A0] mb-2 font-['Inter']">Search</label>
                <input
                  type="text"
                  placeholder="Search coffees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1A0F0A] border border-[#5A4034] rounded-lg text-[#F5E6D3] placeholder:text-[#5A4034] focus:outline-none focus:border-[#4F9C8F]"
                />
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm text-[#C9B8A0] mb-2 font-['Inter']">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1A0F0A] border border-[#5A4034] rounded-lg text-[#F5E6D3] focus:outline-none focus:border-[#4F9C8F]"
                >
                  <option value="all">All Types</option>
                  <option value="espresso">Espresso</option>
                  <option value="milk">Milk Based</option>
                  <option value="cold">Cold Brew</option>
                  <option value="special">Specialty</option>
                </select>
              </div>

              {/* Roast Level */}
              <div>
                <label className="block text-sm text-[#C9B8A0] mb-2 font-['Inter']">Roast Level</label>
                <select
                  value={roastLevel}
                  onChange={(e) => setRoastLevel(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1A0F0A] border border-[#5A4034] rounded-lg text-[#F5E6D3] focus:outline-none focus:border-[#4F9C8F]"
                >
                  <option value="all">All Roasts</option>
                  <option value="light">Light Roast</option>
                  <option value="medium">Medium Roast</option>
                  <option value="dark">Dark Roast</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm text-[#C9B8A0] mb-2 font-['Inter']">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1A0F0A] border border-[#5A4034] rounded-lg text-[#F5E6D3] focus:outline-none focus:border-[#4F9C8F]"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="mt-6">
              <label className="block text-sm text-[#C9B8A0] mb-3 font-['Inter']">Price Range: ${Math.min(priceRange[0], priceRange[1])} - ${Math.max(priceRange[0], priceRange[1])}</label>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setPriceRange((prev) => [value, Math.max(value, prev[1])]);
                  }}
                  className="w-full h-2 bg-[#5A4034] rounded-lg appearance-none cursor-pointer slider"
                />
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setPriceRange((prev) => [Math.min(prev[0], value), value]);
                  }}
                />
              </div>
            </div>

            {/* Flavor Notes */}
            <div className="mt-6">
              <label className="block text-sm text-[#C9B8A0] mb-3 font-['Inter']">Flavor Notes</label>
              <div className="flex flex-wrap gap-2">
                {['chocolate', 'fruity', 'nutty', 'caramel', 'citrus', 'floral'].map(flavor => (
                  <button
                    key={flavor}
                    onClick={() => {
                      setSelectedFlavors(prev => 
                        prev.includes(flavor) 
                          ? prev.filter(f => f !== flavor)
                          : [...prev, flavor]
                      );
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-['Inter'] transition-colors ${
                      selectedFlavors.includes(flavor)
                        ? 'bg-[#4F9C8F] text-white'
                        : 'bg-[#5A4034] text-[#C9B8A0] hover:bg-[#4F9C8F]/50'
                    }`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-7xl font-['Playfair_Display'] font-bold text-center text-[#F5E6D3] mb-16"
        >
          Our Signature Blends
        </motion.h2>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#2D1810]/50 rounded-2xl border border-[#5A4034]/30">
            <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#F5E6D3]">No results found</h3>
            <p className="text-[#C9B8A0] mt-2">Try changing the filter criteria or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
