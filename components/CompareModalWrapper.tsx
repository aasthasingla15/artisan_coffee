'use client';

import React from 'react';
import CompareModal from '@/components/CompareModal';
import { useCompare } from '@/context/CompareContext';

export default function CompareModalWrapper() {
  const { isCompareOpen, compareProducts, removeFromCompare, toggleCompare } = useCompare();

  return (
    <CompareModal
      isOpen={isCompareOpen}
      onClose={toggleCompare}
      products={compareProducts}
      onRemoveProduct={removeFromCompare}
    />
  );
}