'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface BrewMethod {
  id: string;
  name: string;
  ratio: number; // 1 part coffee to X parts water
  grindSize: string;
  temp: string; // temperature
  time: string; // duration description
  timerSeconds: number; // timer in seconds
  icon: string;
  steps: string[];
}

const METHODS: BrewMethod[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    ratio: 2, // 1:2
    grindSize: 'Extra Fine (table salt consistency)',
    temp: '93°C / 200°F',
    time: '25 - 30 seconds',
    timerSeconds: 30,
    icon: '☕',
    steps: [
      'Grind coffee grounds extremely fine into the portafilter.',
      'Distribute and tamp firmly with about 30 lbs of pressure to create a flat bed.',
      'Lock portafilter into the group head and start extraction.',
      'Brew should drip slowly and finish in 25-30 seconds with a rich golden crema.'
    ]
  },
  {
    id: 'pour-over',
    name: 'Pour Over (V60)',
    ratio: 16, // 1:16
    grindSize: 'Medium-Fine (sand consistency)',
    temp: '94°C / 202°F',
    time: '3 minutes',
    timerSeconds: 180,
    icon: '🧪',
    steps: [
      'Rinse paper filter with hot water to remove paper taste, then discard rinse water.',
      'Add coffee grounds and tap to flatten. Pour double the coffee weight of water to bloom (wet grounds) for 30s.',
      'Pour remaining water in slow concentric circles, avoiding the paper edge.',
      'Let water draw down completely. Total brew time should be around 3 minutes.'
    ]
  },
  {
    id: 'french-press',
    name: 'French Press',
    ratio: 15, // 1:15
    grindSize: 'Coarse (sea salt consistency)',
    temp: '95°C / 203°F',
    time: '4 minutes',
    timerSeconds: 240,
    icon: '🍯',
    steps: [
      'Add coarsely ground coffee to the beaker.',
      'Pour hot water over the grounds, ensuring all coffee is fully saturated.',
      'Place lid on top without pressing down, letting it steep for 4 minutes.',
      'Press plunger down slowly with consistent force and serve immediately.'
    ]
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    ratio: 12, // 1:12
    grindSize: 'Medium-Fine',
    temp: '88°C / 190°F',
    time: '1 minute 30 seconds',
    timerSeconds: 90,
    icon: '💉',
    steps: [
      'Place micro-filter in cap and rinse with hot water.',
      'Assemble AeroPress in inverted method and add coffee grounds.',
      'Pour water to wet grounds, stir gently for 10 seconds, then fill fully.',
      'Attach cap, flip over onto mug, and press plunger steadily for 30 seconds.'
    ]
  }
];

