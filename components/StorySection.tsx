'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function StorySection() {
  return (
    <section id="story" className="py-24 md:py-32 px-4 md:px-12 bg-[#0A0503] relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4A574]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4F9C8F]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Story Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-[#4F9C8F] font-['Inter'] tracking-[0.2em] uppercase text-sm font-semibold mb-4">Our Standards</h4>
            <h2 className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-8 leading-tight">
              Commitment to <br/>
              <span className="italic font-light text-[#D4A574]">excellence.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-[#C9B8A0] font-['Inter'] text-lg"
          >
            <p>
              At Artisan Coffee, we adhere to the highest industry standards to deliver exceptional quality in every cup. Our beans are sourced from certified organic farms and undergo rigorous quality control at every stage.
            </p>
            <p>
              Our roasting process uses precision temperature control and expert timing to unlock the full potential of each bean. We maintain traceability from farm to cup, ensuring transparency and sustainability in our supply chain.
            </p>
            <p>
              Every batch is tested for optimal flavor profiles, and our baristas are trained in the latest brewing techniques. We believe in continuous improvement and innovation to provide you with the perfect coffee experience.
            </p>

            <motion.div 
              whileHover={{ x: 10 }}
              className="mt-8 pt-4 inline-block border-b border-[#4F9C8F] pb-1 cursor-pointer"
            >
              <a href="#roastery" className="text-[#4F9C8F] font-semibold tracking-wide uppercase text-sm hover:text-[#3D8B7F] transition-colors">
                Learn More About Our Process →
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Vintage Image Presentation */}
        <div className="w-full lg:w-1/2 relative h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0503] via-transparent to-transparent z-10 opacity-60" />
            <Image 
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1200" 
              alt="Vintage Artisan Pour Over"
              width={1200}
              height={800}
              unoptimized={true}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[20s] ease-linear sepia-[0.3]"
            />
          </motion.div>
          
          <div className="absolute bottom-8 right-8 z-20 bg-[#1A0F0A]/80 backdrop-blur-md border border-[#5A4034] p-6 rounded-2xl max-w-xs transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <h5 className="text-[#F5E6D3] font-['Playfair_Display'] font-bold text-xl mb-2">Since 1998</h5>
            <p className="text-[#C9B8A0] font-['Inter'] text-sm">Every single batch is meticulously taste-tested by our founding roasters before ever leaving the facility.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
