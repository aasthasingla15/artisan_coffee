'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { coffeeProducts, CoffeeProduct } from '@/data/products';
import Link from 'next/link';

interface QuizState {
  taste: 'chocolate' | 'nutty' | 'caramel' | 'fruity';
  strength: 'light' | 'medium' | 'dark';
  milk: 'yes' | 'no';
  sweetness: 'low' | 'medium' | 'high';
}

const STEPS = [
  {
    id: 'taste',
    title: 'Select your preferred flavor profile',
    description: 'What flavor note do you enjoy most in the morning?',
    options: [
      { value: 'chocolate', label: 'Rich Chocolate', icon: '🍫', description: 'Deep, luxurious, and sweet chocolate notes' },
      { value: 'nutty', label: 'Toasted Hazelnut', icon: '🌰', description: 'Earthy, warm, and roasted nut flavors' },
      { value: 'caramel', label: 'Warm Caramel', icon: '🍯', description: 'Buttery, sweet, and comforting undertones' },
      { value: 'fruity', label: 'Vibrant Berries', icon: '🍓', description: 'Bright, crisp, and slightly acidic fruit profile' }
    ]
  },
  {
    id: 'strength',
    title: 'Choose your desired roast level',
    description: 'How bold and intense do you like your coffee?',
    options: [
      { value: 'light', label: 'Light Roast', icon: '☀️', description: 'Acidity-focused, bright, and tasting note forward' },
      { value: 'medium', label: 'Medium Roast', icon: '⛅', description: 'Balanced, smooth, and standard body' },
      { value: 'dark', label: 'Dark Roast', icon: '🌙', description: 'Bold, smoky, and full-bodied espresso character' }
    ]
  },
  {
    id: 'milk',
    title: 'How do you brew / drink it?',
    description: 'Do you prefer to add milk or creamer to your cup?',
    options: [
      { value: 'yes', label: 'With Milk / Cream', icon: '🥛', description: 'Lattes, Cappuccinos, or coffee with cream' },
      { value: 'no', label: 'Black / Neat', icon: '☕', description: 'Espresso, Americano, or drip black coffee' }
    ]
  },
  {
    id: 'sweetness',
    title: 'How much sweetness do you prefer?',
    description: 'Select your preferred sweetness tolerance.',
    options: [
      { value: 'low', label: 'Unsweetened', icon: '🍃', description: 'Pure coffee flavors without sugar' },
      { value: 'medium', label: 'Lightly Sweet', icon: '🍬', description: 'A touch of caramel or natural sweetness' },
      { value: 'high', label: 'Sweet & Indulgent', icon: '🍦', description: 'Like a dessert, mocha, or frappé style' }
    ]
  }
];

