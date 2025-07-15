// src/app/components/HeroSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useScrollTrigger(subtitleRef.current!, () => {
    const words = subtitleRef.current?.querySelectorAll('span.word');
    if (words) {
      gsap.to(words, {
        duration: 0.5,
        opacity: 1,
        color: '#fff',
        stagger: 0.1,
        ease: 'power2.out'
      });
    }
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroRef.current || !titleRef.current || !buttonRef.current) return;

      const tl = gsap.timeline();
      
      tl.from(heroRef.current, {
        duration: 1.5,
        opacity: 0,
        y: 50,
        ease: 'power3.out',
        delay: 1
      });

      tl.from(titleRef.current, {
        duration: 1.2,
        opacity: 0,
        y: 30,
        ease: 'power3.out'
      }, '-=1');

      tl.from(buttonRef.current, {
        duration: 1,
        opacity: 0,
        y: 20,
        ease: 'power3.out'
      }, '-=0.8');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const text = "Experience the pinnacle of luxury with our exquisite collection crafted from the finest materials and designed to perfection.";
  const words = text.split(' ').map((word, i) => (
    <span key={i} className="word opacity-70 inline-block">{word} </span>
  ));

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative pt-20 px-6 md:px-12 bg-[url('https://picsum.photos/1920/1080?random=4&blur=2')] bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="max-w-7xl mx-auto text-center relative z-10 text-white">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-8"
        >
          Timeless Elegance
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {words}
        </p>
        
        <div ref={buttonRef}>
          <button className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition duration-300">
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
}