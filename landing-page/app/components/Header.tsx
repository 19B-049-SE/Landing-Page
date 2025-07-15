// src/app/components/Header.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current || !navRef.current) return;

    gsap.from(logoRef.current, {
      duration: 1.2,
      opacity: 0,
      y: -20,
      ease: 'power3.out',
      delay: 1.5
    });

    gsap.from(Array.from(navRef.current.children), {
      duration: 1,
      opacity: 0,
      y: -20,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 1.8
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md py-4 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div ref={logoRef} className="text-2xl font-serif font-bold">
          <Link href="/">LUXE</Link>
        </div>
        
        <nav ref={navRef} className="hidden md:flex space-x-8">
          <Link href="#" className="text-sm uppercase hover:text-gray-600 transition">Home</Link>
          <Link href="#" className="text-sm uppercase hover:text-gray-600 transition">Collections</Link>
          <Link href="#" className="text-sm uppercase hover:text-gray-600 transition">About</Link>
          <Link href="#" className="text-sm uppercase hover:text-gray-600 transition">Contact</Link>
        </nav>

        <div ref={navRef} className="flex space-x-4">
          <button className="text-sm uppercase hover:text-gray-600 transition">Cart (0)</button>
          <button className="md:hidden text-sm uppercase">Menu</button>
        </div>
      </div>
    </header>
  );
}