export default function RecommenderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizState>>({});
  const [results, setResults] = useState<{ product: CoffeeProduct; score: number }[] | null>(null);

  const handleSelect = (value: string) => {
    const currentStepId = STEPS[currentStep].id;
    const updatedAnswers = { ...answers, [currentStepId]: value };
    setAnswers(updatedAnswers);

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      calculateRecommendation(updatedAnswers as QuizState);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setResults(null);
  };

  const calculateRecommendation = (finalAnswers: QuizState) => {
    const scoredProducts = coffeeProducts.map((coffee) => {
      let score = 0;

      // 1. Taste / Flavor Notes match (Max 40 points)
      if (coffee.flavorNotes.includes(finalAnswers.taste)) {
        score += 40;
      } else {
        // Partial match
        score += 15;
      }

      // 2. Roast level match (Max 30 points)
      if (coffee.roastLevel === finalAnswers.strength) {
        score += 30;
      } else if (
        (finalAnswers.strength === 'medium' && (coffee.roastLevel === 'light' || coffee.roastLevel === 'dark'))
      ) {
        score += 15;
      }

      // 3. Milk compatibility heuristic (Max 20 points)
      const isMilkFriendly = ['latte', 'cappuccino', 'mocha', 'vietnamese-coffee', 'frappe', 'flat-white'].includes(coffee.id);
      if (finalAnswers.milk === 'yes' && isMilkFriendly) {
        score += 20;
      } else if (finalAnswers.milk === 'no' && !isMilkFriendly) {
        score += 20;
      } else {
        score += 5;
      }

      // 4. Sweetness match (Max 10 points)
      const isSweetDrink = ['mocha', 'frappe', 'vietnamese-coffee', 'affogato'].includes(coffee.id);
      if (finalAnswers.sweetness === 'high' && isSweetDrink) {
        score += 10;
      } else if (finalAnswers.sweetness === 'low' && !isSweetDrink) {
        score += 10;
      } else if (finalAnswers.sweetness === 'medium') {
        score += 8;
      }

      return {
        product: coffee,
        score: Math.min(score, 100) // Caps at 100%
      };
    });

    // Sort by highest score
    scoredProducts.sort((a, b) => b.score - a.score);
    setResults(scoredProducts.slice(0, 3));
  };

  const stepInfo = STEPS[currentStep];

  return (
    <div className="min-h-screen bg-[#120B07] text-[#FAFAF9] font-['Inter'] relative overflow-hidden flex flex-col justify-between py-12 px-6">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-950/10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between mb-8 z-10">
        <Link href="/" className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-[#D4A574]">
          Artisan Coffee
        </Link>
        <Link href="/" className="text-amber-100/60 hover:text-amber-100 text-sm transition-colors">
          Back to Lounge
        </Link>
      </header>

      {/* Main Card Container */}
      <main className="max-w-3xl mx-auto w-full flex-grow flex items-center justify-center z-10">
        <div className="w-full bg-[#1C120C]/65 border border-amber-900/30 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl relative">
          
          <AnimatePresence mode="wait">
            {!results ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                {/* Step indicators */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
                    Step {currentStep + 1} of {STEPS.length}
                  </span>
                  <div className="flex gap-1">
                    {STEPS.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                          index <= currentStep ? 'bg-[#D4A574]' : 'bg-amber-950'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question */}
                <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-amber-50 mb-3 leading-tight">
                  {stepInfo.title}
                </h2>
                <p className="text-amber-100/70 mb-8 text-sm md:text-base">
                  {stepInfo.description}
                </p>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {stepInfo.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className="group flex flex-col items-start p-6 bg-[#261A12]/40 hover:bg-amber-950/40 border border-amber-900/20 hover:border-amber-500/30 rounded-2xl text-left transition-all duration-300 hover:shadow-lg focus:outline-none"
                    >
                      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {option.icon}
                      </div>
                      <span className="text-lg font-semibold text-amber-100 mb-1">
                        {option.label}
                      </span>
                      <span className="text-xs text-amber-100/50 leading-relaxed">
                        {option.description}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Navigation Back */}
                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="self-start text-xs text-amber-500/70 hover:text-amber-500 font-semibold uppercase tracking-wider transition-colors flex items-center gap-1"
                  >
                    ← Back to previous question
                  </button>
                )}
              </motion.div>
            ) : (
              // Results Display
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="inline-block p-3 bg-amber-500/10 border border-amber-500/30 rounded-full text-2xl mb-4">
                  🤖 AI Matching Complete
                </div>
                <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-amber-50 mb-3">
                  Your Custom Craft Blends
                </h2>
                <p className="text-amber-100/70 mb-10 max-w-lg mx-auto text-sm md:text-base">
                  Our recommendation engine matched your flavor preferences and brewing style against our premium collection.
                </p>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {results.map(({ product, score }, idx) => (
                    <div
                      key={product.id}
                      className={`relative p-6 border rounded-2xl text-left flex flex-col justify-between ${
                        idx === 0
                          ? 'bg-[#2E1F15]/90 border-amber-400/50 shadow-amber-900/20 shadow-xl'
                          : 'bg-[#261A12]/50 border-amber-900/20'
                      }`}
                    >
                      {idx === 0 && (
                        <span className="absolute -top-3 left-6 bg-gradient-to-r from-amber-400 to-amber-600 text-[#120B07] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          Best Match
                        </span>
                      )}
                      <div>
                        {/* Match Circle */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-['Playfair_Display'] font-bold text-[#D4A574]">
                            {product.price}
                          </span>
                          <span className="text-xs font-semibold px-2 py-1 rounded-md bg-amber-500/10 text-amber-400">
                            {score}% Match
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-amber-100 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-xs text-amber-100/60 mb-4 line-clamp-3">
                          {product.description}
                        </p>
                      </div>

                      <Link
                        href={`/#products`}
                        className={`w-full py-2.5 rounded-xl text-center text-xs font-semibold transition-all duration-300 ${
                          idx === 0
                            ? 'bg-[#D4A574] text-[#120B07] hover:bg-amber-400'
                            : 'bg-amber-950/60 text-amber-100 hover:bg-amber-900/60'
                        }`}
                      >
                        Order Now
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-3 bg-[#261A12]/80 hover:bg-[#261A12] text-amber-100 rounded-full text-sm font-semibold border border-amber-900/40 transition-colors"
                  >
                    Retake Quiz
                  </button>
                  <Link
                    href="/"
                    className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full text-sm font-semibold hover:from-amber-500 hover:to-amber-600 transition-all"
                  >
                    Return to Cafe
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-amber-100/40 z-10">
        © {new Date().getFullYear()} Artisan Coffee Intelligence. All rights reserved.
      </footer>
    </div>
  );
}
