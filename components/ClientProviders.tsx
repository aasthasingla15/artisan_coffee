'use client';

import React, { useEffect } from 'react';
import { CartProvider } from '@/context/CartContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { CompareProvider } from '@/context/CompareContext';
import CartSidebar from '@/components/CartSidebar';
import CartToggleButton from '@/components/CartToggleButton';
import CheckoutModal from '@/components/CheckoutModal';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import ThemeToggle from '@/components/ThemeToggle';
import NotificationContainer from '@/components/NotificationContainer';
import CompareModalWrapper from '@/components/CompareModalWrapper';
import { initI18n } from '../i18n';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  useEffect(() => {
    initI18n();
  }, []);

  return (
    <ThemeProvider>
      <NotificationProvider>
        <CompareProvider>
          <CartProvider>
            <CurrencyProvider>
              <FavoritesProvider>
                {children}
                <CartSidebar />
                <CartToggleButton />
                <CheckoutModal />
                <CustomCursor />
                <Navbar />
                <ThemeToggle />
                <NotificationContainer />
                <CompareModalWrapper />
              </FavoritesProvider>
            </CurrencyProvider>
          </CartProvider>
        </CompareProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}