export default function BrewCalculatorPage() {
  const [selectedMethod, setSelectedMethod] = useState<BrewMethod>(METHODS[1]);
  const [coffeeGrams, setCoffeeGrams] = useState<number>(18);
  const [waterMl, setWaterMl] = useState<number>(288); // 18 * 16 default
  const [isCoffeeInput, setIsCoffeeInput] = useState<boolean>(true);

  // Timer States
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(selectedMethod.timerSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync inputs
  useEffect(() => {
    if (isCoffeeInput) {
      setWaterMl(Math.round(coffeeGrams * selectedMethod.ratio));
    } else {
      setCoffeeGrams(Number((waterMl / selectedMethod.ratio).toFixed(1)));
    }
  }, [coffeeGrams, waterMl, selectedMethod, isCoffeeInput]);

  // Handle method change
  const handleMethodChange = (method: BrewMethod) => {
    setSelectedMethod(method);
    setTimerActive(false);
    setTimeLeft(method.timerSeconds);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Timer controls
  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive]);

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setTimeLeft(selectedMethod.timerSeconds);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#110B08] text-[#FAFAF9] font-['Inter'] relative flex flex-col justify-between py-12 px-6 overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-900/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-950/15 blur-[130px] pointer-events-none" />

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
      <main className="max-w-5xl mx-auto w-full flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 z-10 items-stretch">
        
        {/* Left Panel: Sliders & Ratios */}
        <div className="bg-[#1C120C]/65 border border-amber-900/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-amber-50 mb-2">
              Brew Ratio Calculator
            </h2>
            <p className="text-xs text-amber-100/50 mb-8">
              Adjust water or coffee weights to get custom yields based on barista-standard ratios.
            </p>

            {/* Brewing Method Selector */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              {METHODS.map((method) => {
                const isSelected = selectedMethod.id === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => handleMethodChange(method)}
                    className={`flex flex-col items-center py-4 px-2 rounded-2xl border transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#2E1F15] border-amber-500/50 shadow-md shadow-amber-950/30 text-amber-100'
                        : 'bg-[#20150F]/40 border-amber-900/10 text-amber-100/40 hover:border-amber-900/40 hover:text-amber-100/70'
                    }`}
                  >
                    <span className="text-2xl mb-1">{method.icon}</span>
                    <span className="text-[10px] font-bold tracking-wide uppercase">{method.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Calculator Sliders */}
            <div className="space-y-6">
              {/* Coffee Input */}
              <div className="bg-[#150D09]/40 border border-amber-900/10 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-amber-200/80">Coffee Grounds</label>
                  <span className="text-lg font-bold text-amber-100">{coffeeGrams}g</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="0.5"
                  value={coffeeGrams}
                  onChange={(e) => {
                    setIsCoffeeInput(true);
                    setCoffeeGrams(Number(e.target.value));
                  }}
                  className="w-full h-1 bg-amber-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Water Input */}
              <div className="bg-[#150D09]/40 border border-amber-900/10 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-amber-200/80">Water Volume</label>
                  <span className="text-lg font-bold text-amber-100">{waterMl}ml</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="10"
                  value={waterMl}
                  onChange={(e) => {
                    setIsCoffeeInput(false);
                    setWaterMl(Number(e.target.value));
                  }}
                  className="w-full h-1 bg-amber-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Quick specs output */}
          <div className="mt-8 grid grid-cols-3 gap-2 bg-[#20150F]/30 p-4 border border-amber-900/15 rounded-2xl text-center text-xs">
            <div>
              <span className="block text-amber-100/40 text-[9px] uppercase font-bold tracking-wider mb-0.5">Ratio</span>
              <span className="font-semibold text-amber-200">1 : {selectedMethod.ratio}</span>
            </div>
            <div>
              <span className="block text-amber-100/40 text-[9px] uppercase font-bold tracking-wider mb-0.5">Water Temp</span>
              <span className="font-semibold text-amber-200">{selectedMethod.temp}</span>
            </div>
            <div>
              <span className="block text-amber-100/40 text-[9px] uppercase font-bold tracking-wider mb-0.5">Grind Size</span>
              <span className="font-semibold text-amber-200 line-clamp-1">{selectedMethod.grindSize}</span>
            </div>
          </div>

        </div>

        {/* Right Panel: Steps & Brew Timer */}
        <div className="bg-[#1C120C]/65 border border-amber-900/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-['Playfair_Display'] font-semibold text-amber-50 mb-4 flex items-center gap-2">
              ⏱️ Brew Session
            </h3>

            {/* Timer Visual */}
            <div className="relative flex flex-col items-center justify-center py-6 bg-[#20150F]/20 border border-amber-900/10 rounded-2xl mb-8">
              <div className="text-5xl font-mono font-bold text-amber-100 mb-4 tracking-wider">
                {formatTime(timeLeft)}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={toggleTimer}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    timerActive
                      ? 'bg-amber-700/50 border border-amber-500/30 text-amber-100 hover:bg-amber-700'
                      : 'bg-[#D4A574] text-[#110B08] hover:bg-amber-400'
                  }`}
                >
                  {timerActive ? 'Pause' : 'Start Timer'}
                </button>
                <button
                  onClick={resetTimer}
                  className="px-4 py-2 bg-amber-950/40 border border-amber-900/40 rounded-full text-xs font-semibold text-amber-100/60 hover:text-amber-100 hover:bg-amber-950/80 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Brewing Steps */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-500/80 mb-3">
                Brewing Guide
              </h4>
              <ol className="space-y-3 text-xs text-amber-100/70 leading-relaxed">
                {selectedMethod.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 font-bold">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-amber-100/40 mt-8 z-10">
        © {new Date().getFullYear()} Artisan Precision Brewing. All rights reserved.
      </footer>
    </div>
  );
}
