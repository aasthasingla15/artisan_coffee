'use client';

import React, { createContext, useContext, useState } from 'react';
import { CoffeeProduct } from '@/data/products';

interface CompareContextType {
  compareProducts: CoffeeProduct[];
  isCompareOpen: boolean;
  addToCompare: (product: CoffeeProduct) => void;
  removeFromCompare: (productId: string) => void;
  toggleCompare: () => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareProducts, setCompareProducts] = useState<CoffeeProduct[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const addToCompare = (product: CoffeeProduct) => {
    if (compareProducts.length < 4 && !isInCompare(product.id)) {
      setCompareProducts(prev => [...prev, product]);
    }
  };

  const removeFromCompare = (productId: string) => {
    setCompareProducts(prev => prev.filter(p => p.id !== productId));
  };

  const toggleCompare = () => {
    setIsCompareOpen(prev => !prev);
  };

  const clearCompare = () => {
    setCompareProducts([]);
  };

  const isInCompare = (productId: string) => {
    return compareProducts.some(p => p.id === productId);
  };

  return (
    <CompareContext.Provider value={{
      compareProducts,
      isCompareOpen,
      addToCompare,
      removeFromCompare,
      toggleCompare,
      clearCompare,
      isInCompare
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}