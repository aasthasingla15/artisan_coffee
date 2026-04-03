'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  hours: string;
  latitude: number;
  longitude: number;
  region: 'india' | 'global';
}

const locations: Location[] = [
  { id: 'delhi', name: 'Artisan Coffee Delhi', address: 'G-14, Connaught Place', city: 'New Delhi', country: 'India', phone: '+91 11 2345 6789', hours: '8:00 AM - 10:00 PM', latitude: 28.6327, longitude: 77.2197, region: 'india' },
  { id: 'mumbai', name: 'Artisan Coffee Mumbai', address: 'Shop 22, Colaba Causeway', city: 'Mumbai', country: 'India', phone: '+91 22 3456 7890', hours: '7:30 AM - 11:00 PM', latitude: 18.9230, longitude: 72.8320, region: 'india' },
  { id: 'bangalore', name: 'Artisan Coffee Bangalore', address: 'Lal Bagh Road, Jayanagar', city: 'Bengaluru', country: 'India', phone: '+91 80 4567 8901', hours: '7:00 AM - 10:30 PM', latitude: 12.9352, longitude: 77.6113, region: 'india' },
  { id: 'seattle', name: 'Artisan Coffee Seattle', address: '520 Pike St', city: 'Seattle', country: 'USA', phone: '+1 206 555 0110', hours: '8:00 AM - 9:00 PM', latitude: 47.6101, longitude: -122.3421, region: 'global' },
  { id: 'amsterdam', name: 'Artisan Coffee Amsterdam', address: 'Damrak 25', city: 'Amsterdam', country: 'Netherlands', phone: '+31 20 555 0145', hours: '8:30 AM - 8:30 PM', latitude: 52.3738, longitude: 4.8935, region: 'global' },
  { id: 'tokyo', name: 'Artisan Coffee Tokyo', address: '2-7-4 Nihonbashi', city: 'Tokyo', country: 'Japan', phone: '+81 3 5555 0200', hours: '7:00 AM - 10:00 PM', latitude: 35.6840, longitude: 139.7740, region: 'global' },
];

export default function StoreLocator() {
  const [activeRegion, setActiveRegion] = useState<'india' | 'global'>('india');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(locations[0]);

  const regionLocations = locations.filter((loc) => loc.region === activeRegion);

  return (
    <section id="locations" className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold text-[#F5E6D3]">
            Store Locator
          </h2>
          <p className="mt-3 text-[#C9B8A0] font-['Inter'] text-lg">
            Find Artisan Coffee boutiques in India and around the world.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/5 bg-[#2D1810]/60 border border-[#5A4034]/40 rounded-2xl p-5">
            <div className="flex gap-3 mb-5">
              {(['india', 'global'] as const).map((region) => (
                <button
                  key={region}
                  onClick={() => {
                    setActiveRegion(region);
                    setSelectedLocation(locations.find(l => l.region === region) || null);
                  }}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    activeRegion === region ? 'bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white' : 'bg-[#1A0F0A] text-[#C9B8A0] border border-[#5A4034]'
                  }`}
                >
                  {region === 'india' ? 'India' : 'Global'}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {regionLocations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`w-full text-left p-3 rounded-xl transition border ${
                    selectedLocation?.id === loc.id ? 'border-[#4F9C8F] bg-[#3D2820]' : 'border-[#5A4034] bg-[#2D1810]'
                  }`}
                >
                  <h4 className="font-['Playfair_Display'] font-bold text-[#F5E6D3]">{loc.name}</h4>
                  <p className="text-[#A8907C] text-sm">{loc.city}, {loc.country}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="md:w-3/5 bg-[#2D1810]/60 border border-[#5A4034]/40 rounded-2xl p-5">
            {selectedLocation ? (
              <>
                <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-2">
                  {selectedLocation.name}
                </h3>
                <p className="text-[#C9B8A0] mb-1">{selectedLocation.address}</p>
                <p className="text-[#C9B8A0] mb-1">{selectedLocation.city}, {selectedLocation.country}</p>
                <p className="text-[#C9B8A0] mb-3">{selectedLocation.hours} | {selectedLocation.phone}</p>

                <div className="h-[260px] rounded-xl overflow-hidden border border-[#5A4034]/50">
                  <iframe
                    title="Store Map"
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(selectedLocation.address + ', ' + selectedLocation.city)}`}
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
              </>
            ) : (
              <p className="text-[#C9B8A0]">Select a location to view details.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
