'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CoffeeProduct } from '@/data/products';
import { useCurrency } from '@/context/CurrencyContext';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: CoffeeProduct[];
  onRemoveProduct: (productId: string) => void;
}

export default function CompareModal({ isOpen, onClose, products, onRemoveProduct }: CompareModalProps) {
  const { formatPrice } = useCurrency();

  const features = [
    { key: 'price', label: 'Price', format: (product: CoffeeProduct) => formatPrice(parseFloat(product.price.replace('$', ''))) },
    { key: 'rating', label: 'Rating', format: (product: CoffeeProduct) => `${product.rating}/5 ⭐` },
    { key: 'roastLevel', label: 'Roast Level', format: (product: CoffeeProduct) => product.roastLevel || 'N/A' },
    { key: 'origin', label: 'Origin', format: (product: CoffeeProduct) => product.origin || 'N/A' },
    { key: 'features', label: 'Features', format: (product: CoffeeProduct) => product.features.join(', ') },
    { key: 'flavorNotes', label: 'Flavor Notes', format: (product: CoffeeProduct) => product.flavorNotes?.join(', ') || 'N/A' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-[#1A0F0A] rounded-2xl border border-[#5A4034]/30 max-w-6xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#5A4034]/30">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#F5E6D3]">
                  Compare Coffees
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-[#2D1810] border border-[#5A4034]/30 flex items-center justify-center hover:bg-[#3D2820] transition-colors"
                >
                  <svg className="w-5 h-5 text-[#F5E6D3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-auto max-h-[calc(90vh-120px)]">
              <div className="p-6">
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-[#C9B8A0] font-['Inter']">No coffees selected for comparison</p>
                    <p className="text-[#A8907C] text-sm mt-2">Add coffees to compare their features</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left p-4 text-[#F5E6D3] font-['Playfair_Display'] font-bold">Feature</th>
                          {products.map((product) => (
                            <th key={product.id} className="p-4 min-w-[250px]">
                              <div className="flex flex-col items-center">
                                <div className="relative w-20 h-20 mb-3">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover rounded-lg"
                                  />
                                </div>
                                <h3 className="text-[#F5E6D3] font-['Playfair_Display'] font-bold text-center mb-2">
                                  {product.name}
                                </h3>
                                <button
                                  onClick={() => onRemoveProduct(product.id)}
                                  className="text-[#A8907C] hover:text-red-400 transition-colors text-sm"
                                >
                                  Remove
                                </button>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {features.map((feature, index) => (
                          <tr key={feature.key} className={index % 2 === 0 ? 'bg-[#2D1810]/30' : ''}>
                            <td className="p-4 text-[#C9B8A0] font-['Inter'] font-medium">
                              {feature.label}
                            </td>
                            {products.map((product) => (
                              <td key={product.id} className="p-4 text-center text-[#F5E6D3] font-['Inter']">
                                {feature.format(product)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}