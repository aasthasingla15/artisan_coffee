'use client';

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import CurrencySwitcher from './CurrencySwitcher';
import { useCompare } from '@/context/CompareContext';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { compareProducts, toggleCompare } = useCompare();

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true); // scrolling down & past header
    } else {
      setHidden(false); // scrolling up
    }
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-[80] transition-colors duration-300 ${
        isScrolled ? "bg-[#0A0503]/80 backdrop-blur-md border-b border-[#5A4034]/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col cursor-pointer">
          <span className="text-2xl font-['Playfair_Display'] font-bold tracking-widest text-[#F5E6D3] uppercase">
            Artisan
          </span>
          <span className="text-[10px] tracking-[0.3em] text-[#4F9C8F] uppercase font-['Inter'] font-semibold">
            Coffee Roasters
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 lg:gap-8 font-['Inter'] text-xs uppercase tracking-wider font-semibold text-[#C9B8A0]">
            {[
              { label: 'Shop Coffee', href: '/#products' },
              { label: 'AI Match', href: '/recommendation' },
              { label: 'Origin Map', href: '/origin-map' },
              { label: 'Brew Tool', href: '/brew-calculator' },
              { label: 'Subscriptions', href: '/subscription' },
              { label: 'Admin', href: '/admin' }
            ].map((link, idx) => (
              <li key={idx}>
                <a 
                  href={link.href} 
                  className="hover:text-[#F5E6D3] hover:text-shadow-sm transition-all duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#4F9C8F] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <CurrencySwitcher />
            <LanguageSwitcher />
            <motion.button
              onClick={toggleCompare}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-lg bg-[#2D1810] border border-[#5A4034]/30 hover:border-[#4F9C8F]/50 transition-colors"
            >
              <svg className="w-5 h-5 text-[#F5E6D3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {compareProducts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#4F9C8F] text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {compareProducts.length}
                </span>
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden flex flex-col gap-1.5 w-8 items-end z-50">
          <span className="w-full h-[2px] bg-[#F5E6D3] rounded-full" />
          <span className="w-3/4 h-[2px] bg-[#F5E6D3] rounded-full" />
          <span className="w-1/2 h-[2px] bg-[#F5E6D3] rounded-full" />
        </button>
      </div>
    </motion.header>
  );
}
