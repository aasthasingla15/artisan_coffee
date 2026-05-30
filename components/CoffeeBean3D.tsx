'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Coffee Bean mesh
function Bean({ isHovered, setIsHovered }: { isHovered: boolean; setIsHovered: (h: boolean) => void }) {
  const beanRef = useRef<THREE.Group>(null);

  // Smooth rotation
  useFrame((state) => {
    if (!beanRef.current) return;
    
    // Auto-rotation
    beanRef.current.rotation.y += isHovered ? 0.03 : 0.008;
    beanRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <group
      ref={beanRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      scale={isHovered ? 1.15 : 1}
    >
      {/* Left Half of Coffee Bean */}
      <mesh position={[-0.24, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial
          color="#3d2314"
          roughness={0.45}
          metalness={0.1}
          bumpScale={0.05}
        />
      </mesh>

      {/* Right Half of Coffee Bean */}
      <mesh position={[0.24, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial
          color="#3d2314"
          roughness={0.45}
          metalness={0.1}
          bumpScale={0.05}
        />
      </mesh>

      {/* Center Crease / Roasted crack line */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.08, 0.9, 0.4]} />
        <meshStandardMaterial
          color="#1e0f08"
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}

// Steam Particle Effect
function SteamParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 20;

  const [positions] = useState(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.5; // X
      pos[i * 3 + 1] = Math.random() * 2;       // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5; // Z
    }
    return pos;
  });

  useFrame(() => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    
    for (let i = 0; i < particleCount; i++) {
      let y = posAttr.getY(i);
      y += 0.01; // Rise up
      if (y > 2.0) {
        y = 0; // Reset to bottom
        posAttr.setX(i, (Math.random() - 0.5) * 0.4);
        posAttr.setZ(i, (Math.random() - 0.5) * 0.4);
      }
      posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#D4A574"
        size={0.08}
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function CoffeeBean3D() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full h-[350px] md:h-[450px] relative rounded-3xl overflow-hidden glass-panel border border-amber-900/30 shadow-2xl">
      {/* Decorative Vibe Label */}
      <div className="absolute top-6 left-6 z-10 font-['Playfair_Display'] text-sm tracking-wider text-amber-100/60 uppercase">
        Interactive 3D Craftsmanship
      </div>
      
      <Canvas shadows camera={{ position: [0, 0, 2.5], fov: 50 }} className="w-full h-full bg-gradient-to-b from-[#1C120C]/80 to-[#120B07]/90">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
        <directionalLight position={[-5, 5, 5]} intensity={1} />
        
        <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
          <group position={[0, -0.2, 0]}>
            <Bean isHovered={isHovered} setIsHovered={setIsHovered} />
            <SteamParticles />
          </group>
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>

      {/* Control / Hover instruction */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-amber-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/20 text-xs font-['Inter'] text-amber-100/80 pointer-events-none transition-opacity duration-300">
        {isHovered ? 'Drag to inspect bean structure' : 'Hover & Drag to Interact'}
      </div>
    </div>
  );
}
