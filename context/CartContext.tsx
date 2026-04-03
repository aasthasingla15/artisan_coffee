'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CoffeeProduct } from '@/data/products';

export interface CartItem extends CoffeeProduct {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: CoffeeProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, amount: number) => void;
  toggleCart: () => void;
  checkout: () => void;
  processPayment: () => Promise<void>;
  cartTotal: number;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Hydration to avoid server-side match errors
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  const addToCart = (product: CoffeeProduct) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Automatically open cart when adding
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, amount: number) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + amount);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const checkout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const processPayment = async () => {
    // Simulate a network processing delay for the mockup payment
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return total + price * item.quantity;
  }, 0);

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        checkout,
        processPayment,
        cartTotal,
        isCheckoutOpen,
        setIsCheckoutOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
