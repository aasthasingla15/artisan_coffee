'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface OrderStep {
  label: string;
  desc: string;
  status: 'received' | 'preparing' | 'brewing' | 'ready';
  icon: string;
}

const STEPS: OrderStep[] = [
  { label: 'Order Received', desc: 'Your craft beans selection is queued in our roastery database.', status: 'received', icon: '📥' },
  { label: 'Preparing Blend', desc: 'Measuring weight, profiling acidity levels, and preheating systems.', status: 'preparing', icon: '⚖️' },
  { label: 'Craft Brewing', desc: 'Precision roasting or hot-water brewing is active in the lounge.', status: 'brewing', icon: '🔥' },
  { label: 'Ready to Sip', desc: 'Packed securely in glass containers, ready for courier collection.', status: 'ready', icon: '📦' }
];

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use() if needed, or simply handle locally since it is a client component
  const [orderId, setOrderId] = useState<string>('');
  
  useEffect(() => {
    params.then((p) => setOrderId(p.id));
  }, [params]);

  const [currentStatusIndex, setCurrentStatusIndex] = useState<number>(0);

  // Simulate real-time status updates from the roastery
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStatusIndex((prev) => {
        if (prev < STEPS.length - 1) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 15000); // Progresses every 15 seconds

    return () => clearInterval(timer);
  }, []);

  const activeStep = STEPS[currentStatusIndex];

  return (
    <div className="min-h-screen bg-[#110B08] text-[#FAFAF9] font-['Inter'] relative flex flex-col justify-between py-12 px-6 overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-900/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-950/15 blur-[130px] pointer-events-none" />

      {/* Header */}
      <header className="max-w-3xl mx-auto w-full flex items-center justify-between mb-8 z-10">
        <Link href="/" className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-[#D4A574]">
          Artisan Coffee
        </Link>
        <Link href="/" className="text-amber-100/60 hover:text-amber-100 text-sm transition-colors">
          Back to Lounge
        </Link>
      </header>

      {/* Tracking Card */}
      <main className="max-w-3xl mx-auto w-full flex-grow flex items-center justify-center z-10">
        <div className="w-full bg-[#1C120C]/65 border border-amber-900/30 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl relative">
          
          {/* Top Status Overview */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-amber-900/15 pb-6">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">
                Order Tracking
              </span>
              <h2 className="text-xl md:text-2xl font-['Playfair_Display'] font-bold text-amber-50 mt-1">
                UID: {orderId || 'AC-789312'}
              </h2>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl text-center">
              <span className="block text-[9px] uppercase tracking-wide text-amber-400 font-semibold mb-0.5">Current Phase</span>
              <span className="text-xs font-bold text-amber-200 capitalize">{activeStep.label}</span>
            </div>
          </div>

          {/* Stepper visualization */}
          <div className="relative mb-12">
            {/* Background line */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-amber-950 -z-10 hidden md:block" />
            
            {/* Dynamic filled progress line */}
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStatusIndex / (STEPS.length - 1)) * 100}%` }}
              className="absolute top-6 left-6 right-6 h-0.5 bg-gradient-to-r from-amber-600 to-amber-400 -z-10 hidden md:block"
              transition={{ duration: 1 }}
            />

            {/* Steps Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {STEPS.map((step, idx) => {
                const isCompleted = idx < currentStatusIndex;
                const isActive = idx === currentStatusIndex;

                return (
                  <div key={idx} className="flex md:flex-col items-center gap-4 md:gap-0 text-left md:text-center">
                    {/* Circle Indicator */}
                    <div
                      className={`w-12 h-12 rounded-full border flex items-center justify-center text-xl transition-all duration-300 md:mb-4 ${
                        isCompleted
                          ? 'bg-amber-950 border-amber-500 text-amber-300'
                          : isActive
                          ? 'bg-amber-800 border-amber-400 text-amber-100 shadow-lg shadow-amber-950/50 scale-110'
                          : 'bg-[#20150F]/40 border-amber-900/15 text-amber-100/30'
                      }`}
                    >
                      {isCompleted ? '✓' : step.icon}
                    </div>

                    <div>
                      <h4
                        className={`text-sm font-semibold transition-colors duration-300 ${
                          isActive ? 'text-amber-100' : isCompleted ? 'text-amber-200/80' : 'text-amber-100/30'
                        }`}
                      >
                        {step.label}
                      </h4>
                      <p
                        className={`text-[10px] leading-relaxed mt-1 md:px-2 transition-colors duration-300 ${
                          isActive ? 'text-amber-100/60' : 'text-amber-100/20'
                        }`}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time indicator notice */}
          <div className="bg-[#20150F]/20 border border-amber-900/10 rounded-2xl p-6 text-center text-xs text-amber-100/60 leading-relaxed">
            ☕ **Live Barista Feed**: The roastery updates your order timeline automatically. Our beans are roasted in micro-lots to maintain maximum oil concentration. Average processing takes about 1-2 minutes for display purposes.
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-amber-100/40 mt-8 z-10">
        © {new Date().getFullYear()} Artisan Roasters Live Feed. All rights reserved.
      </footer>
    </div>
  );
}
