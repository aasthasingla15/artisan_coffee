'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Plan {
  id: 'starter' | 'premium' | 'artisan';
  name: string;
  price: number;
  description: string;
  features: string[];
  color: string;
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter Roastery',
    price: 19,
    description: 'Perfect for casual coffee enthusiasts who enjoy exploring classic single-origins.',
    features: ['1 bag (250g) of single-origin coffee', 'Roaster tasting notes & brewing guide', 'Cancel or pause subscription anytime', 'Free delivery on all shipments'],
    color: 'border-amber-900/30'
  },
  {
    id: 'premium',
    name: 'Premium Collector',
    price: 35,
    description: 'For passionate home baristas wanting rare micro-lots and specialty micro-roasts.',
    features: ['2 bags (500g) of select specialty lots', 'Exclusive tasting journals & origin profiles', '10% discount on entire online catalog', 'Priority shipping & early access to new harvests'],
    color: 'border-amber-500/50 bg-[#261A12]/40 shadow-amber-900/10 shadow-xl'
  },
  {
    id: 'artisan',
    name: 'Artisan Connoisseur',
    price: 59,
    description: 'The ultimate bespoke experience featuring competition-grade Geisha and elite roasts.',
    features: ['3 bags (750g) of competition & microlot reserve', 'Direct access to video Q&A with master roaster', 'Special seasonal gift in every package', 'Insured carbon-neutral shipping'],
    color: 'border-emerald-600/40 bg-[#122A1E]/15'
  }
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'premium' | 'artisan'>('premium');
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('monthly');
  const [preference, setPreference] = useState<'espresso' | 'filter' | 'decaf' | 'roaster-choice'>('roaster-choice');
  const [checkoutSimulated, setCheckoutSimulated] = useState<boolean>(false);
  const [checkingOut, setCheckingOut] = useState<boolean>(false);

  const calculatePrice = () => {
    const basePrice = PLANS.find(p => p.id === selectedPlan)?.price || 0;
    if (frequency === 'weekly') return Math.round(basePrice * 3.5); // 4 deliveries a month discount
    if (frequency === 'biweekly') return Math.round(basePrice * 1.8);
    return basePrice;
  };

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setCheckoutSimulated(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#110B08] text-[#FAFAF9] font-['Inter'] relative flex flex-col justify-between py-12 px-6 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-900/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-950/10 blur-[130px] pointer-events-none" />

      {/* Header */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between mb-8 z-10">
        <Link href="/" className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-[#D4A574]">
          Artisan Coffee
        </Link>
        <Link href="/" className="text-amber-100/60 hover:text-amber-100 text-sm transition-colors">
          Back to Lounge
        </Link>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-5xl mx-auto w-full flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch z-10">
        
        {/* Left Tiers Column: Plan Selection */}
        <div className="lg:col-span-2 space-y-4 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-4xl font-['Playfair_Display'] font-bold text-amber-50 mb-2">
              Bespoke Coffee Subscriptions
            </h2>
            <p className="text-sm text-amber-100/60">
              Hand-roasted on order, shipped fresh globally. Choose your subscription profile below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANS.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`p-6 border rounded-2xl text-left flex flex-col justify-between transition-all duration-300 relative ${plan.color} ${
                    isSelected ? 'ring-2 ring-amber-500 scale-102' : 'hover:border-amber-900/60'
                  }`}
                >
                  <div>
                    <h3 className="text-lg font-bold text-amber-100 mb-1">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-3xl font-['Playfair_Display'] font-bold text-amber-200">
                        ${plan.price}
                      </span>
                      <span className="text-xs text-amber-100/40">/month</span>
                    </div>
                    <p className="text-[11px] text-amber-100/60 leading-relaxed mb-6">
                      {plan.description}
                    </p>
                  </div>
                  <ul className="space-y-2 text-[10px] text-amber-100/70 border-t border-amber-900/10 pt-4 mt-auto">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[#D4A574]">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Configuration / Pricing Box */}
        <div className="bg-[#1C120C]/65 border border-amber-900/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!checkoutSimulated ? (
              <motion.div
                key="config"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 flex-grow flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-amber-100 mb-4 border-b border-amber-900/15 pb-2">
                    Configure Order
                  </h3>

                  {/* Frequency Switcher */}
                  <div className="mb-6">
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-amber-200/50 mb-2">Delivery Frequency</label>
                    <div className="grid grid-cols-3 gap-2 bg-[#120B07]/40 p-1 border border-amber-900/20 rounded-xl text-center text-xs">
                      {(['weekly', 'biweekly', 'monthly'] as const).map((f) => (
                        <button
                          key={f}
                          onClick={() => setFrequency(f)}
                          className={`py-2 rounded-lg font-semibold capitalize transition-all ${
                            frequency === f ? 'bg-[#D4A574] text-[#120B07]' : 'text-amber-100/40 hover:text-amber-100/70'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Roast/Beans Preferences */}
                  <div className="mb-6">
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-amber-200/50 mb-2">Coffee Beans Profile</label>
                    <div className="space-y-2">
                      {[
                        { id: 'roaster-choice', label: "Roaster's Signature Choice (Vibrant)", desc: 'Mix of micro-lots selected weekly' },
                        { id: 'espresso', label: 'Dark Espresso Profiles', desc: 'Low acidity, notes of dark chocolate' },
                        { id: 'filter', label: 'Light Single-Origins (Filter)', desc: 'Fruity, bright acidity, high altitude' },
                        { id: 'decaf', label: 'Natural Decaf Blend', desc: '100% water process decaffeinated' }
                      ].map((pref) => (
                        <button
                          key={pref.id}
                          onClick={() => setPreference(pref.id as 'espresso' | 'filter' | 'decaf' | 'roaster-choice')}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-colors ${
                            preference === pref.id
                              ? 'bg-[#2E1F15] border-amber-500/50 text-amber-100'
                              : 'bg-[#20150F]/20 border-amber-900/10 text-amber-100/50 hover:border-amber-900/30 hover:text-amber-100/70'
                          }`}
                        >
                          <span className="font-semibold block mb-0.5">{pref.label}</span>
                          <span className="text-[10px] text-amber-100/30">{pref.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing / CTA */}
                <div>
                  <div className="border-t border-amber-900/15 pt-4 flex justify-between items-baseline mb-6">
                    <span className="text-xs text-amber-100/50">Recurring Total</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-['Playfair_Display'] font-bold text-amber-100">
                        ${calculatePrice()}
                      </span>
                      <span className="text-xs text-amber-100/40">/{frequency}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={checkingOut}
                    className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    {checkingOut ? 'Authenticating Gateway...' : 'Subscribe Securely'}
                  </button>
                </div>
              </motion.div>
            ) : (
              // Checkout Successful Simulated UI
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6 flex flex-col justify-center items-center h-full"
              >
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-4xl mb-2 text-emerald-400">
                  ✓
                </div>
                <h3 className="text-2xl font-['Playfair_Display'] font-bold text-amber-50">
                  Welcome to the Club
                </h3>
                <p className="text-xs text-amber-100/60 leading-relaxed max-w-xs">
                  Your recurring delivery for **{PLANS.find(p => p.id === selectedPlan)?.name}** is active. Your first batch will roast on Monday and ship right away.
                </p>

                <div className="bg-[#20150F]/40 border border-amber-900/20 rounded-2xl p-4 w-full text-left space-y-2 text-[10px] text-amber-100/50">
                  <div className="flex justify-between">
                    <span>Profile:</span>
                    <span className="font-semibold capitalize text-amber-100">{preference.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frequency:</span>
                    <span className="font-semibold capitalize text-amber-100">{frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-semibold text-amber-100">${calculatePrice()}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutSimulated(false)}
                  className="w-full py-3 border border-amber-900/30 text-amber-100 text-xs font-semibold rounded-xl hover:bg-[#20150F] transition-colors"
                >
                  Configure Another Profile
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-amber-100/40 mt-8 z-10">
        © {new Date().getFullYear()} Artisan Roastery Subscriptions.
      </footer>
    </div>
  );
}
