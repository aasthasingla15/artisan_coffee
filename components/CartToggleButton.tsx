'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function CartToggleButton() {
  const { cartItems, toggleCart } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.button
      onClick={toggleCart}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-[#4F9C8F] to-[#3D8B7F] rounded-full shadow-2xl z-[90] flex items-center justify-center cursor-pointer border-2 border-[#1A0F0A]"
      title="View Cart"
    >
      <span className="text-2xl text-white drop-shadow-md">🛒</span>
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-2 -right-2 bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-[#1A0F0A]"
          >
            {totalItems}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
