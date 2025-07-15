// src/app/components/Footer.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current || !contentRef.current) return;

    gsap.from(footerRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 80%',
      },
      duration: 1,
      opacity: 0,
      y: 50,
      ease: 'power3.out'
    });

    gsap.from(Array.from(contentRef.current.children), {
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 70%',
      },
      duration: 0.8,
      opacity: 0,
      y: 30,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="bg-black text-white py-16 px-6 md:px-12"
    >
      <div 
        ref={contentRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8"
      >
        <div>
          <h3 className="text-2xl font-serif font-light mb-4">LUXE</h3>
          <p className="text-gray-400">Timeless elegance and premium craftsmanship.</p>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-4">Shop</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="text-gray-400 hover:text-white transition">Furniture</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white transition">Lighting</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white transition">Decor</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white transition">Collections</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-4">Company</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="text-gray-400 hover:text-white transition">About Us</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white transition">Sustainability</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white transition">Careers</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white transition">Press</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-4">Contact</h4>
          <ul className="space-y-2">
            <li className="text-gray-400">hello@luxe.com</li>
            <li className="text-gray-400">+1 (555) 123-4567</li>
            <li className="text-gray-400">123 Design Ave, New York</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} LUXE. All rights reserved.</p>
      </div>
    </footer>
  );
}