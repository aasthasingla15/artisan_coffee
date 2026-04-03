'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
}

export function Skeleton({ className = '', variant = 'rectangular' }: SkeletonProps) {
  const baseClasses = 'bg-[#2D1810] animate-pulse';

  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full'
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <motion.div
      className="bg-[#2D1810] rounded-2xl p-6 border border-[#5A4034]/30 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image skeleton */}
      <Skeleton variant="rectangular" className="w-full h-48 mb-4" />

      {/* Title skeleton */}
      <Skeleton variant="text" className="h-6 w-3/4 mb-2" />

      {/* Description skeleton */}
      <Skeleton variant="text" className="h-4 w-full mb-1" />
      <Skeleton variant="text" className="h-4 w-2/3 mb-4" />

      {/* Rating skeleton */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} variant="circular" className="w-4 h-4" />
        ))}
        <Skeleton variant="text" className="h-4 w-12 ml-2" />
      </div>

      {/* Features skeleton */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" className="h-6 w-16 rounded-full" />
        ))}
      </div>

      {/* Price and button skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton variant="text" className="h-8 w-20" />
        <Skeleton variant="circular" className="w-12 h-12" />
      </div>
    </motion.div>
  );
}

export function ProductShowcaseSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}