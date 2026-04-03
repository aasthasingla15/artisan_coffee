'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  exchangeRates: { [key: string]: number };
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState('USD');

  // Mock exchange rates (in real app, fetch from API)
  const exchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110,
    INR: 83.5,
  };

  const formatPrice = (price: number) => {
    const convertedPrice = price * exchangeRates[currency as keyof typeof exchangeRates];
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      INR: '₹',
    };
    return `${symbols[currency as keyof typeof symbols]}${convertedPrice.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRates, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};