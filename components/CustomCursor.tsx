'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX - 16, y: e.clientY - 16 });
      
      if (!isVisible) setIsVisible(true);
      
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') || 
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const mouseLeave = () => setIsVisible(false);
    const mouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseleave', mouseLeave);
    document.addEventListener('mouseenter', mouseEnter);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseleave', mouseLeave);
      document.removeEventListener('mouseenter', mouseEnter);
    };
  }, [isVisible]);

  // If mobile or touch device, bypass rendering the custom cursor
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Keep native arrow cursor while adding subtle custom pointer */}
      <style dangerouslySetInnerHTML={{ __html: `
        * { cursor: auto !important; }
      `}} />
      
      {/* Custom Cursor */}
      <div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border-[1.5px] border-[#4F9C8F] pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center transition-transform duration-75 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovering ? 'scale-150' : 'scale-100'}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        {/* Core Dot */}
        <div 
          className={`w-2 h-2 bg-[#F5E6D3] rounded-full pointer-events-none transition-transform duration-75 ${
            isHovering ? 'scale-0' : 'scale-100'
          }`}
        />
      </div>
    </>
  );
}
