'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartSidebar() {
  const { isCartOpen, toggleCart, cartItems, cartTotal, updateQuantity, removeFromCart, checkout } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-[#1A0F0A]/60 backdrop-blur-sm z-[100] cursor-pointer"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-gradient-to-b from-[#2D1810] to-[#1A0F0A] shadow-2xl z-[101] border-l border-[#5A4034]/50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#5A4034]/30 flex items-center justify-between">
              <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#F5E6D3]">Your Cart</h2>
              <button
                onClick={toggleCart}
                className="w-10 h-10 rounded-full bg-[#3D2820] flex items-center justify-center text-[#F5E6D3] hover:bg-[#4F9C8F] transition-colors"
                aria-label="Close Cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#4F9C8F] scrollbar-track-transparent">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-[#F5E6D3] font-['Inter']">Your cart is empty.</p>
                  <p className="text-[#C9B8A0] text-sm mt-2">Discover your perfect blend today.</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex gap-4 p-4 rounded-xl bg-[#3D2820]/50 border border-[#5A4034]/30"
                  >
                    <Image src={item.image} alt={item.name} width={80} height={80} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-['Playfair_Display'] font-semibold text-[#F5E6D3] text-lg">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#C9B8A0] hover:text-red-400 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-[#4F9C8F] font-bold mb-auto">{item.price}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-[#2D1810] flex items-center justify-center text-[#F5E6D3] hover:bg-[#5A4034]"
                        >-</button>
                        <span className="text-[#F5E6D3] font-semibold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-[#2D1810] flex items-center justify-center text-[#F5E6D3] hover:bg-[#5A4034]"
                        >+</button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-[#5A4034]/30 bg-[#2D1810]/50 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-['Inter'] text-[#C9B8A0]">Total</span>
                  <span className="text-3xl font-['Playfair_Display'] font-bold text-[#F5E6D3]">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={checkout}
                  className="w-full py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-xl text-lg font-semibold shadow-xl hover:shadow-[#4F9C8F]/40 transition-shadow"
                >
                  Confirm & Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
