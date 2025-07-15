// src/app/components/LoadingScreen.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen() {
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial loading animation
    tl.to(loadingRef.current, {
      duration: 1.5,
      opacity: 1,
      ease: 'power3.inOut'
    });

    // Hide loading screen after delay
    tl.to(loadingRef.current, {
      duration: 1.5,
      opacity: 0,
      ease: 'power3.inOut',
      delay: 0.5,
      onComplete: () => {
        if (loadingRef.current) {
          loadingRef.current.style.display = 'none';
        }
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white opacity-0"
    >
      <div className="text-4xl font-light">Loading...</div>
    </div>
  );
}
