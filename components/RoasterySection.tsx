'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function RoasterySection() {
  const { scrollYProgress } = useScroll();
  // Create a parallax scroll effect for the main background image
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section id="roastery" className="relative w-full h-[100vh] min-h-[800px] overflow-hidden">
      {/* Background Image Parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-[150%] -z-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0503] via-[#0A0503]/80 to-[#1A0F0A]/90 z-10" />
        <Image 
          src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=2000" 
          alt="Industrial Roasting Process"
          width={2000}
          height={1500}
          unoptimized={true}
          className="w-full h-full object-cover sepia-[0.5] contrast-125"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 h-full flex flex-col justify-center relative z-20 pt-24 text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-12"
        >
          <h4 className="text-[#4F9C8F] font-['Inter'] tracking-[0.3em] uppercase text-sm font-semibold mb-6">The Roastery</h4>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-['Playfair_Display'] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#F5E6D3] to-[#5A4034] uppercase tracking-tight leading-[0.9]">
            Alchemy in <br/> Motion.
          </h2>
        </motion.div>

        <motion.div 
          className="max-w-2xl mx-auto space-y-6 text-[#C9B8A0] font-['Inter'] md:text-xl font-light"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p>
            Inside our Brooklyn lab, raw green cherries touch the burning steel of an authentic 1968 Probat G60. The process isn&apos;t mechanized. It&apos;s sensory.
          </p>
          <p>
            We wait for the exact moment of the first crack, listening to the drum, watching the caramelization, and harnessing heat to unlock over 800 aromatic compounds hiding inside every bean.
          </p>
        </motion.div>

        {/* Featurettes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {[
            { title: "205°", desc: "Precise Maillard Control" },
            { title: "48h", desc: "Atmospheric Degassing" },
            { title: "Zero", desc: "Automated Shortcuts" }
          ].map((stat, idx) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + idx * 0.2 }}
              className="flex flex-col items-center justify-center border-t border-[#5A4034]/50 pt-6"
            >
              <span className="text-5xl font-['Playfair_Display'] font-bold text-[#4F9C8F] mb-2">{stat.title}</span>
              <span className="text-[#C9B8A0] font-['Inter'] uppercase tracking-widest text-xs">{stat.desc}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
