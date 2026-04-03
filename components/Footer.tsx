'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0503] text-[#F5E6D3] pt-32 pb-16 overflow-hidden border-t border-[#5A4034]/20">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4F9C8F]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4A574]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Top Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          
          {/* Brand/Subscribe */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-['Playfair_Display'] font-bold mb-4">Stay Caffeinated.</h3>
            <p className="font-['Inter'] text-[#C9B8A0] mb-8 max-w-sm">
              Subscribe to our private roasting newsletter to gain early access to single-origin drops and brewing recipes.
            </p>
            <div className="flex bg-[#1A0F0A] border border-[#5A4034]/50 rounded-full p-1 max-w-md focus-within:border-[#4F9C8F] transition-colors">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="bg-transparent text-[#F5E6D3] px-6 py-3 flex-1 focus:outline-none placeholder:text-[#5A4034]"
              />
              <button className="bg-[#4F9C8F] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#3D8B7F] transition-colors shadow-lg">
                Join
              </button>
            </div>
          </div>

          {/* Links 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-['Playfair_Display'] font-bold text-xl text-[#F5E6D3] mb-2 cursor-default">Shop</h4>
            {['Single Origin', 'Espresso Blends', 'Decaf', 'Brewing Equipment'].map(link => (
              <a key={link} href="#" className="font-['Inter'] text-[#C9B8A0] hover:text-[#4F9C8F] transition-colors underline-offset-4 hover:underline">
                {link}
              </a>
            ))}
          </div>

          {/* Links 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-['Playfair_Display'] font-bold text-xl text-[#F5E6D3] mb-2 cursor-default">Visit Us</h4>
            {['Seattle Roastery', 'Portland Café', 'Brooklyn Lab', 'Contact Support'].map(link => (
              <a key={link} href="#" className="font-['Inter'] text-[#C9B8A0] hover:text-[#4F9C8F] transition-colors underline-offset-4 hover:underline">
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#5A4034]/40 to-transparent mb-16" />

        {/* Huge Bottom Title */}
        <div className="flex flex-col items-center justify-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[12vw] md:text-[8rem] font-['Playfair_Display'] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#3D2820] to-[#1A0F0A] uppercase tracking-widest leading-none select-none mb-8"
          >
            Artisan
          </motion.h1>
          
          <div className="flex flex-col md:flex-row items-center justify-between w-full font-['Inter'] text-[#5A4034] text-sm">
            <p>© {new Date().getFullYear()} Artisan Coffee Roasters. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {['Instagram', 'Twitter', 'TikTok'].map(social => (
                <a key={social} href="#" className="hover:text-[#4F9C8F] transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
